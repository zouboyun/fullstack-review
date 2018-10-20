const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');
let app = express();
let searchedTerms = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let seachTerm = req.body.term;
  if (!searchedTerms.includes(seachTerm)) {
    searchedTerms.push(seachTerm);
    // insert into db new data
  }
  // get request to github api through helper function
  getReposByUsername(seachTerm, (error, data) => {
    if (error) {
      throw error;
    } else {
      // save the repo information in the database
      // if username is not valid, data will be undefined
      // data will be sent back in an array
      if (data !== undefined) {
        var repoDataArr = [];
        let username = data[0].owner.login;
        data.forEach(profile => {
          let repourl = profile.html_url;
          let created = profile.created_at;
          let updated = profile.updated_at;
          let forkscount = profile.forks_count;
          let reposize = profile.size;
          let repoData = {
            username,
            repourl,
            created,
            updated,
            forkscount,
            reposize
          };
          repoDataArr.push(repoData);
        });
        db.create(repoDataArr, (error, response) => {
          if (error) {
            throw error;
          } else {
            res.status(201).end();
          }
        })
      }
    }
  });
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.find((error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

