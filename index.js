const connectToMongoose = require('./db')
var cors = require('cors')
connectToMongoose();
const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const path = require('path');

app.use(cors())
app.use(express.json())
// agr request body ko use krna h toh ya json me kam krna ho toh
//Availabe rotues
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/note'));


if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.join("/inotebook/build")));

    // app.get("*", function (_, res) {
    //     res.sendFile(
    //         path.resolve(__dirname, 'inotebook', 'build', 'index.html'),

    //     )
    // })


}





app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})