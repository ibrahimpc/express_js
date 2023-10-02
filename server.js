if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require('express');
const bodyParser = require('body-parser');

require('./src/config/database')
const my_routes=require('./src/routes')
const app = express();
const port = 3002;


app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World! Hi Ibrahim');
});
app.use('/',my_routes)

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
