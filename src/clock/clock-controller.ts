import { Clock } from "./clock";
import { ClockView } from "./clock-view";

export class ClockController {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  linkClockToView(clock: Clock, view: ClockView): void {
    this.updateClockDisplay(clock, view);
    view.render(this.container);
    setInterval(() => {
      this.updateClockDisplay(clock, view);
    }, 1000);
    this.addIncreaseTimeListener(clock, view);
    this.addSwitchModeListener(clock, view);
    this.addDeactivateIncreaseButtonListener(clock, view);
    this.addResetTimeListener(clock, view);
    this.addAmPmSwitchListener(clock, view);
  }

  private updateClockDisplay(clock: Clock, view: ClockView): void {
    const time = clock.getCurrentTime();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    const seconds = time.getSeconds();
    view.updateClockDisplay(hours, minutes, seconds);
  }

  private addDeactivateIncreaseButtonListener(
    clock: Clock,
    view: ClockView
  ): void {
    view.addModeButtonListener(() => {
      !clock.isEditable()
        ? view.deactivateIncreaseButton()
        : view.activateIncreaseButton();
    });
  }

  private addSwitchModeListener(clock: Clock, view: ClockView): void {
    view.addModeButtonListener(() => {
      clock.switchEditableState();
      this.updateClockDisplay(clock, view);
    });
  }

  private addIncreaseTimeListener(clock: Clock, view: ClockView): void {
    view.addIncreaseButtonListener(() => {
      clock.isEditable() ? clock.increase() : null;
      this.updateClockDisplay(clock, view);
    });
  }

  private addResetTimeListener(clock: Clock, view: ClockView): void {
    view.addResetButtonListener(() => {
      clock.reset();
      this.updateClockDisplay(clock, view);
    });
  }

  private addAmPmSwitchListener(clock: Clock, view: ClockView): void {
    view.addSwitchAmPmButtonListener(() => {
      clock.switchAmPm();
      this.updateClockDisplay(clock, view);
    });
  }
}
