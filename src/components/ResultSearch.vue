<template>
  <table class="table table-hover table-responsive">
    <thead>
      <tr>
        <th scope="col-1">No.</th>
        <th scope="col-3">ID</th>
        <th scope="col-5">Title</th>
        <th scope="col-1">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(article, index) in articleList" v-bind:key="article.id">
        <td scope="col-1">{{ index }}</td>
        <td scope="col-4">{{ article.id }}</td>
        <td scope="col-5">{{ article.title }}</td>
        <td>
          <a @click="openArticle(article.id)" class="btn btn-sm btn-info"
            >Open Article</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ResultSearch",
  props: ["articleList"],
  data() {
    return {
      articles: this.articleList,
    };
  },
  methods: {
    openArticle(articleId) {
      return this.$router.push({ path: `/article/${articleId}` });
    },
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
