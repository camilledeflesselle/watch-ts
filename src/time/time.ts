import { TimeZone } from "./time-zone";
import { TimeFormat } from "./time-format";

export class Time {
  private minutesAdded: number;
  private format: TimeFormat;
  private timeZone: TimeZone;

  constructor() {
    this.minutesAdded = 0;
    this.format = TimeFormat.TWENTY_FOUR_HOUR;
    this.timeZone = undefined;
  }

  increaseMinutes(minutes: number): void {
    this.minutesAdded += minutes;
  }

  getHours() {
    const currentTimeInHours = this.getCurrentTimeInZone().getHours();
    const maxHours = this.format === TimeFormat.AMPM ? 12 : 24;
    return (
      Math.floor((this.minutesAdded + currentTimeInHours * 60) / 60) % maxHours
    );
  }

  getMinutes() {
    const currentTimeInMinutes = this.getCurrentTimeInZone().getMinutes();
    return Math.floor((this.minutesAdded + currentTimeInMinutes) % 60);
  }

  getSeconds() {
    return this.getCurrentTimeInZone().getSeconds();
  }

  getCurrentTimeInZone() {
    const currentTime = new Date();
    if (this.timeZone !== null) {
      const stringTime = currentTime.toLocaleTimeString("en-US", {
        timeZone: this.timeZone,
        hour12: this.format === TimeFormat.AMPM,
      });
      currentTime.setHours(parseInt(stringTime.split(":")[0]));
      currentTime.setMinutes(parseInt(stringTime.split(":")[1]));
      currentTime.setSeconds(parseInt(stringTime.split(":")[2]));
    }
    return currentTime;
  }

  reset() {
    this.minutesAdded = 0;
  }

  getFormat() {
    return this.format;
  }

  switchFormat() {
    this.format =
      this.format === TimeFormat.AMPM
        ? TimeFormat.TWENTY_FOUR_HOUR
        : TimeFormat.AMPM;
  }

  getTimeZone() {
    return this.timeZone;
  }

  setTimeZone(timeZone: TimeZone) {
    this.timeZone = timeZone;
  }
}
