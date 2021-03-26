<template>
  <div class="home">
    <h1>Office Space</h1>
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
