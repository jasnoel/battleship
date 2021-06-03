<template>
  <h1></h1>
  <div v-if="gameStarted">
    <game-board :human="true" :player="playerA" :enemy="playerB"></game-board>
    <game-board :player="playerB" :enemy="playerA" @end="endGame"></game-board>
  </div>
  <enter-username v-else @confirmUsername="startGame"></enter-username>
  <teleport to="body" v-if="scoreDisplay">
    <score-popup :result="result"></score-popup>
  </teleport>
</template>

<script>
  import GameBoard from './components/GameBoard.vue';
  import EnterUsername from "./components/EnterUsername.vue";
  import ScorePopup from "./components/ScorePopup.vue";

  import Player from './factory/player.js';

  export default {
    components: { GameBoard, EnterUsername, ScorePopup },
    data() {
      return {
        gameStarted: false,
        username: '',
        result: '',
        playerA: Player(),
        playerB: Player(),
        scoreDisplay: false,
      }
    },
    methods: {
      startGame(username) {
        this.username = username;
        this.gameStarted = true;
      },
      endGame(result) {
        this.result = result;
        this.scoreDisplay = true;
        this.playerA = Player();
        this.playerB = Player();
      }
    }
  }
</script>

<style scoped>
h1 {
  display: block;
  margin: auto;
  width: 400px;
  height: 150px;
  margin-top: -40px;
  background-image: url("../public/battleshiptitle.png");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
