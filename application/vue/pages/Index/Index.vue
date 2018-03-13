<template>
  <div class="page_in">

    <link
      :href="preload.cardImage"
      rel="prefetch prerender"/>
    <link
      :href="preload.smilesImage"
      rel="prefetch prerender"/>

    <div class="page_in__block">
      <b>Концентрация (Concentration)</b>, также известная как Match Match, Match Up, Memory, Pelmanism,
      Shinkei-suijaku,
      Pexeso или просто пары, представляет собой карточную игру, в которой все карты укладываются лицом вниз,
      а две карты переворачивают лицом вверх по очереди. Цель игры - перевернуть пары совпадающих карт.
    </div>

    <div class="jumbotron start_game">
      <h2>Игра Концентрация</h2>

      <div class="start_game__item">
        <div class="start_game__title">Выберете уровень:</div>
        <div class="start_game__param">
          <button
            v-for="level in levels"
            :key="level"
            :class="{active: level===selectLevel}"
            class="btn btn-outline-dark"
            type="button"
            @click="selectLevel=level">
            {{ level }}
          </button>
        </div>
        <div class="start_game__description">
          <div v-show="selectLevel===1">На столе простые карточки, нужно найти пару</div>
          <div v-show="selectLevel===2">На столе карты могут быть отражены и повернуты, нужно найти пару</div>
          <div v-show="selectLevel===3">На столе карты могут быть отражены и повернуты, нужно найти три карты</div>
        </div>
      </div>

      <div class="start_game__item">
        <div class="start_game__title">Выберете количество карт:</div>
        <div class="start_game__param">
          <button
            v-for="size in sizes"
            :key="size"
            :class="{active: size===selectSize}"
            class="btn btn-outline-dark"
            type="button"
            @click="selectSize=size">
            {{ size }}
          </button>
        </div>
      </div>

      <button
        class="btn btn-primary"
        type="button"
        @click="onClickStart">
        Начать игру
      </button>
    </div>


  </div>
</template>

<style lang="scss">
  .page_in__block {
    /*margin: 0 0 25px 0;*/
  }

  .start_game {
    margin: 25px 0;
    background: rgba(255, 255, 255, 0.68);
  }

  .start_game__item {
    margin: 0 0 1rem 0;
  }

  .start_game__title {
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }

  .start_game__description {
    margin: 0.5rem 0;
    color: #6a6b6c;
  }

  .start_game__param {
    button {
      width: 3rem;
      margin: 3px;
    }
  }

</style>

<script>
  import cardImage from '../Game/components/card.png';
  import smilesImage from '../Game/components/smiles.png';

  export default {
    data: () => ({
      levels: [1, 2, 3],
      sizes: [6, 12, 18, 24, 30, 36, 42, 48],
      selectLevel: 2,
      selectSize: 24,
      preload: {cardImage, smilesImage}
    }),
    methods: {
      onClickStart() {
        this.$router.push({
          name: 'game',
          params: {
            size: this.selectSize,
            level: this.selectLevel
          }
        });
      }
    }
  };
</script>
