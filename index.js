const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//how to import env
require('dotenv').config();

//app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//data
let lego_flowers = [
    {name: "Sunflower Bouquet",
    pieces: 686,
    price: 69.95,
    category: "Bouquet",
    colorOfTheFlower: "Yellow",
    inStock: true
    },
    {name: "Magnolia Branches",
    pieces: 435,
    price: 59.95,
    category: "Branches",
    colorOfTheFlower: "Multicolor",
    inStock: true
    },
    {name: "Tulip Bouquet",
    pieces: 576,
    price: 69.95,
    category: "Bouquet",
    colorOfTheFlower: "Multicolor",
    inStock: false
    },
    {name: "Bouquet of Pink Roses",
    pieces: 789,
    price: 69.95,
    category: "Bouquet",
    colorOfTheFlower: "Pink",
    inStock: true
    },
    {name: "Orchid",
    pieces: 608,
    price: 59.95,
    category: "Potted plant",
    colorOfTheFlower: "White",
    inStock: true
    },
    {name: "Wildflower Bouquet",
    pieces: 939,
    price: 74.95,
    category: "Bouquet",
    colorOfTheFlower: "Multicolor",
    inStock: true
    },
    {name: "Cherry Blossoms",
    pieces: 430,
    price: 17.95,
    category: "Branches",
    colorOfTheFlower: "Multicolor",
    inStock: true
    },
    {name: "Daisies",
    pieces: 133,
    price: 17.95,
    category: "Bouquet",
    colorOfTheFlower: "White",
    inStock: false
    },
    {name: "Pretty Pink Flower Bouquet",
    pieces: 749,
    price: 72.95,
    category: "Bouquet",
    colorOfTheFlower: "Multicolor",
    inStock: true
    },
    {name: "Bouquet of Roses",
    pieces: 822,
    price: 72.95,
    category: "Bouquet",
    colorOfTheFlower: "Red",
    inStock: true
    }
]

//getting all legoflowers from array
app.get('/api/lego_flowers', (req,res) => {
    res.status(200).json({
        status: 'Success',
        results: lego_flowers.length,
        data: lego_flowers
    })
});

//getting one legoflower by the name from array
app.get('/api/lego_flowers/name/:name', (req,res) => {
    const name = String(req.params.name);

    const flower_name = lego_flowers.find(flower_name => flower_name.name === name);
    res.json(flower_name);
});

//getting all lego flowers which are in stock
app.get('/api/lego_flowers/inStock/:inStock', (req,res) => {

    const availability = req.params.inStock === 'true';
    const result = lego_flowers.filter(item => item.inStock === availability);

    res.json(result);

});

//port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));