<template>
  <div class="my-application">
    <header-template></header-template>
    <router-view></router-view>
    <footer-template></footer-template>
  </div>
</template>

<style lang="scss"></style>

<script>
  import './app.scss';

  import HeaderTemplate from './template/Header/index.vue';
  import FooterTemplate from './template/Footer/index.vue';
  import {mapState} from 'vuex';


  export default {
    components: {
      HeaderTemplate,
      FooterTemplate,
    },
    data() {
      return {};
    },

    computed: {
      ...mapState({})
    },
    methods: {},
  };
</script>
