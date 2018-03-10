<template>
  <div class="card">
    <div
      :class="classCardBody"
      class="card__body"
      @click="onClickCard">
      <div class="card__item -front">
        <div
          :class="value"
          :style="styleObjImage()"
          class="card__image"></div>
      </div>
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
    cursor: pointer;

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

    background: url("./card.png");
    background-size: cover;
    border-radius: 4px;
    backface-visibility: hidden;
    box-shadow: 4px 4px 5px 0 #333;

    &.-front {
      background-size: auto;
      transform: rotateY(180deg);
    }
    &.-back {
      background-position: -101px;
    }
  }

  .card__image {
    background: url("./smiles.png");
    width: 79px;
    height: 74px;
    margin: 14px auto;
    transform-style: preserve-3d;
    transition: transform 0.3s;

    &.x1 {
      background-position-x: -83px;
    }
    &.x2 {
      background-position-x: -162px;
    }
    &.x3 {
      background-position-x: -240px;
    }
    &.x4 {
      background-position-x: -321px;
    }

    &.y1 {
      background-position-y: -90px;
    }
    &.y2 {
      background-position-y: -180px;
    }
    &.y3 {
      background-position-y: -270px;
    }
    &.y4 {
      background-position-y: -363px;
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
        type: String,
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
      level: {
        type: Number,
        default: 0,
      },
    },

    data() {
      return {
        isRotateY: false
      };
    },

    computed: {
      classCardBody() {
        return {
          "-flipped": this.isOpen || this.isDone,
          "-done": this.isDone,
        };
      }
    },

    created() {
      this.isRotateY = this._randomInteger(0, 1);
    },

    methods: {
      onClickCard() {
        this.$emit('clickCard', this.id);
      },

      styleObjImage() {
        let styles = {};
        if (this.level > 1) {
          styles.transform = `rotate(${this._randomInteger(-50, 50)}deg)`;
        }
        if (this.level > 2 && this.isRotateY) {
          styles.transform += ` rotateY(180deg)`;
        }

        return styles;
      },

      /**
       * Генерация рандомного числа
       * @param {number} min
       * @param {number} max
       * @returns {number}
       * @private
       */
      _randomInteger(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
      }
    }
  };
</script>
