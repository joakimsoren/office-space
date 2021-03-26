<template>
  <div class="queue">
    <h2>
      {{ queue.weekday }}
    </h2>
    <ul class="spots">
      <li
        v-for="(attendee, index) of attendees"
        :key="`a-${index}`"
        class="occupied-spots"
      >
        {{ attendee }}
      </li>
      <li
        v-for="index in openSpots"
        :key="`o-${index}`"
        class="open-spots"
      ></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { IQueue } from "@/types/queue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Queue extends Vue {
  @Prop() queue: IQueue;

  get attendees(): string[] {
    console.log(this.queue);
    return this.queue?.attendees || [];
  }

  get openSpots(): number {
    return this.queue.limit - this.attendees.length;
  }
}
</script>
<style lang="scss" scoped>
.queue {
  display: flex;
  flex-direction: column;
  .spots {
    .occupied-spots {
      background-color: red;
    }
    .open-spots {
      background-color: green;
      height: 20px;
      width: 20px;
    }
  }
}
</style>
