<template>
  <div class="book-container">
    <template v-if="!loaded || loading"> Loading... </template>
    <template v-else-if="empty"> No queues </template>
    <template v-else>
      <h1>Hello, {{ email }}!</h1>
      <h2>Book your spot below</h2>
      <div class="book">
        <Queue v-for="(queue, index) of queues" :key="index" :queue="queue" />
      </div>
      <div class="logout">
        <h2>Not {{ email }}?</h2>
        <button @click="handleSignOut">Sign out</button>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { IQueue } from "@/types/queue";
import { Component, Vue } from "vue-property-decorator";
import Queue from "@/components/Queue.vue";
import { Action, State } from "vuex-class";
import { ERootAction } from "@/store/root.constants";

@Component({
  components: { Queue },
})
export default class Book extends Vue {
  @State("email") email: string;
  @State("queues") queues: IQueue[];
  @State("loading") loading: boolean;
  @State("loaded") loaded: boolean;

  @Action(ERootAction.SetEmail) actionSetEmail: any;
  @Action(ERootAction.LoadQueues) actionLoadQueues: any;

  get empty() {
    return this.loaded && !this.queues.length;
  }

  handleSignOut() {
    this.actionSetEmail("");
    this.$router.push("/home");
  }

  mounted() {
    this.actionLoadQueues();
  }
}
</script>
<style lang="scss">
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .book {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: 1;
  }
}
button {
  width: auto;
}
</style>
