const opn = require("opn");

function openURL(url) {
  opn(url);
}

module.exports = {
  openURL
};
