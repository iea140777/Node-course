const http = require('http');
const axios = require('axios');
const { stderr } = require('process');
request = require('request');

axios
  .post('http://localhost:8080/token', {
    username: 'Elena_Ivanova@epam.com',
    password: 'Elena_Ivanova'
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.error(error)
  });