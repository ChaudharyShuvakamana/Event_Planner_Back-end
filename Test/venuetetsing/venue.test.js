var Venue = require('../../models/Venue');
const mongoose = require('mongoose');
const venue = require('../../models/Venue');
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
describe(' Testing of venue Schema', () => {
    it(' Testing of Adding venue', () => {
        const venue = {
            'venuetype': 'naran',
            'image': 'naran@gmail.com',
            'venuename': 'sam00sau35',
            'phone': '9849635014',
            'address': 'ktm',
            'email': 'naran@gmail.com',
            'description':'xyz'
        };

        return Venue.create(venue)
            .then((venue) => {
                expect(venue.email).toEqual('naran@gmail.com');
            });
    });
});


it('to test the update', async () => {

    return venue.findOneAndUpdate({_id :Object('5f06c2398acd371aa85f7ec3')}, {$set : {venuetype:'xyz',image:'a.jpg',venuename:'xyz',
    phone:'9849635014', address: 'ktm', email:'naran@gmail.com', description: 'xyzzz'}})
    .then((pp)=>{
        expect(pp.venuetype).toEqual('xyz'),
        expect(pp.image).toEqual('a.jpg'),
        expect(pp.venuename).toEqual('xyz'),
        expect(pp.phone).toEqual('9849635014'),
        expect(pp.address).toEqual('ktm'),
        expect(pp.email).toEqual('naran@gmail.com'),
        expect(pp.description).toEqual('xyzzz')
        

    })
});
  
it('Testing of User Deletion', async() => {
    const status = await venue.deleteOne({ "_id": "5f06c2398acd371aa85f7ec3" });
    expect(status.ok).toBe(1);
});

