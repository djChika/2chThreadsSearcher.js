//READING CONFIG FILE
const path_to_config = require("./config.json");
const CONFIG = JSON.parse(JSON.stringify(path_to_config));
//

const { openURL } = require("./service/browser");
const { checkForumConfig } = require("./service/validate");

//FIND AND OPEN THREADS
const { forums } = CONFIG;
forums.forEach((forum, index) => {
  if (!checkForumConfig(forum)) {
    throw `Invalid ${forum.name} config! (Item #${index})`;
  }

  let boards = [...new Set(forum.boards.map(x => x.toLowerCase()))];

  let filter = forum.filter;
  filter.white = [...new Set(filter.white)];
  if (filter.black) filter.black = [...new Set(filter.black)];
  if (filter.content) filter.content = [...new Set(filter.content)];

  const { getThreads } = require("./forums/" + forum.name + "/fetch");
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
