// Import modules
const express = require('express');
const routes = require('./routes/noteRoutes')

// Initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use("/", routes)


// Tells what port is being used
app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
);