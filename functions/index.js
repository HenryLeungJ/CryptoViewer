import express, { Router } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import serverless from "serverless-http";
const router = Router();

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Port ${port} is running`);
});

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.post("/", async (req, res) => {
    try {
        const symbol = req.body.symbol;
        const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers/" + symbol.toUpperCase() + ("-USD" || "-USDC" || "-USDT"));
        res.render("index.ejs", {data: response.data});
        console.log(response.data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.use("/", router);
export const handler = serverless(app);