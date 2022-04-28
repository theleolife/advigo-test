const express = require("express");
const faker = require('faker');
const _ = require('lodash');
const app = express();

// name, reviews, language, status,  

// const randomName = faker.name.findName(); // Rowan Nikolaus
const country = faker.address.country(); // Singapore
const city = faker.address.city(); // Laverneberg
const state = faker.address.state(); // West Virginia
const zipCode =  faker.address.zipCode(); // 57449-4128


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
app.get('/advisors', (req, res) => {
    const count = req.query.count;
    if (!count) {
      return res.status(400).send({
        errorMsg: 'count query parameter is missing.'
      });
    }
    res.send(
      // eslint-disable-next-line no-undef
      _.times(count, () => {
        const user = faker.name;
        return {
          firstName: user.firstName(),
          lastName: user.lastName(),
          jobTitle: user.jobTitle()
        };
      })
    );
  });