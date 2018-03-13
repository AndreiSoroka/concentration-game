<template>
  <div class="game">

    <div class="game__menu">
      <router-link
        to="/"
        class="btn btn-link">Новая игра
      </router-link>
      <button
        class="btn btn-link"
        @click="handlerReloadThisLevel">Повторить уровень
      </button>
    </div>

    <div
      v-if="!isWin"
      :class="{'-hide': blockGame}"
      class="game_place">
      <card
        v-for="(card, index) in cards"
        :key="`${countGame}-${index}`"
        v-bind="card"
        class="game_place__card"
        @clickCard="handlerClickCard"></card>
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
    position: relative;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    animation: show_cards .5s;
    opacity: 1;

    &.-hide {
      opacity: 0;
      animation: hide_cards .4s;
    }
  }

  @keyframes show_cards {
    0%, 30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes hide_cards {
    0%{
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  .game_place__card {
    margin: 8px;
  }

  .game__menu {
    margin-bottom: 1rem;
  }
</style>

<script>
  import Card from './components/Card.vue';
  import shuffle from 'lodash/shuffle';
  import flatten from 'lodash/flatten';

  /**
   * Картинки для карт (генерация классов css)
   * @const
   * @type {string[]}
   */
  const ALL_CARDS = Array.from({length: 25}, (value, index) => `-x${Math.floor(index / 5)} -y${index % 5}`);

  /**
   * Время, на которое будут открыты карты
   * @const
   * @type {number}
   */
  const DELAY_OPEN_CARD = 1000;

  /**
   * Время, на закрытие карт
   * @const
   * @type {number}
   */
  const DELAY_CLOSE_CARD = 500;

  export default {
    components: {
      Card
    },

    data() {
      let level = +this.$route.params.level;
      let size = +this.$route.params.size;

      return {
        countGame: 0,       // счетчик сыграных игр
        blockGame: false,   // игра заблокированна
        level,              // уровень игры
        size,               // размер поля
        needOpenCard: (level <= 2) ? 2 : 3, // кол-во карт, которое нужно открыть
        /* карты для игры
        [
          {
            id: {number},
            value: {string},
            isOpen: {boolean},
            isDone: {boolean},
            level: {number}
          }
        ]
        */
        cards: [],
        nowOpenIdCards: [], // ИД открытых карт
        countDone: 0,       // счетчик правильно открытых карт
        countActions: 0,    // счетчик открытых карт за все время
        startDate: null,    // время начала игры
        idInterval: null,   // интервал на открытие карт
      };
    },

    computed: {
      /**
       * Игра закончилась
       */
      isWin() {
        return this.cards.length === this.countDone;
      },
    },

    /**
     * @constructor
     */
    created() {
      this.generationNewGame();
    },

    methods: {
      /**
       * Генерация уровня
       */
      generationNewGame() {

        // случайные картинки на картах
        let _allCards = shuffle(ALL_CARDS);

        // создаем карты для игры
        let cards = _allCards.slice(0, Math.floor(this.size / this.needOpenCard));

        // создаем пары для карт
        cards = flatten(Array(this.needOpenCard).fill(cards));

        // перемешиваем карты
        cards = shuffle(cards);

        this.cards = cards.map((value, id) => ({
          id,
          value,
          isOpen: false,
          isDone: false,
          level: this.level
        }));

        this.startDate = Date.now();
      },

      /**
       * Клик по карте
       */
      handlerClickCard(id) {
        if (this.blockGame) {
          return;
        }

        // уже выбрано нуженое кол-во карт
        if (this.nowOpenIdCards.length === this.needOpenCard) {
          clearTimeout(this.idInterval);
          this.checkCards();
          this.closeOpenCards();
        }

        // карта isOpen или isDone
        if (this.cards[id].isOpen || this.cards[id].isDone) {
          return;
        }

        this.countActions += 1;

        // открыть карту
        this.__updateCardData(id, 'isOpen', true);
        this.nowOpenIdCards.push(id);

        // закрыть карты через время
        if (this.nowOpenIdCards.length === this.needOpenCard) {
          this.idInterval = setTimeout(() => {
            this.checkCards();
            this.closeOpenCards();
          }, DELAY_OPEN_CARD);
        }

      },

      /**
       * Проверка открытых карт
       */
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

      /**
       * Закрыте всех открытых карт
       */
      closeOpenCards() {
        this.nowOpenIdCards.forEach(id => this.__updateCardData(id, 'isOpen', false));
        this.nowOpenIdCards = [];
      },

      /**
       * Обновление вложнных объектов в @see {@link data.cards}
       * @param {number} id - ИД карты
       * @param {string} param - поле в {@link data.cards}
       * @param {number|string|boolean} value - новое значение
       * @private
       */
      __updateCardData(id, param, value) {
        this.cards[id][param] = value;
      },

      /**
       * Время - результат игры
       * @returns {string}
       */
      timeFinish() {
        let sec = Math.floor((Date.now() - this.startDate) / 1000);
        return `${Math.floor(sec / 60)} мин ${sec % 60} сек`;
      },

      /**
       * Запустить уровень заного
       */
      handlerReloadThisLevel() {
        clearInterval(this.idInterval);
        this.blockGame = true;
        this.cards = this.cards.map(val => ({...val, isDone: false, isOpen: false}));
        setTimeout(() => {
          this.countGame += 1;
          this.nowOpenIdCards = [];
          this.countDone = 0;
          this.countActions = 0;
          this.generationNewGame();
          this.blockGame = false;
        }, this.isWin ? 0 : DELAY_CLOSE_CARD);
      }
    }
  };
</script>
