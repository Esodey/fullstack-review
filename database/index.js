const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new Schema({
  username : String,
  reponame: String,
  repourl: String,
  forkcount: Number,
  id: { type: Number, unique: true },
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var newRepo = new Repo(repo);
  newRepo.save((err) => {
    if (err) {
      callback(err);
      return;
    } 
    callback(null);
  });
}

module.exports.save = save;
module.exports.Repo = Repo;
