const axios = require('axios');
const { Given, When, Then } = require('cucumber');

Given('Check List' , async () => {
    const response = await axios.get('http://localhost:3000/urs ');
    console.log(response);

})

Given('Api started' ,() => {
    console.log('API RUNS successfully');

})

Given('Api started with server port' , async () => {
    const response = await axios.get('http://localhost:3000/userurs ');
    console.log(response.data);

})
Given('Business Plan List' , async () => {
    const response = await axios.get('http://localhost:3000/findbusinessbook ');
    console.log(response.data);

})
Given('Venue Plan List' , async () => {
    const response = await axios.get('http://localhost:3000/findvenuebook ');
    console.log(response.data);

})
Given('Show The post' , async () => {
    const response = await axios.get('http://localhost:3000/findblog ');
    console.log(response.data);

})

// Given('Get single user' , async () => {
//     const response = await axios.get('http://localhost:3000//userprofile/:5f168003a0f9b21f101b26e6');
//     console.log(response);

// })
// Given('User launches register screen' , async () => {
//     const response = await axios.post('http://localhost:3000/userregister');
//     console.log(response.data);
// })