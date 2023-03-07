const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let count = 0
let changingNumber = 0
setInterval(() => {
    changingNumber = Math.random()
}, 1000);

app.get('/random/number', (req, res) => {
    res.json({
        "number": {
            "first": changingNumber
        }
    });
    console.log(count++)
});


app.get("/sandwich/beef", (req, res) => {
    res.json({ sandwichName: "Pastrami on Rye", quantity: 400 })
})

app.get("/sandwich/chicken", (req, res) => {
    res.json({ sandwichName: "Bocadilla de Pollo", quantity: 500 })
})

app.get("/sandwich/ham", (req, res) => {
    res.json({ sandwichName: "Jambon-beurre", quantity: 300 })
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});


