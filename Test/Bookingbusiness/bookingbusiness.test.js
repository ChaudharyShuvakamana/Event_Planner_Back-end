var BookingBusiness = require('../../models/bookingbusiness')
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/blog';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});
describe(' Testing of bookingbusiness Schema', () => {
    it(' Testing of Adding bookingbusiness', () => {
        const bookingbusiness = {
            'user_id': '5e44def6d69dbe0860bddfa3',
            'fullname': 'abc',
            'address': 'ktm',
            'number': '9849635014',
            'email': 'naran@gmail.com',
            'eventname': 'marriage',
            'from': '1staug',
            'to':'3rdaug',
            'business_id': '5e44def6d69dbe0860bddfa3'
        };
        return BookingBusiness.create(bookingbusiness)
        .then((bookingbusiness) => {
            expect(bookingbusiness.email).toEqual('naran@gmail.com');
        });
});

       
    });





