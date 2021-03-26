<template>
  <div class="queue">
    <div class="weekday">
      {{ queue.weekday }}
    </div>
    <ul class="spots">
      <li
        v-for="(attendee, index) of attendees"
        :key="`a-${index}`"
        class="occupied-spots"
      >
        {{ attendee }}
      </li>
      <li v-for="index in openSpots" :key="`o-${index}`" class="open-spots">
        Available
      </li>
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
@import url("https://fonts.googleapis.com/css2?family=Ranchers&family=Zilla+Slab:wght@300&display=swap");

.queue {
  display: flex;
  flex-direction: column;
  margin: 5px;
  border: solid 2px darken(#2e503c, 10%);
  border-radius: 4px 4px 2px 2px;
  .weekday {
    padding: 5px 10px;
    background-color: #2e503c;
    font-family: "Ranchers", cursive;
    color: white;
    font-size: 30px;
    border-bottom: solid 2px darken(#2e503c, 10%);
  }
  .spots {
    padding: 0;
    margin: 0;
    overflow: hidden;
    li {
      width: 100%;
      text-decoration: none;
      list-style: none;
      padding: 5px 2px;
      font-weight: 600;
      &:not(:last-child) {
        border-bottom: solid 2px darken(#2e503c, 10%);
      }
    }
    .occupied-spots {
      color: red;
    }
    .open-spots {
      height: 20px;
    }
  }
}
</style>
