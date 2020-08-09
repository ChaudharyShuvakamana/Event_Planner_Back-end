var Post = require('../models/post');
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
        const post = {
            'status': 'such a beautiful place to visit',
            'category': 'Nature',
           
        };

        return Post.create(post)
            .then((post) => {
                expect(post.category).toEqual('Nature');
            });
    });
});
it('Testing of Contact Deletion', async() => {
    const status = await Post.deleteOne({ "_id": "5e47d996aefb6633f84d817e" });
    expect(status.ok).toBe(1);
});