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
  import shuffle from 'lodash/shuffle';

  // картинки для карт (генерация классов css)
  const allCards = Array.from({length: 25}, (value, index) => `x${Math.floor(index / 5)} y${index % 5}`);

  const DELAY_OPEN_CARD = 1000;

  export default {
    components: {
      Card
    },

    data() {
      let level = +this.$route.params.level;
      let size = +this.$route.params.size;
      return {
        images: [],
        level,
        size,
        needOpenCard: (level <= 2) ? 2 : 3,
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
        nowOpenIdCards: [],
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
      let _allCards = shuffle(allCards);

      // создаем карты для игры, и пары для них
      let cards = _allCards.slice(0, Math.floor(this.size / this.needOpenCard));

      cards = [].concat.apply([], (function addArray(i = 1, arr = [], needOpenCard = this.needOpenCard) {
        if (i <= needOpenCard) {
          i++;
          arr.push(cards);
          return addArray(i, arr);
        }
        return arr;
      }.bind(this))());

      // перемешиваем карты
      cards = shuffle(cards);

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
        // уже выбрано нуженое кол-во карт
        if (this.nowOpenIdCards.length === this.needOpenCard) {
          return;
        }
        // карта среди выбранных
        if (this.nowOpenIdCards.includes(id)) {
          return;
        }

        this.countActions += 1;

        // открыть карту
        this.__updateCardData(id, 'isOpen', true);
        this.nowOpenIdCards.push(id);

        // закрыть карты через время
        if (this.nowOpenIdCards.length === this.needOpenCard) {
          setTimeout(() => {
            this.checkCards();
            this.closeOpenCards();
          }, DELAY_OPEN_CARD);
        }

      },

      checkCards() {
        // проверка совпадения карт
        let isValueEq = true;

        for (let i = 1; i < this.nowOpenIdCards.length; i++) {
          if (this.cards[this.nowOpenIdCards[i]].value === this.cards[this.nowOpenIdCards[i - 1]].value) {
            continue;
          }
          isValueEq = false;
          break;
        }

        // если карты совпали, проставляем им isDone
        if (isValueEq) {
          this.nowOpenIdCards.forEach(id => this.__updateCardData(id, 'isDone', true));
          this.countDone += this.nowOpenIdCards.length;
        }
      },

      closeOpenCards() {
        this.nowOpenIdCards.forEach(id => this.__updateCardData(id, 'isOpen', false));
        this.nowOpenIdCards = [];
      },

      /**
       * Обновление вложнных объектов в @see {@link data.cards}
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
