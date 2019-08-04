const URL_BASE = "https://2ch.hk/";

function getCatalogJson(board) {
  return URL_BASE + board + "/threads.json";
}

function getThreadUrl(board, num) {
  return URL_BASE + board + "/res/" + num + ".html";
}

function getThreadJson(board, num) {
  return URL_BASE + board + "/res/" + num + ".json";
}

module.exports = { getCatalogJson, getThreadUrl, getThreadJson };
