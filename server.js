// Import the Express.js module
const express = require('express');
const bodyParser = require('body-parser');


// Create an Express application
const app = express();
const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
    name: String,
    email:String
});

const Kitten = mongoose.model('Kitten', kittySchema);
// with this Kitten name one new model will be created at the idev_database path,in this kitten will be named as kittens as 's' will be added as default for all the models

main().then(res=>console.log('DB CONNECTED SUCCCESSFULLY'))
main().catch(err => console.log(err,'db not connected'));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/idev_database');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello, World! Hi Ibrahim');
});
app.get('/home', (req, res) => {
    res.send('Hello, World! welcome to Ibrahim home');
});
app.post('/signup', (req, res) => {
    // console.log(req?.body?.name,req?.body?.email)
     Kitten.create(req?.body).then((data)=> {
        console.log(data,'response')
         res.send(`your data ${data?.name} and ${data?.email} is save successfully` )
    }).catch((e)=>{
        console.log(e,'error')
         res.send('data not saved')
     });
    // console.log(silence); // 'Silence'
    // res.send(`Hello ,Your Name : ${req?.body?.name} and Your EMAIL : ${req?.body?.email}`);

});

// Start the server and listen on port 3000
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
