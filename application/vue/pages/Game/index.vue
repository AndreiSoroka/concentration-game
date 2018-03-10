<template>
  <div class="game_place">
    <card
      v-for="n in size"
      :key="n"
      class="game_place__card"></card>

  </div>
</template>

<style lang="scss">
  .game_place {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .game_place__card {
    margin: 8px;
  }
</style>

<script>
  import Card from './components/Card.vue';

  export default {
    components: {
      Card
    },

    data: function () {
      return {
        images: [],
        level: +this.$route.params.level,
        size: +this.$route.params.size,
      };
    }
  };
</script>
