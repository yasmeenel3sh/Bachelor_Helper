var mongoose = require('mongoose');
var User = mongoose.model('User');
// specifying the constsraints that will be added to the search parameters
var find = function (req) {
  var toFind = {};
  //if the params is not 'Not Applied' then it should be added to
  //the tofind otherwise it's not applied in the search space
  if (req.params.country !== 'NA') {
    toFind.country = req.params.country;
  }
  if (req.params.university !== 'NA') {
    toFind.university = req.params.university;
  }
  if (req.params.major !== 'NA') {
    toFind.major = req.params.major;
  }

  return toFind;
};
//Search for the parents by the specified parameters
module.exports.Search = function (req, res, next) {
  var toFind = {};
  toFind = find(req);
 
  User.paginate(
    toFind, {
      limit: Number(req.params.pp),
      page: Number(req.params.curr)
    },
    function (err, users) {
      if (err) {
        return next(err);
      }
      else {
        res.status(200).json({
          data: users,
          err: null,
          msg: 'Users are retrievred successfully'
        });
      }
    }
  );

};