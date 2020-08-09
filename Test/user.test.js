// var User = require('../../models/User');
// const mongoose = require('mongoose');
// const url = 'mongodb://127.0.0.1:27017/Event_planner';
// beforeAll(async() => {
//     await mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
// });
// afterAll(async() => {
//     await mongoose.connection.close();
// });
// describe(' Testing of User Schema', () => {
//     it(' Testing of Adding User', () => {
//         const user = {
//             'firstname': 'Sameer',
//             'lastname':'Karki',
//             'location':'Nepal',
//             'phonenumber':'987456321',
//             'email': 'sameer@gmail.com',
//             'password': 'sam00sau35'
//         };

//         return User.create(user)
//             .then((user) => {
//                 expect(user.email).toEqual('sameer@gmail.com');
//             });
//     });
// });

it('to test the update', async () => {

    return user.findOneAndUpdate({_id :Object('5f06cab9eb2aaa22a4c481e7')}, {$set : {firstname:'sameer',lastname:'karki',location:'Nepal',
    phonenumber:'987456321', email:'sameer@gmail.com', password: 'sam00sau35'}})
    .then((pp)=>{
        expect(pp.firstname).toEqual('xyz'),
        expect(pp.lastname).toEqual('a.jpg'),
        expect(pp.location).toEqual('xyz'),
        expect(pp.phonenumber).toEqual('9849635014'),
        expect(pp.email).toEqual('naran@gmail.com'),
        expect(pp.password).toEqual('naran12')
       
        

    })
});
// // it('Testing of User Deletion', async() => {
// //     const status = await User.deleteOne({ "_id": "5e44f4249cf67443d4fdb28c" });
// //     expect(status.ok).toBe(1);
    
// // });

