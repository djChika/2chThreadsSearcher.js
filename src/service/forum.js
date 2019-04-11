const axios = require("axios");

async function getThreads(url, filter) {
  let board = await axios
    .get(url)
    .then(x => x.data)
    .catch(x => {
      return [];
    });

  if (!board || board.length === 0) {
    return;
  }

  if (!filter) {
    return;
  }

  let filtered_threads = [];

  //FILTER WITH WHITELIST
  filter.white.forEach(x => {
    board["threads"].forEach(thread => {
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
  filtered_threads = filtered_threads.filter(
    x => x["posts_count"] >= filter.min_posts_count
  );
  //

  return filtered_threads;
}

module.exports = {
  getThreads
};
