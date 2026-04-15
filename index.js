const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//how to import env
require('dotenv').config();

//app
const app = express();

//port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));