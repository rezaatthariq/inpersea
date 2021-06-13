<template>
  <table class="table table-hover table-responsive">
    <thead>
      <tr>
        <th scope="col-1">No.</th>
        <th scope="col-3">ID</th>
        <th scope="col-5">Title</th>
        <th scope="col-5" v-if="articleList[0].subject">Similar Topic</th>
        <th scope="col-5" v-if="articleList[0].author">Same Author</th>
        <th scope="col-1">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(article, index) in articleList" v-bind:key="article.id">
        <td scope="col-1">{{ index }}</td>
        <td scope="col-4">{{ article.id }}</td>
        <td scope="col-5">{{ article.title }}</td>
        <td scope="col-5" v-if="article.subject">{{ article.subject }}</td>
        <th scope="col-5" v-if="article.author">{{ article.author }}</th>
        <td>
          <router-link
            :to="{ path: `/article/${article.id}` }"
            class="btn btn-sm btn-info"
            >Open Article</router-link
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
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
