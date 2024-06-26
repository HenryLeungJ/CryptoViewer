const express = require('express');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(cors({origin: '*', optionsSuccessStatus: 200}));

app.listen(port, () => {
    console.log(`Port ${port} is running`);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    try {
        const symbol = req.body.symbol;
        const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers/" + symbol.toUpperCase() + ("-USD" || "-USDC" || "-USDT"));
        res.render("index", {data: response.data});
        console.log(response.data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

module.export = app;