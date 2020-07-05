const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const LinksSchema = new Schema({
    facebook : {
        type : String,
    },
    instagram : {type : String},
    website : {type : String}
})

const BusinessSchema = new Schema({

    vendorid :  {type: Schema.Types.ObjectId, ref: 'vendor'},
    
    businessname : {
        type : String,
    },

    businesstype : {
        type : String,
    },

    businessdesc : {
        type  : String,
    },
    businesslocation : {
        type : String,
    },

    businesscontact : {
        type : String,
    },

    availableDates : {
        type : [String]
    },

    businesspricing : {
        type : String
    },

    businessLink :LinksSchema, 

    businessImage : {
        type : String,
        default : ""
    },

})

const Business = mongoose.model('business', BusinessSchema);
module.exports = Business;