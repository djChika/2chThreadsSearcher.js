function white(threads, words) {
  return threads.filter(thread => {
    return words.some(word => {
      return thread["subject"].search(new RegExp(word, "i")) !== -1;
    });
  });
}

function black(threads, words) {
  return threads.filter(thread => {
    return words.some(word => {
      return thread["subject"].search(new RegExp(word, "i")) === -1;
    });
  });
}

function posts(threads, count) {
  return threads.filter(thread => {
    return thread["posts_count"] >= count;
  });
}

async function content(threads, full_threads, types, percent) {
  function isFullThreadWithContent(thread, types, percent) {
    if (thread["threads"] && thread["threads"].length > 0) {
      let posts = thread["threads"][0]["posts"];

      let posts_with_content = posts.filter(post => {
        let files = post["files"];
        return files.some(file => {
          return types.some(type => {
            return file["name"].includes(type);
          });
        });
      });

      return posts_with_content.length / posts.length >= percent;
    }
  }

  return threads.filter(thread => {
    let full_thread = full_threads.find(
      x => x["current_thread"] === thread["num"]
    );
    if (!full_thread) return;
    return isFullThreadWithContent(full_thread, types, percent);
  });
}

module.exports = {
  white,
  black,
  posts,
  content
};
