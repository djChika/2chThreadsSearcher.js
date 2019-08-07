const axios = require("axios");
const { getCatalogJson, getThreadUrl, getThreadJson } = require("./urls");
const {
  white: whiteFilter,
  black: blackFilter,
  posts: postsCountFilter,
  content: contentFilter
} = require("./filter");

async function getThreads(board, filter) {
  let catalog = await axios
    .get(getCatalogJson(board))
    .then(x => x.data)
    .catch(x => {
      throw `Error while fetching 2ch/${board} catalog!`;
    });

  let threads = catalog["threads"];

  threads = whiteFilter(threads, filter.white);

  if (filter.black) {
    threads = blackFilter(threads, filter.black);
  }

  if (filter.min_posts_count) {
    threads = postsCountFilter(threads, filter.min_posts_count);
  }

  if (filter.content) {
    let full_threads = await Promise.all(
      threads.map(async thread => {
        return await axios
          .get(getThreadJson(board, thread["num"]))
          .then(res => {
            return res.data;
          });
      })
    );

    threads = await contentFilter(
      threads,
      full_threads,
      filter.content.types,
      filter.content.percent
    );
  }

  let urls = threads.map(x => getThreadUrl(board, x.num));

  return urls;
}

module.exports = {
  getThreads
};
