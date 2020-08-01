const express = require('express')
const app = express();
require('./database/mongoose')
const taskrouter = require('./router/vendorRouter')
const user2Router = require('./router/usersRouter')
const path = require("path");
const bodyParser = require('body-parser');
const publicdirectory= path.join(__dirname,'public');
const cors = require('cors');
const auth = require('./middleware/auth')
app.use(cors());

const venue = require('./router/venue')
const business = require('./router/business')

const bvenuerouter = require('./router/bvenueRouter')
const bbusinessRouter = require('./router/bbusinessRouter')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(publicdirectory));
app.use(express.json())
app.use(taskrouter)
app.use(user2Router)

app.use(venue)
app.use(business)

app.use(taskrouter)
app.listen("3000");
console.log('Server runs at http://localhost:' + 3000);