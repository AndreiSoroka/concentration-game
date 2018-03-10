<template>
  <div class="my-application">
    <header-template></header-template>
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>

<script>
  import './app.scss';

  import HeaderTemplate from './template/Header/index.vue';
  import {mapState} from 'vuex';


  export default {
    components: {
      HeaderTemplate,
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
