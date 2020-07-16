var Bookingvenue = require('../../models/bookingvenue');
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
        const business = {
            'fullname': 'abc',
            'address': 'ktm',
            'email': 'naran@gmail.com',   
            'phone': '9849635014',
            'eventname': 'marriage',
            'from':'xyz',
            'to':'xyz'

        };

        return Bookingvenue.create(bookingvenue)
            .then((bookingvenue) => {
                expect(bookingvenue.email).toEqual('naran@gmail.com');
            });
    });
});


it('to test the update', async () => {

    return bookingvenue.findOneAndUpdate({_id :Object('5f06cab9eb2aaa22a4c481e7')}, {$set : {fullname:'xyz', address: 'ktm', email:'naran@gmail.com',
    phone:'9849635014',  eventname: 'marriage', from: 'xyzzz', to: 'xyz'}})
    .then((pp)=>{
        expect(pp.fullname).toEqual('xyz'),
        expect(pp.address).toEqual('ktm'),
        expect(pp.email).toEqual('naran@gmail.com'),
        expect(pp.phone).toEqual('9849635014'),
        
        expect(pp.eventname).toEqual('marriage'),
        expect(pp.from).toEqual('xyzzz'),
        expect(pp.to).toEqual('xyzzz')
        

    })
});
  
it('Testing of User Deletion', async() => {
    const status = await bookingvenue.deleteOne({ "_id": "5f06cab9eb2aaa22a4c481e7" });
    expect(status.ok).toBe(1);
});

