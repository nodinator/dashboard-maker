const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const { rawMaterials, manufacturingLines, completedParts, completedEngines, shipmentRecords } = require('./data');
const { buildManager} = require('./updater')

// TODO:
// MAKE MORE OF THE DATA CHANGE OVER TIME
// ADD INTERACTIONS BETWEEN DIFFERENT DATA POINTS, MULTIPLE ASSEMBLY LINES, LOGIC TO SWITCH FROM ONE PRODUCT TO ANOTHER (doesn't need to be super realistic, just interesting)
// REFACTOR
// ADD SOME RANDOMNESS TO THE PRODUCTION RATES

setInterval(() => {
  buildManager()    
}, 1000);

app.get('/rawMaterialsInventory', async (req, res) => {
  res.json(rawMaterials)
});
app.get('/manufacturingLines', async (req, res) => {
  res.json(manufacturingLines);
});
app.get('/completedParts', async (req, res) => {
  res.json(completedParts);
});
app.get('/completedEngines', async (req, res) => {
  res.json(completedEngines);
});
app.get('/shipmentRecords', async (req, res) => {
  res.json(shipmentRecords);
});




let count = 0
let changingNumber = 0
setInterval(() => {
    changingNumber = Math.random()
}, 1000);

app.get('/number', (req, res) => {
    res.json({
        'number': {
            'first': changingNumber
        }
    });
    console.log(count++)
});
// app.get('/sandwich/beef', (req, res) => { 
//     res.json({ sandwichName: 'Pastrami on Rye', quantity: 400 })
// })
// app.get('/sandwich/chicken', (req, res) => {
//     res.json({ sandwichName: 'Bocadilla de Pollo', quantity: 500 })
// })
// app.get('/sandwich/ham', (req, res) => {
//     res.json({ sandwichName: 'Jambon-beurre', quantity: 300 })
// })

app.listen(7000, () => {
    console.log(`Server is running on port 7000.`);
});




