import { Button, TextField } from "@mui/material"
import { Grid } from '@mui/material';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// custom components
import TranslatedText from "./TranslatedText";
import LanguagePicker from "../Components/LanguagePicker";

// context
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';

const bowlList = [
    {id: 1, itemName: "Butter Chicken Bowl"},
    {id: 2, itemName: "Lemon Chicken Bowl"},
    {id: 3, itemName: "Veggie Bowl"},
    {id: 4, itemName: "Seasoned Meat Bowl"},
    {id: 5, itemName: "Meatball Bowl"}
]

const gyroList = [
    {id: 1, itemName: "Seasoned Meat Gyro"},
    {id: 2, itemName: "Lemon Chicken Gyro"},
    {id: 3, itemName: "Veggie Gyro"},
    {id: 4, itemName: "Meatball Gyro"},
]

const extraList = [
    {id: 1, itemName: "Hummus & Pita"},
    {id: 2, itemName: "Pita Bread"},
    {id: 3, itemName: "2 Falafels"},
    {id: 4, itemName: "2 Meatballs"},
    {id: 5, itemName: "Fries"},
    {id: 6, itemName: "Garlic Fries"},
    {id: 7, itemName: "Extra Dressing"},
    {id: 8, itemName: "Extra Hummus"},
    {id: 9, itemName: "Extra Protein"},
]

const drinkList = [
    {id: 1, itemName: "Bottled Water"},
    {id: 2, itemName: "Fountain Drinks"},
]

const managerButtonList = [
    {id: 1, buttonName: "Statistics", linkName: "/statistics"},
    {id: 2, buttonName: "Inventory", linkName: "/inventory"},
    {id: 3, buttonName: "Edit Menu", linkName: "/editMenu"}
]

function extraMenu() {
    console.log("extra button clicked");
}

function drinkMenu() {
    console.log("drink button clicked");
}

var counter = 0;

const CashierGUI = () => {
    
    const {user,setUser} = useContext(UserContext)
    const {lang, setLang} = useContext(LanguageContext)

    
    const [results, setResults] = useState([...bowlList])
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    // TODO: IMPLEMENT LOGIC FOR SERVER VS MANAGER
    const [managerButtons, setManagerButtons] = useState([...managerButtonList])

    function buttonMenu() {
        setManagerButtons([...managerButtonList]);
    }

    function bowlMenu() {
        setResults([])
        setResults([...bowlList]);
    }

    function gyroMenu() {
        setResults(prevState => [])
        setResults([...gyroList]);
    }

    function extraMenu() {
        setResults(prevState => [])
        setResults([...extraList]);
    }

    function drinkMenu() {
        setResults([])
        setResults([...drinkList]);
    }

    const handleClick = async (item) => {
        setReceipt([...receipt,{id:counter, name:item}]);
        counter++;
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/addItem', {
                method: 'POST',
                body: JSON.stringify({ itemName: item }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setTotal(result.totalPrice);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckout = async (payment, employeeName) => {
        setIsLoading(true);
        emptyReceipt()
        setTotal(0);
        try {
            const response = await fetch('http://localhost:5000/sendOrder', {
                method: 'POST',
                body: JSON.stringify({ paymentType : payment, empName: employeeName }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);

        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const emptyReceipt = () => {
        setReceipt([]);
        counter = 0;
    };

    const removeItem = async (id) => {
        const newReceipt = receipt.filter(
            (receipt) => receipt.id !== id
        );
        setReceipt(newReceipt);
            console.log(receipt);
        try {
            const response = await fetch('http://localhost:5000/removeItem', {
                method: 'POST',
                body: JSON.stringify({ itemID : id }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setTotal(result.totalPrice);

        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        
        <div style = {{ width: "90%", height: "100%", marginLeft: "5%" }}>
            <div style={{width:"100%", display:"flex", justifyContent:"right"}}>
                <LanguagePicker/>
            </div>
            <div className="menuOptions" style={{ height: "7.5%", marginTop: "2.5%" }}>
                <Button onClick={bowlMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", marginLeft: "4.5%", backgroundColor: "blue", color: "white" }}><TranslatedText key = {lang} text = {"Bowls"}/></Button>
                <Button onClick={gyroMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Gyro"} key = {lang}/></Button>
                <Button onClick={extraMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Extra"} key = {lang}/></Button>
                <Button onClick={drinkMenu} style = {{ height: "100%", width: "17.5%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Drinks"} key = {lang}/></Button>
            </div>
            <div style = {{ minHeight: "80%", marginTop: "2.5%", padding: "2.5%", backgroundColor: "lightgrey" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ height: "100%" }}>
                {results.map( elem => {
                     return (
                            <Grid item xs = {3} style={{ height: "20vw" }}>
                                <Button onClick = {event => handleClick(elem.itemName)} style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%" }}><TranslatedText key = {elem.itemName + lang} text = {elem.itemName} /></Button>
                                {/* <Button onClick = {event => handleClick(elem.itemName)} style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%" }}>{elem.itemName}</Button> */}
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
            <div style = {{ display: "flex", minHeight: "30%", marginTop: "2.5%", marginBottom: "10%", paddingTop: "2.5%", paddingBottom: "2.5%", backgroundColor: "lightgrey" }}>
                <div style = {{ minHeight: "90%", width: "45%", marginLeft: "2.5%", backgroundColor: "whitesmoke" }}>
                    <p style = {{ fontWeight: "bold", marginBottom: "1%", marginLeft: "1%", marginTop: "1%" }}>
                        
                        <TranslatedText text = {"Itemized Receipt"} key = {lang}/>
                    </p>
                    {receipt.map( elem => {
                        return (
                            <div key = { elem.id } onClick = {() => removeItem(elem.id)}>
                                <p style = {{ marginLeft: "1%" }}> 
                                    { elem.name } 
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div style = {{ minHeight: "90%", width: "15%", marginLeft: "2.5%" }}>
                    <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        <TranslatedText text = {"Total"} key = {lang}/>
                        : $ { total }
                    </div>
                    <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        <TranslatedText text = {"Employee ID"} key = {lang}/>
                        : {(user.id ?? 'w')}
                    </div>
                    <div style = {{ height: "20%", width: "100%", backgroundColor: "whitesmoke" }} >
                    <TranslatedText text = {"Employee Name"} key = {lang}/>
                        : {(user.name ?? 'w')}
                    </div>
                </div>
                <div style = {{ minHeight: "90%", width: "30%", marginLeft: "2.5%" }}>
                    <div style = {{ minHeight: "60%", width: "100%", paddingTop: "2.5%", backgroundColor: "whitesmoke" }}>
                        <div className="checkoutButtons" style = {{ width:"80%", marginLeft: "10%" }}>
                            <Button onClick = {event => handleCheckout("Credit Card", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Credit" key={lang}/></Button>
                            <Button onClick = {event => handleCheckout("Debit Card", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Debit" key={lang}/></Button>
                            <Button onClick = {event => handleCheckout("Retail Swipes", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Retail Swipes" key={lang}/></Button>
                            {managerButtons.map( elem => {
                                return (
                                        <Link to={elem.linkName} style={{ textDecoration:"none" }}>
                                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {elem.buttonName} key = {lang}/></Button>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                    <Link to="/pinpad" style={{textDecoration:"none"}} >
                        <Button onClick={buttonMenu} style = {{ maxHeight: "25%", width: "60%", marginTop: "5%", marginLeft: "20%", backgroundColor: "red", color: "white" }}><TranslatedText text = {"Sign Out"} key = {lang}/></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CashierGUI;