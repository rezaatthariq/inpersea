<template>
  <div class="home">
    <h1>IN-PERSEA</h1>
    <h2>SEARCH YOUR DOCUMENTS HERE</h2>
    <br />
    <div class="searchbar-container">
      <div class="d-flex justify-content-center">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search"
        ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </div>
      <p type="button">Advanced Search</p>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "ContentHome",
};
</script>

<style lang="css">
@import "../css/inpersea.css";
</style>