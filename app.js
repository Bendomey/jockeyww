const mongoose = require('mongoose');
const path = require('path');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
    process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//require models
// require('./app/Models/User');
require(path.join(__dirname, '/Models/User'));

// READY?! Let's go!
// Start our app!
const app = require('./app/server');

const PORT = process.env.PORT || 5000;

//now listen on the port for requests
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running and receiving request on port: ${PORT}`)
});