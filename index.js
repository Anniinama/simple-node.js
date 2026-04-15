const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

//how to import env
require('dotenv').config();

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
//app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine('handlebars', exphbs.engine({
    defaultLAyout: 'main'
}));

//main view
app.set('view engine', 'handlebars');

//folder for css & imgs
app.use(express.static('public'));

//homeroute
app.get('/', (req,res) => {
    res.render('index', {
        title: "Lego Flowers",
        products: lego_flowers,
        length: lego_flowers.length
    });
});


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

//deleting from array (db)
app.delete('/api/lego_flowers/:name', (req,res) =>{

    //getting the name of the deleted object
    const toBeDeleted = String(req.params.name);

    const lego = lego_flowers.find(lego => lego.name == toBeDeleted);

    if(lego){
        lego_flowers = lego_flowers.filter(lego => lego.name === toBeDeleted);
        res.status(200).json({
            name: toBeDeleted,
            msg: 'Deleted successfully'
        })
    }
    else{
        res.status(404).json({
            msg: 'Something went wrong'
        })
    }
});

//adding to array (db)
app.post('/api/lego_flowers/', (req,res) => {

    if(req.body.name && req.body.price && req.body.category && req.body.pieces && req.body.colorOfTheFlower && req.body.inStock){
        const newLegoFlower = {
            name: req.body.name,
            pieces: req.body.pieces,
            price: req.body.price,
            category: req.body.category,
            colorOfTheFlower: req.body.colorOfTheFlower,
            inStock: req.body.inStock
        }

        lego_flowers.push(newLegoFlower);

        res.status(200).json({
            msg: 'New Lego Flower added successfully',
            newLegoFlower
        })
        res.send(lego_flowers);
    }else{
        res.status(400).json({
            msg: 'Something went wrong'
        })
    }
})


//updating a object in array (db)
app.patch('/api/lego_flowers/:name', (req,res) => {
    
    const toBeUpdated = String(req.params.name);
    const lego = lego_flowers.find(lego => lego.name == toBeUpdated);

    if (lego){
        lego_flowers.forEach(lego => {
            if (lego.name = toBeUpdated){
                lego.pieces = req.body.pieces
                lego.pieces = req.body.pieces,
                lego.price = req.body.price,
                lego.category = req.body.category,
                lego.colorOfTheFlower = req.body.colorOfTheFlower,
                lego.inStock = req.body.inStock
            }
        });

        const updatedLego = {
            name: req.body.name,
            pieces: req.body.pieces,
            price: req.body.price,
            category: req.body.category,
            colorOfTheFlower: req.body.colorOfTheFlower,
            inStock: req.body.inStock
        }

        res.status(200).json(updatedLego);
    }
    else{
        res.status(400).json({
        msg: 'Something went wrong'
        })
    }
    res.json(lego_flowers);

});

//port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));