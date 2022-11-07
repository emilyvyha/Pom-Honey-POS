// connect to the database
const { query } = require('express');
const express = require('../node_modules/express');
const { Pool } = require('../node_modules/pg');
const dotenv = require('../node_modules/dotenv').config();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// Create express app
const app = express();
const port = 5000;
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Names for orders
firstName = ["\'Bob","\'Dylan","\'Brother","\'Bear","\'Guy","\'Ur","\'My","\'Same","\'Kim","\'Light","\'Queen","\'Waltuh"];
lastName =  ["Smith\'","Williams\'","Lopez\'","Keener\'","Petras\'","Brown\'","Ashtray\'","Asatryan\'",
            "Reitmeyer\'","Ha\'","Hak\'","Hawk\'","Mmmmmmmm\'","White\'","Mom\'"];


    let orderItems = "";
    let rawPrice = 0.00;
    let tax = 0.00;
    let totalPrice = 0.00;
    let orderID;
    const customerName = getName();

    function getName() {
        let numFirst = getRandomInt(firstName.length)
        let numLast = getRandomInt(lastName.length)
    
        let fullName = firstName[numFirst] + " " + lastName[numLast];
    
        return fullName;
    }

    // async function

    // }

    // get price and tax details
    const updatePrice = (itemName) => {
        // calculate item total
        let itemPrice = 0.00;
        // get new order item's price from database
        let price;
        pool
        .query("SELECT item_price FROM menu WHERE item_name ='" + itemName + "';")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                price = query_res.rows[i];
                console.log(query_res.rows[i]);
            }});
        itemPrice = price.item_price;
        // calculate tax
        currTotal += itemPrice;
        let taxPrice = currTotal * 0.0825;
        // calculate order total
        totalPrice = currTotal + taxPrice;
        // return tax and order total
    }

    // send orders to database
    async function sendOrder(paymentType, empName){
        // get time
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        time = time.substring(0, 8);
        let updatedDate = date + " " + time;
        cardNum = cardNumberGenerator(12);
        custName = getName();
        // for receipt: order_id, payment_type, total, date/timestamp, order_items, customer_name, card_number, employeee_name
        // for orders: order_id, total, timestamp
        getID();
        let query = "INSERT INTO receipts values(" + orderID + "," + paymentType + "," + totalPrice + ",'" + updatedDate + "','" + orderItems + "'," 
                                                 + custName + "," + cardNum + ",'" + empName + "');";
        // execute query
        let orderQuer = "INSERT INTO orders values(" + orderID + "," + totalPrice + ",'" + updatedDate +"');";
        if(orderItems != ""){
            pool.query(query)
            .then(()=>{
                pool.query(orderQuer)
            })
            .then(()=>{
                // Subtracts inventory items used up in this order
                updateInventory(orderItems);
                return 1;
            })
        }
    
        return 0;
    }

    function getID() {
        let newID;
        pool
        .query("SELECT max(order_id) FROM receipts;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                newID = query_res.rows[i];
                console.log(query_res.rows[i]);
            }}).then(()=>{
                orderID = newID.order_id + 1;
                // return orderID;
            });
    }


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function cardNumberGenerator(cardlen){
    cardNumber = "\'"
    for (let i = 0; i < cardlen; i++){
        cardNumber += getRandomInt(10) 
    }
    cardNumber += "\'"

    return cardNumber
}

// adding new items to menu
function addMenu() {
    // have text entry points - will get these from front end code
    // get text from these fields
    const itemID = getItemID();
    let itemName = "";// get name from entry
    let itemPrice = 0;// get from entry
    let itemIngreds = "";// get from entry
    // check if each item ingredient exists in the database
    let individuals = itemIngreds.split(',');
    for(let i = 0; i < individuals.size(); i++){
        let name = individuals[i];
        let exists;
        pool.query("SELECT EXISTS(SELECT FROM ingredients where ingredient_name = '" + name + "');").then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                exists = query_res.rows[i];
                console.log(query_res.rows[i]);
            }
            if(!exists.exists){
                addInventoryItem(name);
            }
        });
    }
    
    // send in query
    const query = "INSERT INTO menu VALUES('" + itemName +"', " + itemPrice +", '" + itemIngreds + "');";
    pool.query(query).then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            newID = query_res.rows[i];
            console.log(query_res.rows[i]);
        }});
}

function getItemID() {
    let newID;
    pool
    .query("SELECT max(item_id) FROM menu;")
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            newID = query_res.rows[i];
            console.log(query_res.rows[i]);
        }});
    return newID+1;
}

async function main(){
    app.post("/sendOrder",jsonParser,(req,res)=> {
        //console.log(req)
        sendOrder(req.body.paymentType, req.body.empName)
        .then(() => {
            res.send("Howdy");
        })
    })

    app.listen(port,()=> console.log(`Listening to port ${port}`));
}

main();