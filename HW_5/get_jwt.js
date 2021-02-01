const http = require('http');
const axios = require('axios');

axios
  .get('http://localhost:8080', {
    headers: {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVsZW5hX0l2YW5vdmFAZXBhbS5jb20iLCJpYXQiOjE2MTIxNjMzNTUsImV4cCI6MTYxMjIwNjU1NX0.rBfDbSzkPAZe-lNsAR7PfgOT7DKHIVTOnYE8EzxjWuU`},
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`);
  })
  .catch(error => {
    console.error(error)
  });


