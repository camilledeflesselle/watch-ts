import { Clock } from "../clock/clock";
import { ClockView } from "../clock/clock-view";
import { ClockController } from "../clock/clock-controller";
import { TimeZone } from "../time/time-zone";

export class App {
  private clockController: ClockController;
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.clockController = new ClockController(this.container);
  }

  start(): void {
    this.container.id = "clock-container";
    document.getElementById("app").appendChild(this.container);
    this.clockController.linkClockToView(new Clock(), new ClockView());
    this.addDropDownToSelectTimezone();
    this.addButtonToCreateClock();
  }

  private addButtonToCreateClock(): void {
    const button = document.createElement("button");
    button.innerText = "Add Clock";
    button.addEventListener("click", () => {
      this.addingClock();
    });
    document.getElementById("app").appendChild(button);
  }

  private addDropDownToSelectTimezone(): void {
    const select = document.createElement("select");
    select.id = "timezone";
    for (let timezone in TimeZone) {
      const option = document.createElement("option");
      option.value = timezone;
      option.innerText = timezone;
      select.appendChild(option);
    }
    document.getElementById("app").appendChild(select);
  }

  private selectedTimezone(): string {
    const select = document.getElementById("timezone") as HTMLSelectElement;
    return select.value;
  }

  private addingClock(): void {
    const clock = new Clock();
    const stringRequired = this.selectedTimezone() as keyof typeof TimeZone;
    const timeZoneEnum = TimeZone[stringRequired];
    clock.setTimezone(timeZoneEnum);
    this.clockController.linkClockToView(clock, new ClockView());
  }
}
