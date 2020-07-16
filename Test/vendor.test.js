var User = require('../../models/Vendor');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/Event_planner';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});
describe(' Testing of User Schema', () => {
    it(' Testing of Adding User', () => {
        const user = {
            'fullname': 'XYZ',
            'location':'Nepal',
            'businesstype':'Hero',
            'email': 'xyz@gmail.com',
            'phonenumber':'986541236',
            'password': 'sam00sau35'
        };

        return User.create(user)
            .then((user) => {
                expect(user.email).toEqual('xyz@gmail.com');
            });
    });
});


