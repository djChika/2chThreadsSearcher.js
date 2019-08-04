function checkForumConfig(forum) {
  if (!forum.name || !forum.boards || !forum.filter || !forum.filter.white)
    return false;
  return true;
}

module.exports = {
  checkForumConfig
};
