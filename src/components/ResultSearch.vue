<template>
  <div>
    <link
      rel="stylesheet"
      href="path/to/font-awesome/css/font-awesome.min.css"
    />

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
    <ul class="pagination" v-if="articleList.length > 10 || currentPage > 1">
      <li class="pagination-item" title="First Page">
        <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          <i class="fa fa-chevron-left"></i>
          <i class="fa fa-chevron-left"></i>
        </button>
      </li>

      <li class="pagination-item" title="Previous Page">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
      </li>

      <li class="pagination-item" v-for="(page, index) in pages" :key="index">
        <button type="button" @click="onClickPage(page.number)">
          {{ page.number }}
        </button>
      </li>

      <li class="pagination-item" title="Next Page">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
          <i class="fa fa-chevron-right"></i>
        </button>
      </li>

      <li class="pagination-item" title="Last Page">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
          <i class="fa fa-chevron-right"></i>
          <i class="fa fa-chevron-right"></i>
        </button>
      </li>
    </ul>
  </div>
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
  // maxVisibleButtons: {
  //   type: Number,
  //   required: false,
  //   default: 3,
  // },
  // totalPages: {
  //   type: Number,
  //   required: true,
  // },
  // total: {
  //   type: Number,
  //   required: true,
  // },
  // perPage: {
  //   type: Number,
  //   required: true,
  // },
  // currentPage: {
  //   type: Number,
  //   required: true,
  // },
  methods: {
    openArticle(articleId) {
      return this.$router.push({ path: `/article/${articleId}` });
    },
    // onClickFirstPage() {
    //   this.$emit("pagechanged", 1);
    // },
    // onClickPreviousPage() {
    //   this.$emit("pagechanged", this.currentPage - 1);
    // },
    // onClickPage(page) {
    //   this.$emit("pagechanged", page);
    // },
    // onClickNextPage() {
    //   this.$emit("pagechanged", this.currentPage + 1);
    // },
    // onClickLastPage() {
    //   this.$emit("pagechanged", this.totalPages);
    // },
    // isPageActive(page) {
    //   return this.currentPage === page;
    // },
    // onPageChange(page) {
    //   this.currentPage = page;
    // },
  },
  // computed: {
  //   paginatedData() {
  //     let start = (this.currentPage - 1) * this.perpage,
  //       end = start + this.perPage;
  //     return this.data.slice(start, end);
  //   },
  //   startPage() {
  //     if ((this, currentPage === 1)) return 1;
  //     if (this.currentPage === this.totalPages)
  //       return (
  //         this.totalPages -
  //         this.maxVisibleButtons +
  //         (this.maxVisibleButtons - 1)
  //       );
  //     return this.currentPage - 1;
  //   },
  //   endPage() {
  //     return Math.min(
  //       this.startPage + this.maxVisibleButtons - 1,
  //       this.totalPages
  //     );
  //   },
  //   pages() {
  //     let range = [];
  //     for (let i = this.startPage; i <= this.endPage; i += 1) {
  //       range.push({
  //         number: i,
  //         isDisabled: i === this.currentPage,
  //       });
  //     }
  //     return range;
  //   },
  //   isInFirstPage() {
  //     return this.currentPage === 1;
  //   },
  //   isInLastPage() {
  //     return this.currentPage === this.totalPages;
  //   },
  // },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>
