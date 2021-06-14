<template>
  <div>
    <Navbar />
    <div class="container my-3 p-3 detail-container rounded">
      <h2>{{ this.currentArticle.title }}</h2>
      <div class="detail-content-detail p-2">
        <div class="d-flex flex-row justify-content-between">
          <div
            class="border border-dark rounded detail-content mw-60 p-3 m-1"
            style="float: center"
          >
            <h4>Abstract</h4>
            <p>{{ this.currentArticle.abstract }}</p>
            <div class="row">
              <h4>Published at</h4>
              <p>{{ this.currentArticle.date }}</p>
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
                  v-for="(author, index) in this.currentArticle.author"
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
                  v-for="(subject, index) in this.currentArticle.subject"
                  v-bind:key="index"
                >
                  {{ subject }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 class="text-center">Suggestions</h4>
        <div class="row">
          <div class="col" v-if="this.currentArticle.similarTopic.length > 0">
            <h5 class="text-center">Article with Similar Topic(s)</h5>
            <Suggestions :articleList="this.currentArticle.similarTopic" />
          </div>
          <div class="col" v-if="this.currentArticle.sameAuthor.length > 0">
            <h5 class="text-center">Article by Same Author(s)</h5>
            <Suggestions :articleList="this.currentArticle.sameAuthor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Suggestions from "@/components/Suggestions";
import SparqlQuery from "@/store/SparqlQuery";

const sparqlQuery = new SparqlQuery();

export default {
  name: "Detail",
  props: ["articleId"],
  data() {
    return {
      currentArticle: [],
    };
  },
  methods: {
    async loadDetail() {
      this.currentArticle = await sparqlQuery.getById(this.articleId);
    },
  },
  created() {
    this.loadDetail();
  },
  watch: {
    articleId: function() {
      this.loadDetail();
    },
  },
  components: {
    Navbar,
    Suggestions,
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
