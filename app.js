const express = require('express')
require('./database/mongoose')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
const userrouter = require('./router/user')

const cors = require('cors')
app.use(cors())
const venuerouter = require('./router/venue')

const businessrouter = require('./router/business')
app.use(express.json())
app.use((req,res,next)=>{
    next();
})
app.use("/public/images", express.static(__dirname + '/public/images'))

app.use(userrouter)
app.use(venuerouter)
app.use(businessrouter)
app.use(cors)






app.listen(4000,()=>{
    console.log("server is running");
});
 