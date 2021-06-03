<template>
  <div class="result">
    <div class="result-content">
      <h1>You {{ result }}</h1>
      <button @click="restart">Restart</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['result'],
    methods: {
      restart() {
        location.reload();
      }
    }
  }
</script>

<style scoped>
.result {
  position: absolute;
  top: 0;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 80vh;
}
.result-content {
  padding: 15px;
  margin: auto;
  margin-top: 300px;
  width: 400px;
  border: 3px solid #000;
  border-radius: 7px;
  background-color: rgba(214, 49, 0, 0.65);
}
button {
  background-color: rgba(255, 255, 255, 0.54);
  border: 2px solid black;
  padding: 10px;
  margin: 10px;
}
button:hover {
  background-color: white;
}
</style>
