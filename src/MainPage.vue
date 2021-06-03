<template>
  <h1></h1>
  <game-board></game-board>
  <game-board></game-board>
</template>

<script>
  import GameBoard from './components/GameBoard.vue';

  export default {
    components: { GameBoard }
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
