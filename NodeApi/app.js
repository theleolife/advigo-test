const express = require("express");
const faker = require('faker');
const _ = require('lodash');
const app = express();

const numReview = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.listen(3001, () => {
 console.log("Server running on port 3001");
});
app.get('/advisors', (req, res) => {
    const count = req.query.count;
    if (!count) {
      return res.status(400).send({
        errorMsg: 'parameter  ?count= is missing.'
      });
    }
    res.send(
      _.times(count, () => {
        const user = faker.name;
        return {
          firstName: user.firstName(),
          lastName: user.lastName(),
          jobTitle: user.jobTitle(),
          language: _.sample(['de', 'en','it','pt', 'es']),
          reviews: numReview(0, 5),
          status:  _.sample([true, false]),
        };
      })
    );
  });