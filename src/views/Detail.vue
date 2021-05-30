<template>
  <div>
    <Navbar />
    <div class="container my-3 p-3 detail-container rounded">
      <h2>{{ currentArticle.title }}</h2>
      <div class="detail-content-detail p-2">
        <div class="d-flex flex-row justify-content-between">
          <div
            class="border border-dark rounded detail-content mw-60 p-3 m-1"
            style="float: center"
          >
            <h4>Abstract</h4>
            <p>{{ currentArticle.abstract }}</p>
            <div class="row">
              <h4>Published at</h4>
              <p>{{ currentArticle.date }}</p>
            </div>
          </div>
          <div
            class="border border-dark rounded detail-content flex-shrink-0 p-3 m-1"
            style="float: right"
          >
            <div>
              <h4>Authors</h4>
              <ul>
                <li
                  v-for="(author, index) in currentArticle.author"
                  v-bind:key="index"
                >
                  {{ author }}
                </li>
              </ul>
            </div>
            <div>
              <h4>
                Topics
              </h4>
              <ul>
                <li
                  v-for="(subject, index) in currentArticle.subject"
                  v-bind:key="index"
                >
                  {{ subject }}
                </li>
              </ul>
            </div>
            <button @click="articleIdlog()" class="btn btn-outline-danger">
              Show Data
            </button>
          </div>
        </div>
      </div>
      <div>
        <h4 class="text-center">Suggestions</h4>
        <ResultSearch :articleList="currentArticle.suggestion" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import ResultSearch from "@/components/ResultSearch";
import SparqlQuery from "@/store/SparqlQuery";

const sparqlQuery = new SparqlQuery();

export default {
  name: "Detail",
  props: ["articleId"],
  methods: {
    async articleIdlog() {
      this.currentArticle = await sparqlQuery.getById(
        this.$route.params.articleId
      );
    },
  },
  data() {
    return {
      currentarticleId: this.articleId,
      currentArticle: sparqlQuery.getById(this.$route.params.articleId),
    };
  },
  components: {
    Navbar,
    ResultSearch,
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
