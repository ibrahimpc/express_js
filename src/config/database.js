const mongoose = require('mongoose');

main().then(res=>console.log('DB CONNECTED SUCCCESSFULLY')).catch((e)=>console.log('DB connection failed'))
main().catch(err => console.log(err,'db not connected'));

async function main() {
    await mongoose.connect(process.env.DB);
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
