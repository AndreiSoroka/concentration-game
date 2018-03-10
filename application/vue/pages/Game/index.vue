<template>
  <div class="game_place">
    <card
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      class="game_place__card"
      @clickCard="onClickCard"></card>
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
        /*
        [
          {
            id: index,
            value: val,
            isOpen: false,
            isDone: false,
          }
        ]
        */
        cards: [],
        openCards: [],
      };
    },

    created() {
      // todo карточки
      let cards = Array.from({length: this.size / 2}, (i, v) => v);

      // todo generate object
      // карты х2
      cards = cards.concat(cards);
      // объект карточек
      cards.forEach((val, index) => {
        this.cards[index] = {
          id: index,
          value: val,
          isOpen: false,
          isDone: false,
        };
      });

    },

    methods: {
      onClickCard(id) {
        if (this.openCards.length === 2) {
          return;
        }

        this.__updateCardData(id, 'isOpen', true);
        this.openCards.push(id);

        if (this.openCards.length === 2) {
          setTimeout(this.closeOpenCards, 1000);
        }

      },

      closeOpenCards() {
        // карты совпали
        if (this.cards[this.openCards[0]].value === this.cards[this.openCards[1]].value) {
          this.__updateCardData(this.openCards[0], 'isDone', true);
          this.__updateCardData(this.openCards[1], 'isDone', true);
        }
        // разные карты
        else {
          this.openCards.forEach(id => {
            this.__updateCardData(id, 'isOpen', false);
          });
        }
        this.openCards = [];
      },

      /**
       *
       * @param id
       * @param param
       * @param value
       * @private
       */
      __updateCardData(id, param, value) {
        let _cardData = {...this.cards[id], [param]: value};
        this.$set(this.cards, id, _cardData);
      }
    }
  };
</script>
