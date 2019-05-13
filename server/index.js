const express = require('express');
const github = require('../helpers/github.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username, (err, response, body) => {
    if (err) {
      res.send(err);
      return;
    }
    var count = 0;
    var countErr = 0;

    selectData(JSON.parse(body)).forEach((repo) =>  db.save(repo, (err) => {
      if (err) {
        countErr++;
        if (countErr === JSON.parse(body).length) {
        console.log("HERE 1");
        res.sendStatus(500);
        return;
      }
    }
      count++;
      if (count === JSON.parse(body).length) {
        console.log("HERE 2")
        res.sendStatus(201);
      }
    }));
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  var query = db.Repo.find();
  query.exec((err, repos) =>  {
    if(err) {
      res.sendStatus(500);
      return;
    }
    res.send(topRepos(repos));
  })
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


var selectData = (data) => {
  var dataArray = [];

  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var repoData = {};
    repoData['username'] = obj['owner']['login'];
    repoData['reponame'] = obj['name'];
    repoData['repourl'] = obj['html_url'];
    repoData['forkcount'] = obj['forks_count'];
    repoData['id'] = obj['id'];
    dataArray.push(repoData);
  }
  return dataArray;
}

var topRepos = (repos) => {
  return repos.sort((repo1, repo2) => {
    if(repo1.forkcount > repo2.forkcount) {
      return -1;
    } else if (repo2.forkcount > repo1.forkcount) {
      return 1;
    } else {
      return 0;
    }
  }).slice(0, 25);
}