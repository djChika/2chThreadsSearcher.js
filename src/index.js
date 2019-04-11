//READING CONFIG FILE
const path_to_config = require("./config.json");
const CONFIG = JSON.parse(JSON.stringify(path_to_config));
//

//GET TARGET BOARDS LIST AND FILTER
let boards = CONFIG.forum.boards;
if (!boards) {
  console.log("Error! Missing boards list in config.json.");
  return;
}
boards = [...new Set(boards)];

let filter = CONFIG.filter;
if (!filter || filter.white || filter.black) {
  console.log("Error! Missing filter in config.json.");
  return;
}
filter.white = [...new Set(filter.white)];
filter.black = [...new Set(filter.black)];
//

//FIND AND OPEN THREADS
const forum_service = require("./service/forum");
const browser = require("./service/browser");

boards.forEach(board => {
  board = board.toLowerCase();
  const URL_CATALOG = "https://2ch.hk/" + board + "/threads.json";
  const URL_THREAD = "http://2ch.hk/" + board + "/res/";
  const URL_THREAD_END = ".html";

  forum_service.getThreads(URL_CATALOG, filter).then(res => {
    if (!res || res.length === 0) {
      console.log("No threads found  in /" + board);
      return;
    } else {
      console.log("Found " + res.length + " thread(s) in /" + board);
    }
    res.forEach(x => {
      browser.openURL(URL_THREAD + x.num + URL_THREAD_END);
    });
  });
});
//
