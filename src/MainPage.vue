<template>
  <h1></h1>
  <div v-if="gameStarted">
    <game-board :human="true" :player="playerA" :enemy="playerB"></game-board>
    <game-board :player="playerB" :enemy="playerA"></game-board>
  </div>
  <enter-username v-else @confirmUsername="startGame"></enter-username>
</template>

<script>
  import GameBoard from './components/GameBoard.vue';
  import EnterUsername from "./components/EnterUsername.vue";
  import Player from './factory/player.js';

  export default {
    components: { GameBoard, EnterUsername },
    data() {
      return {
        gameStarted: true,
        username: '',
        playerA: Player(),
        playerB: Player(),
      }
    },
    methods: {
      startGame(username) {
        this.username = username;
        this.gameStarted = true;
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
