<template>
  <div class="game">
    <div
      v-if="!isWin"
      class="game_place">
      <card
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"
        class="game_place__card"
        @clickCard="onClickCard"></card>
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
    border-radius: 5px;
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

  // картинки для карт (генерация классов css)
  const allCards = Array.from({length: 25}, (value, index) => `x${Math.floor(index / 5)} y${index % 5}`);

  const DELAY_OPEN_CARD = 1000;

  export default {
    components: {
      Card
    },

    data() {
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
      isWin() {
        return this.cards.length === this.countDone;
      },
    },

    created() {
      // случайные картинки на картах
      allCards.sort(() => Math.random() - 0.5);

      // создаем карты для игры, и пары для них
      let cards = allCards.slice(0, Math.floor(this.size / 2));
      cards = cards.concat(cards);

      // перетасовка карт
      cards.sort(() => Math.random() - 0.5);
      cards.sort(() => Math.random() - 0.5);
      cards.sort(() => Math.random() - 0.5);

      this.cards = cards.map((value, id) => ({
        id,
        value,
        isOpen: false,
        isDone: false,
        level: this.level
      }));
    },

    methods: {
      onClickCard(id) {
        // уже выбрано 2 карты
        if (this.nowOpenCards.length === 2) {
          return;
        }
        // карта среди выбранных
        if (this.nowOpenCards.includes(id)) {
          return;
        }

        this.countActions += 1;

        // открыть карту
        this.__updateCardData(id, 'isOpen', true);
        this.nowOpenCards.push(id);

        // закрыть карты через время
        if (this.nowOpenCards.length === 2) {
          setTimeout(() => {
            this.checkCards();
            this.closeOpenCards();
          }, DELAY_OPEN_CARD);
        }

      },

      checkCards() {
        // карты совпали
        if (this.cards[this.nowOpenCards[0]].value === this.cards[this.nowOpenCards[1]].value) {
          this.nowOpenCards.forEach(id => this.__updateCardData(id, 'isDone', true));
          this.countDone += this.nowOpenCards.length;
        }
      },

      closeOpenCards() {
        this.nowOpenCards.forEach(id => this.__updateCardData(id, 'isOpen', false));
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
        let sec = Math.floor((Date.now() - this.startDate) / 1000);
        return `${Math.floor(sec / 60)} мин ${sec % 60} сек`;
      }
    }
  };
</script>
