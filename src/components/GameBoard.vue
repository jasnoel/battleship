<template>
    <div class="gameboard">
      <div v-for="row in 8" :key="row" class="row">
        <div v-for="col in 8" :key="col" :class="'case ' + col + row"
          @mouseenter="hoverCase"
          @mouseleave="leaveCase"
          @click="attackCase($event, col, row)"
        >
          {{ col }} {{ row }}
        </div>
      </div>
    </div>
</template>

<script>
  //import Player from '../factory/player.js';
  export default {
    props: ['human', 'player', 'enemy'],
    emits: ['end'],
    data() {
      return {
      }
    },
    computed: {
    },
    created() {
      this.player.getGameBoard().placeShip(0, 0, 2, true);
    },
    methods: {
      hoverCase(event) {
        let bg = event.target.style;
        if (bg.backgroundColor != 'red' && bg.backgroundColor != 'blue') {
          bg.backgroundColor = '#fff';
        }
      },
      leaveCase(event) {
        let bg = event.target.style;
        if (bg.backgroundColor != 'red' && bg.backgroundColor != 'blue') {
          bg.backgroundColor = 'rgba(255, 255, 255, 0.19)';
        }
      },
      attackCase(event, col, row) {
        if (this.human) {
          return 'borbidden to attack your own ships';
        }
        const result = this.player.attack(col - 1, row - 1, this.enemy.getGameBoard());
        if (result || event.target.style.backgroundColor == 'red') {
          event.target.style.backgroundColor = 'red';
          this.checkWin();
        } else {
          event.target.style.backgroundColor = 'blue';
        }
        this.enemyAttack();
      },
      enemyAttack() {
        const result = this.enemy.randomAttack(this.player.getGameBoard());
        if (result.col == -1) {
          return 'map entirely shot';
        }
        let shot = document.getElementsByClassName('case ' + (result.col + 1) + (result.row + 1))[0];
        if (result.result == true) {
          shot.style.backgroundColor = 'red';
          this.checkWin();
        } else {
          shot.style.backgroundColor = 'blue';
        }
      },
      checkWin() {
        if (this.player.getGameBoard().areSunk()) {
          this.$emit('end', 'lost');
        }
        if (this.enemy.getGameBoard().areSunk()) {
          this.$emit('end', 'won');
        }
      }
    }
  }
</script>

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
