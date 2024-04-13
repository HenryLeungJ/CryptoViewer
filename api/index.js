const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()


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
// + symbol.toUpperCase() + ("-USD" || "-USDC" || "-USDT")

function round(num) {
    return Math.round(num * 100) / 100;
}

app.post("/", async (req, res) => {
    try {
        const symbol = req.body.symbol.toUpperCase();
        const response = await axios.get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=" + symbol,
        {headers: {
            "X-CMC_PRO_API_KEY": process.env.API,
        }}
    );
        let price = response.data.data[Object.keys(response.data.data)[0]][0].quote.USD.price;

        if (Math.round(price) > 0) {
            price = round(price);
        }
        res.render("index.ejs", {data: {price: price, symbol: response.data.data[Object.keys(response.data.data)[0]][0].symbol, volume_24h: round(response.data.data[Object.keys(response.data.data)[0]][0].quote.USD.volume_change_24h), price_24h: round(response.data.data[Object.keys(response.data.data)[0]][0].quote.USD.percent_change_1h)}});
        console.log(response.data.data.BTC[0].symbol);
    } catch (error) {
        res.render("index.ejs", {error: {}});
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

module.exports = app;