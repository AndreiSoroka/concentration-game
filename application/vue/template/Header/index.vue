<template>
  <div class="my-header">
    <router-link
      to="/"
      class="my-header__link">
      <div class="my-header__logo"></div>
    </router-link>
    <h3 class="my-header__title">Concentration game</h3>
  </div>
</template>

<style lang="scss">
  .my-header {
    margin: 10px 0;
  }

  .my-header__logo {
    background: url("./logo.png") center center no-repeat;
    width: 140px;
    background-size: 100%;
    height: 100px;
    display: inline-block;
    margin: 0 auto;
  }

  .my-header__title {
    display: inline-block;
  }

  .my-header__link {
    display: inline-block;
    vertical-align: middle;
  }
</style>

<script>
  import {mapState} from 'vuex';

  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState({})
    },
    methods: {},
  };
</script>
