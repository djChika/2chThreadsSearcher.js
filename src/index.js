//READING CONFIG FILE
const path_to_config = require("./config.json");
const CONFIG = JSON.parse(JSON.stringify(path_to_config));
//

const { checkForumConfig, distinctArray } = require("./service/tools");
const { openURL } = require("./service/browser");

//FIND AND OPEN THREADS
const { forums } = CONFIG;
forums.forEach((forum, index) => {
  if (!checkForumConfig(forum)) {
    throw `Invalid ${forum.name} config! (Item #${index})`;
  }

  let boards = distinctArray(forum.boards);

  let filter = forum.filter;
  filter.white = distinctArray(filter.white);
  if (filter.black) {
    filter.black = distinctArray(filter.black);
  }
  if (filter.content) {
    filter.content.types = distinctArray(filter.content.types);
  }

  const { getThreads } = require("./forums/" + forum.name + "/request");
  console.log(`Searching threads in ${forum.name}...`);
  boards.forEach(board => {
    getThreads(board, filter).then(res => {
      if (!res || res.length === 0) {
        console.log("No threads found  in " + `/${board}`);
      } else {
        console.log("Found " + res.length + " thread(s) in " + `/${board}`);
        res.forEach(url => {
          openURL(url);
        });
      }
    });
  });
});
//
