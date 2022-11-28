import { Button, Select, FormControl, MenuItem } from "@mui/material"
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "./LanguagePicker";
import TranslatedText from "../Pages/TranslatedText";

import { LanguageContext } from "../contexts/language";


const Header = (props) => {
  const {lang,setLang} = useContext(LanguageContext)


    const changeLanguage = (event) =>{
      setLang(event.target.value)
      console.log("lang is", lang)
    }

    return (
      <div style = {{ height: "10%",}}>
        <div style = {{  height:"85%",display:"grid", gridTemplateColumns:"1.5fr 8fr 1.5fr"}}>
          
          
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Link to = {(props.path ?? '/')} style={{textDecoration:"none"}}>
              <Button style ={{backgroundColor:"blue"}} variant = "contained" ><TranslatedText key = {lang} text = "Back" /></Button>
            </Link>
          </div>

          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1 style = {{textAlign: "center"}}><TranslatedText key = {lang} text = {props.title} /></h1>
          </div>
          
          <LanguagePicker/>

            
        </div>

        <hr/>
      </div>
    );
  }
  
  export default Header;
  