const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repourl: { type: String, unique: true },
  created: { type: Date, default: Date.now },
  updated: Date,
  forkscount: Number,
  reposize: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let create = (repoDataArr, cb) => {
  Repo.create(repoDataArr, (error, response) => {
    if (error) throw (error);
    cb(null, response);
  });
};

let find = (cb) => {
  Repo.find().sort({'reposize': -1}).limit(25).exec((error, response) => {
    if (error) throw (error);
    cb(null,response);
  });
};

let update = (repourl, newrepoData) => {
  Repo.updateOne({ repourl: repourl }, newrepoData, (error, response) => {
    if (error) throw (error);
    console.log('DATA FROM DB UPDATE>>>>>>', response);
  })
};

module.exports.create = create;
module.exports.find = find;
module.exports.update = update;