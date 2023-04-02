export class ClockView {
  private time: HTMLElement;
  private clockDisplay: HTMLElement;
  private modeButton: HTMLButtonElement;
  private increaseButton: HTMLButtonElement;
  private lightButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private switchAmPmButton: HTMLElement;

  constructor() {
    // create elements
    this.clockDisplay = document.createElement("div");
    this.clockDisplay.classList.add("clock");

    this.time = document.createElement("div");
    this.time.classList.add("time");

    const buttonList = document.createElement("div");
    buttonList.classList.add("button-list");

    this.modeButton = document.createElement("button");
    this.modeButton.innerText = "Mode";
    this.modeButton.classList.add("mode-button");

    this.increaseButton = document.createElement("button");
    this.increaseButton.innerText = "Increase";
    this.increaseButton.classList.add("increase-button");
    this.deactivateIncreaseButton();

    this.lightButton = document.createElement("button");
    this.lightButton.innerText = "Light";
    this.lightButton.classList.add("light-button");

    this.resetButton = document.createElement("button");
    this.resetButton.innerText = "Reset";
    this.resetButton.classList.add("reset-button");

    this.switchAmPmButton = document.createElement("button");
    this.switchAmPmButton.innerText = "AM/PM";
    this.switchAmPmButton.classList.add("switch-am-pm-button");

    // populate elements
    this.clockDisplay.appendChild(this.time);

    buttonList.appendChild(this.modeButton);
    buttonList.appendChild(this.increaseButton);
    buttonList.appendChild(this.lightButton);
    buttonList.appendChild(this.resetButton);
    buttonList.appendChild(this.switchAmPmButton);
    this.clockDisplay.appendChild(buttonList);

    this.lightButton.addEventListener("click", () => {
      this.toggleLight();
    });

    this.switchAmPmButton.addEventListener("click", () => {
      this.switchAmPmButton.innerText =
        this.switchAmPmButton.innerText === "AM/PM" ? "24H" : "AM/PM";
    });
  }

  render(container: HTMLElement): void {
    container.appendChild(this.clockDisplay);
  }

  updateClockDisplay(hours: number, minutes: number, seconds: number): void {
    let displayText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    this.time.innerText = displayText;
  }

  addModeButtonListener(listener: () => void): void {
    this.modeButton.addEventListener("click", listener);
  }

  addIncreaseButtonListener(listener: () => void): void {
    this.increaseButton.addEventListener("click", listener);
  }

  toggleLight(): void {
    this.clockDisplay.classList.toggle("light-mode");
  }

  activateIncreaseButton() {
    this.increaseButton.classList.remove("disabled");
  }

  deactivateIncreaseButton() {
    this.increaseButton.classList.add("disabled");
  }

  addResetButtonListener(listener: () => void): void {
    this.resetButton.addEventListener("click", listener);
  }

  addSwitchAmPmButtonListener(listener: () => void): void {
    this.switchAmPmButton.addEventListener("click", listener);
  }
}
