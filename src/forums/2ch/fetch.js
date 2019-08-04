const axios = require("axios");
const { getCatalogJson, getThreadUrl, getThreadJson } = require("./urls");

async function getThreads(board, filter) {
  let catalog = await axios
    .get(getCatalogJson(board))
    .then(x => x.data)
    .catch(x => {
      throw `Error while fetching 2ch/${board} catalog!`;
    });

  let filtered_threads = [];

  //FILTER WITH WHITELIST
  filter.white.forEach(x => {
    catalog["threads"].forEach(thread => {
      if (thread["subject"].search(new RegExp(x, "i")) !== -1) {
        if (!filtered_threads.some(t => t.num === thread["num"]))
          filtered_threads.push(thread);
      }
    });
  });
  //

  //FILTER WITH BLACKLIST
  filter.black.forEach(x => {
    filtered_threads = filtered_threads.filter(
      thread => thread["subject"].search(new RegExp(x, "i")) === -1
    );
  });
  //

  //FILTER BY POSTS COUNT
  if (filter.min_posts_count)
    filtered_threads = filtered_threads.filter(
      x => x["posts_count"] >= filter.min_posts_count
    );
  //

  let urls = filtered_threads.map(x => getThreadUrl(board, x.num));

  return urls;
}

module.exports = {
  getThreads
};
