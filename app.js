const express = require('express')
const app = express();
require('./database/mongoose')
const taskrouter = require('./router/userRouter')
const path = require("path");
const bodyParser = require('body-parser');
const publicdirectory= path.join(__dirname,'public');
const cors = require('cors');
const auth = require('./middleware/auth')
app.use(cors());

const venue = require('./router/venue')
const business = require('./router/business')


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(publicdirectory));
app.use(express.json())
app.use(taskrouter)


app.use(venue)
app.use(business)

app.use(taskrouter)
app.listen("3000");
console.log('Server runs at http://localhost:' + 3000);