<template>
  <div class="queue-container">
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
    <div class="divider">-</div>
    <ul class="spots">
      <li v-for="(waiting, index) in waitingList" :key="`w-${index}`">
        {{ waiting }}
      </li>
    </ul>
    <button
      class="secondary small"
      @click="handleBook(queue.weekday)"
      :disabled="openSpots === 0"
    >
      {{ openSpots ? "Book" : "Wait" }}
    </button>
  </div>
</template>
<script lang="ts">
import { ERootAction } from "@/store/root.constants";
import { IQueue } from "@/types/queue";
import { EWeekday } from "@/types/weekday";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Queue extends Vue {
  @Prop() queue: IQueue;

  @Action(ERootAction.TakePlace) actionTakePlace: any;

  get attendees(): string[] {
    console.log(this.queue);
    return this.queue?.attendees || [];
  }

  get acceptedAttendees(): string[] {
    return this.attendees.slice(0, this.queue.limit);
  }

  get openSpots(): number {
    return this.queue.limit - this.attendees.length;
  }

  get waitingList(): string[] {
    if (this.attendees.length <= this.queue.limit) {
      return [];
    }
    return this.attendees.slice(this.queue.limit);
  }

  handleBook(weekday: EWeekday): void {
    this.actionTakePlace(weekday);
  }
}
</script>
<style lang="scss" scoped>
.queue-container {
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
  .divider {
    font-weight: bolder;
  }
}
</style>
