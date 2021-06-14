<template>
  <div>
    <link
      rel="stylesheet"
      href="path/to/font-awesome/css/font-awesome.min.css"
    />
    <b-table
      :fields="fields"
      class="table table-hover table-responsive"
      id="my-table"
      :items="articleList"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(link)="articleList">
        <a @click="openArticle(articleList.value)" class="btn btn-sm btn-info"
              >Open Article</a
        >
      </template>
    </b-table>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultSearch",
  props: ["articleList"],
  data() {
    return {
      fields: [
        { key: "index", label: "No" },
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "link", label: "Action" },
      ],
      articles: this.articleList,
      perPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    openArticle(articleId) {
      console.log(articleId)
      return this.$router.push({ path: articleId });
    },
  },
  computed: {
    rows() {
      return this.articleList.length;
    },
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
