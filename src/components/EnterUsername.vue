<template>
  <div class="username">
    <form @submit.prevent="confirmUsername">
      <label id="username">Enter Username</label>
      <input id="username" placeholder="Username" v-model="username"/>
      <p class="errorMessage" v-if="errorMessage != '' ">{{ errorMessage }}</p>
      <button>Confirm</button>
    </form>
  </div>
</template>

<script>
  export default {
    emits: [ 'confirmUsername' ],
    data() {
      return {
        username: '',
        errorMessage: '',
      };
    },
    methods: {
      confirmUsername() {
        if (this.username == '') {
          this.errorMessage = "Enter a username to start the game";
        } else {
          this.$emit('confirmUsername', this.username);
        }
      },
    }
  }
</script>

<style scoped>
  .errorMessage {
    background-color: rgba(184, 45, 45, 0.72);
    border-radius: 5px;
    color: white;
    padding: 5px;
    margin-top: 5px;
    font-size: 0.5em;
  }
  .username {
    margin-top: 100px;
    display: inline-block;
    text-align: center;
    width: 200px;
    padding: 20px;
    border: 3px solid black;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.27);
  }
  form {
    margin: auto;
    text-align: center;
    color: white;
    font-size: 2em;
  }
  ::placeholder {
    color: rgb(204, 204, 204);
  }
  button {
    width: 75px;
    height: 35px;
    margin-top: 15px;
    font-size: 0.5em;
    border: none;
    background-color: rgba(232, 116, 8, 0.8);
  }
  button:hover {
    border: 2px solid white;
    color: white;
  }
  input {
    text-align: center;
    font-size: 0.6em;
    background-color: rgba(0, 0, 0, 0.27);
    border: 1px solid white;
    color: white;
    width: 150px;
  }
</style>
