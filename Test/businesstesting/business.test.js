var Business = require('../../models/Business');
const mongoose = require('mongoose');
const business = require('../../models/Business');
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
describe(' Testing of business Schema', () => {
    it(' Testing of Adding business', () => {
        const business = {
            'businesstype': 'abc',
            'image': 'a.jpg',
            'businessname': 'abc',
            'phone': '9849635014',
            'address': 'ktm',
            'email': 'naran@gmail.com',
            'price': '20$',
            'description':'xyz'
        };

        return Business.create(business)
            .then((business) => {
                expect(business.email).toEqual('naran@gmail.com');
            });
    });
});


it('to test the update', async () => {

    return business.findOneAndUpdate({_id :Object('5f06cab9eb2aaa22a4c481e7')}, {$set : {businesstype:'xyz',image:'a.jpg',businessname:'xyz',
    phone:'9849635014', address: 'ktm', email:'naran@gmail.com', price: '40$', description: 'xyzzz'}})
    .then((pp)=>{
        expect(pp.businesstype).toEqual('xyz'),
        expect(pp.image).toEqual('a.jpg'),
        expect(pp.businessname).toEqual('xyz'),
        expect(pp.phone).toEqual('9849635014'),
        expect(pp.address).toEqual('ktm'),
        expect(pp.email).toEqual('naran@gmail.com'),
        expect(pp.price).toEqual('40$'),
        expect(pp.description).toEqual('xyzzz')
        

    })
});
  
it('Testing of User Deletion', async() => {
    const status = await venue.deleteOne({ "_id": "5f06cab9eb2aaa22a4c481e7" });
    expect(status.ok).toBe(1);
});

