import { TimeZone } from "../time/time-zone";
import { Time } from "../time/time";

enum EditableState {
  NOT_EDITABLE = 0,
  CAN_INCREASE_HOURS = 1,
  CAN_INCREASE_MINUTES = 2,
}

export class Clock {
  private currentTime: Time;
  private editableState: EditableState;

  constructor() {
    this.editableState = EditableState.NOT_EDITABLE;
    this.currentTime = new Time();
  }

  getCurrentTime(): Time {
    return this.currentTime;
  }

  setCurrentTime(newTime: Time): void {
    this.currentTime = newTime;
  }

  isEditable(): boolean {
    return this.editableState !== EditableState.NOT_EDITABLE;
  }

  switchEditableState(): void {
    switch (this.editableState) {
      case EditableState.NOT_EDITABLE:
        this.editableState = EditableState.CAN_INCREASE_HOURS;
        break;
      case EditableState.CAN_INCREASE_HOURS:
        this.editableState = EditableState.CAN_INCREASE_MINUTES;
        break;
      default:
        this.editableState = EditableState.NOT_EDITABLE;
        break;
    }
  }

  increase(): void {
    switch (this.editableState) {
      case EditableState.CAN_INCREASE_HOURS:
        this.currentTime.increaseMinutes(60);
        break;
      case EditableState.CAN_INCREASE_MINUTES:
        this.currentTime.increaseMinutes(1);
        break;
      default:
        break;
    }
  }

  setTimezone(timeZone: TimeZone): void {
    this.currentTime.setTimeZone(timeZone);
  }

  reset() {
    this.currentTime.reset();
  }

  switchAmPm() {
    this.currentTime.switchFormat();
  }
}
