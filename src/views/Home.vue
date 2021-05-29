<template>
  <div class="main">
    <Navbar />
    <div class="content">
      <!--
        <ContentHome />
        <h2>Search Results</h2>
        <br />
        <div class="result"></div>
      -->
       <Detail />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
//import ContentHome from "@/components/ContentHome.vue";
//import ResultSearch from "@/components/ResultSearch.vue";
import Detail from "@/components/Detail.vue";

export default {
  name: "Home",
  components: {
    Navbar, 
    Detail,
    //ContentHome,
    //ResultSearch,
  },
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>