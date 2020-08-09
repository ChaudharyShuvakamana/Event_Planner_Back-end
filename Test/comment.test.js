var Savepost = require('../models/comment');
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
describe(' Testing of Contact Schema', () => {
    it(' Testing of Adding Contact', () => {
        const savepost = {
            'user_id': '5e44def6d69dbe0860bddfa3',
            'comment':"wow nice",
            'post_id': '5e483483d801b0073491328b'

           
        };

        return Savepost.create(savepost)
            .then((savepost) => {
                expect(savepost.user_id).toEqual('5e44def6d69dbe0860bddfa3');
            });
    });
});
it('Testing of Contact Deletion', async() => {
    const status = await savepost.deleteOne({ "_id": "5e47d996aefb6633f84d817e" });
    expect(status.ok).toBe(1);
});