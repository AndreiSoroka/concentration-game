<template>
  <div class="card">
    <div
      :class="{'-flipped': isOpen}"
      class="card__body"
      @click="onClickCard">
      <div class="card__item -front">1</div>
      <div class="card__item -back">2</div>
    </div>
  </div>
</template>

<style lang="scss">
  .card {
    position: relative;
    width: 100px;
    height: 134px;

  }

  .card__body {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.3s;

    &.-flipped {
      transform: rotateY(180deg);
    }
  }

  .card__item {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("./card.png") no-repeat;
    background-size: cover;
    border-radius: 4px;
    backface-visibility: hidden;
    box-shadow: 4px 4px 5px 0 #888;

    &.-front {
      transform: rotateY(180deg);
    }
    &.-back {
      background-position: -101px;
    }
  }
</style>

<script>
  export default {
    data: function () {
      return {
        isOpen: false
      };
    },
    methods: {
      onClickCard() {
        this.isOpen = true;

      }
    }
  };
</script>
