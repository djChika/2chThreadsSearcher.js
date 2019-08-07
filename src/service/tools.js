function checkForumConfig(forum) {
  if (!forum.name || !forum.boards || !forum.filter || !forum.filter.white)
    return false;
  return true;
}

function distinctArray(arr) {
  return arr.filter((x, i) => arr.indexOf(x.toLowerCase()) === i);
}

module.exports = {
  checkForumConfig,
  distinctArray
};
