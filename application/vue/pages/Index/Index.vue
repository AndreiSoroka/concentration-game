<template>
  <div class="page_in">

    <link
      :href="preload.cardImage"
      rel="prefetch prerender"/>
    <link
      :href="preload.smilesImage"
      rel="prefetch prerender"/>

    <div class="page_in__block">
      <b>Concentration</b>, also known as Match Match, Match Up, Memory, Pelmanism,
      Shinkei-suijaku,
      Pexeso or simply pairs, is a card game where all cards are laid face down,
      and two cards are flipped face up in turn. The goal of the game is to flip pairs of matching cards.
    </div>

    <div class="jumbotron start_game">
      <h2>Concentration Game</h2>

      <div class="start_game__item">
        <div class="start_game__title">Choose a level:</div>
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
          <div v-show="selectLevel===1">Simple cards are on the table, you need to find a pair</div>
          <div v-show="selectLevel===2">Cards on the table can be reflected and rotated, you need to find a pair</div>
          <div v-show="selectLevel===3">Cards on the table can be reflected and rotated, you need to find three cards</div>
        </div>
      </div>

      <div class="start_game__item">
        <div class="start_game__title">Choose the number of cards:</div>
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
        Start game
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
      selectSize: 12,
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
