// const { response } = require("express");

console.log("hey there i am client side javascript file");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
// messageOne.textContent = '';
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location  = search.value;
    messageOne.textContent = 'Loading...';
    // messageTwo.textContent = '';    
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
            messageTwo.textContent = error.message;
        }
        else {
            console.log(data.location);
            console.log(data.forecast);
            if(messageTwo && messageOne) {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        } }
    })
});
    console.log(location);
})