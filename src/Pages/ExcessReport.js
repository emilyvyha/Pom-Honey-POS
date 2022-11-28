import { useContext } from "react";

import Header from "../Components/Header";
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'; 
import ThreeColRow from "../Components/ThreeColRow";
import TranslatedText from "./TranslatedText";

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


const columns = [
    {field: 'id', headerName: 'ID', flex: 1, hide:true},
    {field: 'item', headerName: 'Item', flex: 1},
    {field: 'quantity', headerName: 'Quantity', flex: 1},
    {field: 'sales', headerName: 'Sales', flex: 1}
  ]
  
  const rows = [
    {id:1, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:2, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:3, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:4, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:5, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:6, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:7, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:8, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:9, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:10, item: "Butter Chicken", quantity: 20, sales: 30}
  ]
  

const ExcessReport = () => {
    const {lang, setLang} = useContext(LanguageContext)

    return (
        <div style = {{ height: "100%" }}>
            <Header title = "Excess Report" path = "/statistics"></Header>   
            <div style = {{ height: "90%" }}>
                <div style={{display:"flex", marginTop: "2.5%", justifyContent:"space-evenly"}}>
                    <TextField size="small" label="Start Date" variant="outlined"/>
                    <TextField size="small" label="End Date" variant="outlined"/>
                </div>

                <div style={{height:"80%", width: "60%", marginLeft: "20%", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20}}>

                    <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
                        <ThreeColRow item = {"Item"} quantity = {"Quantity"} price = {"Sales"} />
                    </div>


                    {rows.map( (row) =>{
                    return (
                        <ThreeColRow item = {row.item} quantity = {row.quantity} price = {row.sales}/>
                    )
                    })}

                </div>

            </div>
            
        </div>
    )
}

export default ExcessReport;