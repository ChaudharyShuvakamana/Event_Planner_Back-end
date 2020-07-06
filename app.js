require('./database/mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 
    extended: false
  }));


app.use('/api/user', require('./router/userRouter'));
app.use('/api/admin', require('./router/adminRouter'));
app.use('/api/vendor', require('./router/vendorRoute'));

app.use('/api/vendor/business', require('./router/businessRouter'));

app.use('/api/vendor/venue', require('./router/venueRouter'));



app.use("/public", express.static(__dirname + '/public'));


app.use(function(err, req, res, next){
res.status(422).send({error: err.message});
});


app.listen(process.env.port || 3000, function(){
    console.log('Server runs at http://localhost:' + 3000);

});
