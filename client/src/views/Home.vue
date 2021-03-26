<template>
  <div class="home">
    <div class="jumbo-container">
      <div class="jumbo">Office Space</div>
    </div>
    <div class="input-email-container">
      <br />
      <input id="input-email" v-model="email" placeholder="Gief email plz..." />
      <br />
      <button :disabled="disabled" @click="handleProceed(email)">
        Proceed {{ emailSaved }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ERootAction } from "@/store/root.constants";
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Home extends Vue {
  @Action(ERootAction.SetEmail) actionSetEmail: any;
  @State("email") emailSaved: string;

  email = "";

  get disabled(): boolean {
    return this.email.length < 4;
  }

  handleProceed(email: string): void {
    this.actionSetEmail(email);
    this.$router.push("/book");
  }

  mounted() {
    if (this.emailSaved) {
      this.$router.push("/book");
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  max-width: 1000px;
  margin: auto;
  .jumbo-container {
    padding: 5px;
    .jumbo {
      font-size: 20px;
      color: white;
      background-color: #2e503c;
      height: 30%;
      font-family: "Ranchers", cursive;
      font-size: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-shadow: 10px 10px #000000;
      border-radius: 6px;
      box-shadow: 0px 5px 10px 0px #727272;
      border: solid 5px black;
      padding: 40px 0;
    }
  }
  .input-email-container {
    margin-top: 10%;
    #input-email {
      margin: 20px;
      margin-top: 5%;
      width: 50%;
      border: solid 2px #2e503c;
      border-radius: 2px;
      font-size: 20px;
      font-family: "Ranchers", cursive;

      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 2px;
      background-color: #2e503c;
      font-family: "Zilla Slab", serif;
      color: white;
      font-weight: bold;
      font-size: 30px;
      &:hover:enabled {
        background-color: lighten(#2e503c, 10%);
      }
      &:active:enabled {
        background-color: darken(#2e503c, 5%);
      }
      &:disabled {
        opacity: 0.7;
        cursor: default;
      }
    }
  }
}
</style>
