<template>
  <div class="queue-container">
    <div class="queue">
      <div class="weekday">
        {{ queue.weekday }}
        <span
          class="wait-count"
          v-if="!!waitingList.length"
          @click="showWaiting = !showWaiting"
        >
          (+{{ waitingList.length }})
        </span>
      </div>
      <ul class="spots">
        <li
          v-for="(attendee, index) of acceptedAttendees"
          :key="`a-${index}`"
          :class="['occupied-spots', { waiting: canShowWaiting }]"
        >
          {{ attendee }}
        </li>
        <template v-if="openSpots > 0">
          <li v-for="index in openSpots" :key="`o-${index}`" class="open-slots">
            Available
          </li>
        </template>
      </ul>
    </div>
    <div class="divider">-</div>
    <button
      v-if="booked"
      class="secondary small"
      @click="handleRemove(queue.weekday)"
    >
      Remove
    </button>
    <button v-else-if="noMoreBookings" class="secondary small" disabled>
      Can't book
    </button>
    <button class="secondary small" v-else @click="handleBook(queue.weekday)">
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
  @Prop() booked: boolean;
  @Prop() noMoreBookings: boolean;

  showWaiting = false;

  @Action(ERootAction.TakePlace) actionTakePlace: any;
  @Action(ERootAction.RemovePlace) actionRemovePlace: any;

  get canShowWaiting(): boolean {
    return this.showWaiting && !!this.waitingList.length;
  }

  get attendees(): string[] {
    return this.queue?.attendees || [];
  }

  get acceptedAttendees(): string[] {
    if (this.canShowWaiting) {
      return this.waitingList;
    }
    const accepted: string[] = [...this.attendees];
    return accepted.slice(0, this.queue.limit);
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

  handleRemove(weekday: EWeekday): void {
    this.actionRemovePlace(weekday);
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
      position: relative;
      .wait-count {
        cursor: pointer;
        font-size: 15px;
        position: absolute;
        right: 5px;
      }
    }
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
      &.waiting {
        color: orange;
      }
    }
  }
  .divider {
    font-weight: bolder;
  }
}
</style>
