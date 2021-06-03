<template>
    <div class="gameboard">
      <div v-for="row in 8" :key="row" class="row">
        <div v-for="col in 8" :key="col" class="case">
          {{ col }} {{ row }}
        </div>
      </div>
    </div>
</template>

<style scoped>
.gameboard {
  display: inline-block;
  margin: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border: 4px solid black;
  width: 408px;
  height: 408px;
}
.case {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.19);
  border: 1px solid rgba(0, 0, 0, 1);
  width: 50px;
  height: 50px;
}
.row {
  width: 400px;
  height: 50px;
}
</style>
