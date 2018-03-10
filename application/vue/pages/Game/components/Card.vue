<template>
  <div class="card">
    <div
      :class="{'-flipped': isOpen || isDone, '-done': isDone}"
      class="card__body"
      @click="onClickCard">
      <div class="card__item -front">{{ value }}</div>
      <div class="card__item -back"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .card {
    position: relative;
    width: 100px;
    height: 134px;
    perspective: 800px;
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
    &.-done {
      .-front {
        opacity: 0.3;
      }
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
    props: {
      id: {
        type: Number,
        default: null,
      },
      value: {
        type: Number,
        default: null,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      isDone: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onClickCard() {
        this.$emit('clickCard', this.id);
      }
    }
  };
</script>
