import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

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
        const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers/" + symbol.toUpperCase() + "-USD");
        res.render("index.ejs", {data: response.data});
        console.log(response.data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

