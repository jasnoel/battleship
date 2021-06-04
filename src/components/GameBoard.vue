<template>
    <button v-if="placingShips" @click="vertical = !vertical">Rotate</button>
      <div class="gameboard">
        <div v-for="row in 8" :key="row" class="row">
          <div v-for="col in 8" :key="col" :class="'case ' + col + row"
            @mouseenter="hoverCase"
            @mouseleave="leaveCase"
            @click="actionOnClick($event, col, row)"
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
    emits: ['end', 'start'],
    data() {
      return {
        placingShips: false,
        shipsToPlace: [4, 3, 3, 2],
        vertical: true,
      }
    },
    computed: {

    },
    created() {
      if (this.human) {
        this.placingShips = true;
        //place computer's boats
        this.player.getGameBoard().placeShip(0, 0, 2, true);
      }
    },
    methods: {
      actionOnClick(event, col, row) {
        if (this.placingShips) {
          this.placeShip(event, col, row);
        } else {
          this.attackCase(event, col, row);
        }
      },
      //Gameplay
      placeShip(event, col, row) {
        if (this.colorCase(event, 'rgba(5, 255, 0, 0.59)')) {
          this.enemy.getGameBoard().placeShip(parseInt(col) - 1, parseInt(row) - 1, this.shipsToPlace[0], !this.vertical);
          this.shipsToPlace.splice(0, 1);
          if (this.shipsToPlace.length <= 0) {
            this.placingShips = false;
            this.$emit('start');
          }
        }
      },
      attackCase(event, col, row) {
        if (this.human) {
          return 'borbidden to attack your own ships';
        }
        const result = this.player.attack(col - 1, row - 1, this.enemy.getGameBoard());
        if (result || event.target.style.backgroundColor == 'rgba(198, 2, 2, 0.69)') {
          event.target.style.backgroundColor = 'rgba(198, 2, 2, 0.69)';
          this.checkWin();
        } else {
          event.target.style.backgroundColor = 'rgba(0, 169, 255, 0.54)';
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
          shot.style.backgroundColor = 'rgba(198, 2, 2, 0.69)';
          this.checkWin();
        } else {
          shot.style.backgroundColor = 'rgba(0, 169, 255, 0.54)';
        }
      },
      checkWin() {
        if (this.player.getGameBoard().areSunk()) {
          this.$emit('end', 'lost');
        }
        if (this.enemy.getGameBoard().areSunk()) {
          this.$emit('end', 'won');
        }
      },
      //interface
      hoverCase(event) {
        this.colorCase(event, 'rgba(255, 255, 255, 0.6)');
      },
      leaveCase(event) {
        this.colorCase(event, 'rgba(255, 255, 255, 0.19)');
      },
      colorCase(event, color) {
        //when you hover during your ship placement phase
        if (this.placingShips && this.noShipPlaced(event)) {
          const splitCaseId = event.target.className.split(' ')[1].split('');
          let row = splitCaseId[0];
          let col = splitCaseId[1];
          if (this.vertical) {
            if (8 - row >= this.shipsToPlace[0] - 1 ) {
              for (let i = 0; i < this.shipsToPlace[0]; i++) {
                const t = document.getElementsByClassName('case ' + (parseInt(row) + i) + col)[0];
                t.style.backgroundColor = color;
              }
              return true;
            } else {return false}
          } else {
            if (8 - col >= this.shipsToPlace[0] - 1 ) {
              for (let i = 0; i < this.shipsToPlace[0]; i++) {
                const t = document.getElementsByClassName('case ' + row + (parseInt(col) + i))[0];
                t.style.backgroundColor = color;
              }
              return true;
            }
            else {return false}
          }
        } else {
          //when you hover enemy grid
          let tile = event.target.style;
          if (tile.backgroundColor != 'rgba(198, 2, 2, 0.69)' &&
              tile.backgroundColor != 'rgba(0, 169, 255, 0.54)' &&
              tile.backgroundColor != 'rgba(5, 255, 0, 0.59)' )
          {
            tile.backgroundColor = color;
          }
        }
      },
      noShipPlaced(event) {
        //check if there will be colision between ships
        let tile = event.target;
        const splitCaseId = tile.className.split(' ')[1].split('');
        let row = splitCaseId[0];
        let col = splitCaseId[1];
        if (this.vertical) {
          if (8 - row >= this.shipsToPlace[0] - 1 ) {
            for (let i = 0; i < this.shipsToPlace[0]; i++) {
              const t = document.getElementsByClassName('case ' + (parseInt(row) + i) + col)[0];
              if (t.style.backgroundColor == 'rgba(5, 255, 0, 0.59)') {
                return false;
              }
            }
          }
        } else {
          if (8 - col >= this.shipsToPlace[0] - 1 ) {
            for (let i = 0; i < this.shipsToPlace[0]; i++) {
              const t = document.getElementsByClassName('case ' + row + (parseInt(col) + i))[0];
              if (t.style.backgroundColor == 'rgba(5, 255, 0, 0.59)') {
                return false;
              }
            }
          }
        }
        return true;
      }
    }
  }
</script>

<style scoped>
button {
  display: block;
  margin: auto;
  margin-top: 25px;
  margin-bottom: -25px;
  padding: 15px;
  font-size: 1em;
  background-color: rgba(255, 92, 0, 0.75);
  border: 2px solid black;
  border-radius: 3px;
}
button:hover {
  border-color: white;
  color: white;
}
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
