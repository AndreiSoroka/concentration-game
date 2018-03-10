<template>
  <div>
    <div v-if="!isWin">
      <div>
        {{ countDone }}
      </div>
      <div class="game_place">
        <card
          v-for="(card, index) in cards"
          :key="index"
          v-bind="card"
          class="game_place__card"
          @clickCard="onClickCard"></card>
      </div>
    </div>
    <div v-else>
      <h3>Поздравляем!</h3>
      <ul>
        <li>Всего карт: {{ size }}</li>
        <li>Карт перевернуто: {{ countActions }}</li>
        <li>Времени: {{ timeFinish() }}</li>
      </ul>
    </div>
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
        nowOpenCards: [],
        countDone: 0,
        countActions: 0,
        startDate: Date.now()
      };
    },

    computed: {
      isWin: function () {
        return this.size === this.countDone;
      },
    },

    created() {
      // картинки
      const allCards = [];
      for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
          allCards.push(`x${x} y${y}`);
        }
      }
      allCards.sort(() => {
        return Math.random() - 0.5;
      });


      // todo карточки
      let cards = allCards.slice(0, ~~(this.size / 2));

      // todo generate object
      // карты х2
      cards = cards.concat(cards);
      cards.sort(() => {
        return Math.random() - 0.5;
      });
      // объект карточек
      cards.forEach((val, index) => {
        this.cards[index] = {
          id: index,
          value: val,
          isOpen: false,
          isDone: false,
          level: this.level
        };
      });

    },

    methods: {
      onClickCard(id) {
        // уже выбрано 2 карты
        if (this.nowOpenCards.length === 2) {
          return;
        }
        // карта среди выбранных
        if (~this.nowOpenCards.indexOf(id)) {
          return;
        }

        this.countActions += 1;

        // открыть карту
        this.__updateCardData(id, 'isOpen', true);
        this.nowOpenCards.push(id);

        // закрыть карты через время
        if (this.nowOpenCards.length === 2) {
          setTimeout(this.closeOpenCards, 1000);
        }

      },

      closeOpenCards() {
        // карты совпали
        if (this.cards[this.nowOpenCards[0]].value === this.cards[this.nowOpenCards[1]].value) {
          this.__updateCardData(this.nowOpenCards[0], 'isDone', true);
          this.__updateCardData(this.nowOpenCards[1], 'isDone', true);
          this.countDone += 2;
        }
        // разные карты
        else {
          this.nowOpenCards.forEach(id => {
            this.__updateCardData(id, 'isOpen', false);
          });
        }
        this.nowOpenCards = [];
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
      },

      timeFinish() {
        let sec = ~~((Date.now() - this.startDate) / 1000);
        let min = ~~(sec / 60);
        return `${min} мин ${sec - min * 60} сек`;
      }
    }
  };
</script>
