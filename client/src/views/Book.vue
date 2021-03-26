<template>
  <div class="book-container">
    <template v-if="!loaded || loading"> Loading... </template>
    <template v-else-if="empty"> No queues </template>
    <template v-else>
      <div>
        <h1>Hello, {{ email }}!</h1>
        <h2 v-if="bookingsLeft > 0">
          Book your spot below, {{ bookingsLeft }} spots left
        </h2>
        <h2 v-else>No more spots left for you, mate</h2>
      </div>
      <div class="book">
        <Queue
          v-for="(queue, index) of queues"
          :key="index"
          :queue="queue"
          :booked="booked(queue)"
          :no-more-bookings="bookingsLeft === 0"
        />
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
  @State("bookingsLeft") bookingsLeft: number;

  @Action(ERootAction.SetEmail) actionSetEmail: any;
  @Action(ERootAction.LoadQueues) actionLoadQueues: any;

  get empty(): boolean {
    return this.loaded && !this.queues.length;
  }

  booked(queue: IQueue): boolean {
    if (!queue.attendees.length) {
      return false;
    }
    return queue.attendees.some((attendee: string) => attendee === this.email);
  }

  handleSignOut(): void {
    this.actionSetEmail("");
    this.$router.push("/home");
  }

  mounted(): void {
    this.actionLoadQueues();
  }
}
</script>
<style lang="scss">
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
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
