var getRandomInt = require('./generateMovieReviews.js').getRandomInt;
var fs = require('fs');
// Generate users - 
//DONE   id
//DONE   username VARCHAR(30),
//DONE   has_profile_pic TINYINT(1),
//   etag varchar(255),
//   objectURL

var loremIpsum = "college color come commercial common community company compare computer concern condition conference Congress consider consumer contain continue control cost could country couple course court cover create crime cultural culture cup current customer cut dark data daughter day dead deal death debate decade decide decision deep defense degree Democrat democratic describe design despite detail determine develop development die difference different difficult dinner direction director discover discuss discussion disease do doctor dog door down draw dream drive drop drug during each early east easy final finally financial find fine finger finish fire firm first fish five floor fly focus follow food have"
var loremArr = loremIpsum.split(' ');

var userData = [];
for (let i = 0; i < loremArr.length; i++) {
  var user = {};
  user.id = i;
  user.username = loremArr[i];
  user.has_profile_pic = getProfilePic();
  user.etag = "";
  user.objectURL = "";
  userData.push(user);
}

fs.writeFile('data/user.json', JSON.stringify(userData, null, 2), 'utf-8', (err) => {
  if (err) {
    console.log("error writing user data", err);
  }
});

function getRandomUser(loremArr) {
  return loremArr[getRandomInt(loremArr.length - 1)];
}

function getProfilePic() {
  const profileFlag = getRandomInt(2);
  // TO DO
  // if profile flag
    // set random profile pic
  // else 
    // default profile pic
  return profileFlag;
}
