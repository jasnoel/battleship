<template>
  <h1></h1>
  <div>
    <game-board
      v-if="placingShips"
      :human="true"
      :player="playerA"
      :enemy="playerB"
      @start="gameStarted = true"
    ></game-board>
    <game-board
      v-if="gameStarted"
      :player="playerB"
      :enemy="playerA"
      @end="endGame"
    ></game-board>
  </div>
  <div>
  </div>
  <enter-username v-if="pickingUsername" @confirmUsername="startGame"></enter-username>
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
        pickingUsername: true,
        placingShips: false,
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
        this.pickingUsername = false;
        this.placingShips = true;
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
