<template>
  <div class="book-container">
    <h1>Hello, {{ email }}</h1>
    <h2>Book your spot</h2>
    <div class="book">
      <Queue v-for="(queue, index) of queues" :key="index" :queue="queue" />
    </div>
    <h2>Not {{ email }}?</h2>
    <button @click="handleSignOut">Sign out</button>
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
  @Action(ERootAction.SetEmail) actionSetEmail: any;

  handleSignOut() {
    this.actionSetEmail("");
    this.$router.push("/");
  }

  queues: IQueue[] = [
    {
      weekday: "monday",
      attendees: ["sven@hotmail.com", "larsson@hotmail.com", "etc.hotmail.com"],
      limit: 10,
    },
    {
      weekday: "tuesday",
      attendees: [
        "tilda@hotmail.com",
        "svensson@hotmail.com",
        "hej@hotmail.com",
        "hejsan@hotamil.com",
      ],
      limit: 10,
    },
    {
      weekday: "wednesday",
      attendees: ["sven@hotmail.com", "larsson@hotmail.com", "etc.hotmail.com"],
      limit: 10,
    },
    {
      weekday: "thursday",
      attendees: ["sven@hotmail.com", "larsson@hotmail.com", "etc.hotmail.com"],
      limit: 10,
    },
    {
      weekday: "friday",
      attendees: ["sven@hotmail.com", "larsson@hotmail.com", "etc.hotmail.com"],
      limit: 10,
    },
  ];
}
</script>
<style lang="scss">
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .book {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
}
</style>
