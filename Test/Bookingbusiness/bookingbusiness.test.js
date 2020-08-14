var BookingBusiness = require('../../models/bookingbusiness')
const mongoose = require('mongoose');
const bookingbusiness = require('../../models/bookingbusiness');
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
// describe(' Testing of bookingbusiness Schema', () => {
//     it(' Testing of Adding bookingbusiness', () => {
//         const bookingbusiness = {
//             'user_id': '5e44def6d69dbe0860bddfa3',
//             'fullname': 'abc',
//             'address': 'ktm',
//             'number': '9849635014',
//             'email': 'naran@gmail.com',
//             'eventname': 'marriage',
//             'from': '1staug',
//             'to':'3rdaug',
//             'business_id': '5e44def6d69dbe0860bddfa3'
//         };
//         return BookingBusiness.create(bookingbusiness)
//         .then((bookingbusiness) => {
//             expect(bookingbusiness.email).toEqual('naran@gmail.com');
//         });
// });

       
//     });

    // it('to test the update bookingbusiness', async () => {

    //     return bookingbusiness.findByIdAndUpdate({_id :Object('5f2fb33001ad15516476bbe0')}, {$set : {user_id:'5e44def6d69dbe0860bddfa3',fullname:'naran',address:'xyz',
    //     number:'9849635014', email:'naran@gmail.com', eventname: 'bday', from: '1staug', to: '3rdaug', business_id: '5e44def6d69dbe0860bddfa3'}})
    //     .then((pp)=>{
    //         expect(pp.user_id).toEqual('5e44def6d69dbe0860bddfa3'),
    //         expect(pp.fullname).toEqual('naran'),
    //         expect(pp.address).toEqual('xyz'),
    //         expect(pp.number).toEqual('9849635014'),
    //         expect(pp.email).toEqual('naran@gmail.com'),
    //         expect(pp.eventname).toEqual('bday'),
    //         expect(pp.from).toEqual('1staug'),
    //         expect(pp.to).toEqual('3rdaug'),
    //         expect(pp.business_id).toEqual('5e44def6d69dbe0860bddfa3')
            
    
    //     })
    // });

    it('to test the delete bookingbussiness is working or not', async () => {
        const status = await bookingbusiness.deleteMany();
        expect(status.ok).toBe(1);
});





