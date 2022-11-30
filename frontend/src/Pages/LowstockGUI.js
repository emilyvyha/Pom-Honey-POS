// react
import { useState, useEffect, useContext } from "react";

// external imports
import axios from 'axios'
import { Button, TextField } from "@mui/material"; 
import { createTheme, ThemeProvider } from "@mui/material";

// components
import Header from "../Components/Header"
import TranslatedText from "../Components/TranslatedText";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';

const LowstockGUI = ()=> {
    const [stockItems, setStockItems] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const lowStock = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/lowStock', {
                method: 'POST',
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
        </div>
    );
}

export default LowstockGUI;