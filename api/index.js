const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');


const app = express();
const port = 3001;

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.use(cors({origin: ['*'], optionsSuccessStatus: 200}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Port ${port} is running`);
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
        const symbol = req.body.symbol;
        const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers/" + symbol.toUpperCase() + ("-USD" || "-USDC" || "-USDT"));
        res.render("index.ejs", {data: response.data});
        console.log(response.data);
    } catch (error) {
        res.render("index.ejs", {error: {}});
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

module.exports = app;