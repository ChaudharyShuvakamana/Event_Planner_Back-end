var BookingVenue = require('../../models/bookingvenue')
const mongoose = require('mongoose');
const bookingvenue = require('../../models/bookingvenue');
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
describe(' Testing of bookingvenue Schema', () => {
    it(' Testing of Adding bookingvenue', () => {
        const bookingvenue = {
            'user_id': '5e44def6d69dbe0860bddfa3',
            'fullname': 'abc',
            'address': 'ktm',
            'number': '9849635014',
            'email': 'naran@gmail.com',
            'eventname': 'marriage',
            'from': '1staug',
            'to':'3rdaug',
            'venue_id': '5e44def6d69dbe0860bddfa3'
        };
        return BookingVenue.create(bookingvenue)
        .then((bookingvenue) => {
            expect(bookingvenue.email).toEqual('naran@gmail.com');
        });
});

       
    });






