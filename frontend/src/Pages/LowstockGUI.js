// react
import { useState, useEffect, useContext } from "react";

// external imports
import axios from 'axios'
import { Button, TextField } from "@mui/material"; 
import { createTheme, ThemeProvider } from "@mui/material";

// components
import Header from "../Components/Header"
import TranslatedText from "../Components/TranslatedText";
import OneColRow from "../Components/OneColRow";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';

const LowstockGUI = ()=> {
    const {lang, setLang} = useContext(LanguageContext)
    const [stockItems, setStockItems] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const lowStock = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/lowStock', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
    
        const result = await response.json();
        setStockItems(result);
        console.log(stockItems);
        
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={{ height: "100%"}}>
            <Header title = "Low Stock" path = "/lowstockgui"/>
            <div style={{maxHeight:"1000px", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20, marginLeft: "20%", marginRight: "20%", fontSize: "30px"}}>

                <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
                    <OneColRow item = {"Items Low on Stock"} />
                </div>

                {(stockItems ?? []).map( (row) =>{
                return (
                    <OneColRow key = {row.id} item = {row}/>
                )
                })}

            </div>
        </div>
    );
}

export default LowstockGUI;