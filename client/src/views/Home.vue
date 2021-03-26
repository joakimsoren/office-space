<template>
  <div class="home">
    <div class="jumbo">Office Space</div>
    <div class="input-email-container">
      <label for="input-email">Enter your email</label>
      <br />
      <input id="input-email" v-model="email" />
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
@import url("https://fonts.googleapis.com/css2?family=Ranchers&family=Zilla+Slab:wght@300&display=swap");
.home {
  height: 100%;
  .jumbo {
    width: 100%;
    font-size: 20px;
    color: white;
    background-color: blue;
    height: 30%;
    font-family: "Ranchers", cursive;
    font-family: "Zilla Slab", serif;
  }
}
</style>
