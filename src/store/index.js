import Vue from "vue";
import Vuex from "vuex";
import SparqlQuery from "./SparqlQuery";

Vue.use(Vuex);

const sparqlQuery = new SparqlQuery();

const store = new Vuex.Store({
  state: {
    articleList: [],
    currentArticle: [],
  },
  actions: {
    async getArticles({ commit, text }) {
      const articles = await sparqlQuery.getAll(text);
      commit("get_articles", articles);
    },
  },
  mutations: {
    get_articles(state, articles) {
      state.articleList = articles;
    },
  },
});

export default store;
