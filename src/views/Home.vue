<template>
  <div class="main">
    <Navbar />
    <div
      class="container d-flex flex-column justifyc-content-start align-items-stretch"
    >
      <ContentHome />
      <div class="d-flex justify-content-center align-items-center">
        <div class="input-group w-50">
          <input
            type="text"
            class="form-control"
            aria-label="Text input with segmented dropdown button"
            name="search-text"
            id="search-text"
            v-model="searchText"
            @keyup.enter="fetchArticles(searchText, searchCategory)"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="fetchArticles(searchText, searchCategory)"
          >
            Search
          </button>
          <b-form-select
            class="btn btn-primary"
            v-model="searchCategory"
            :options="options"
          ></b-form-select>
        </div>
      </div>
      <br /><br />
      <div v-if="articleList.length !== 0">
        <h2 class="text-center">Search Results</h2>
        <div class="result">
          <ResultSearch :articleList="articleList" />
        </div>
      </div>
      <h3 v-if="articleList.length === 0" class="text-center text-secondary">
        Your search result will show up here
      </h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import ContentHome from "@/components/ContentHome.vue";
import ResultSearch from "@/components/ResultSearch.vue";
import SparqlQuery from "@/store/SparqlQuery";
import { mapActions } from "vuex";

const sparqlQuery = new SparqlQuery();

export default {
  name: "Home",
  data() {
    return {
      searchText: "",
      searchCategory: "title",
      articleList: [],
      options: [
        { value: "title", text: "By Title" },
        { value: "author", text: "By Author" },
        { value: "subject", text: "By Subject" },
      ],
    };
  },
  methods: {
    ...mapActions(["getArticles"]),
    async fetchArticles(text, category) {
      if (text == "") {
        this.articleList = await sparqlQuery.getAll(text);
      } else if (category === "title") {
        this.articleList = await sparqlQuery.getAll(text);
      } else if (category === "author") {
        this.articleList = await sparqlQuery.getByAuthor(text);
      } else if (category === "subject") {
        this.articleList = await sparqlQuery.getBySubject(text);
      }
    },
    changeCategory(category) {
      this.searchCategory = category;
    },
  },
  components: {
    Navbar,
    ContentHome,
    ResultSearch,
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
