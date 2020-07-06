const mongoose = require('mongoose')

const Schema = mongoose.Schema;

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
    businessImage : {
        type : String,
        default : ""
    },

})

const Business = mongoose.model('business', BusinessSchema);
module.exports = Business;