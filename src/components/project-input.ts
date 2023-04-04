import autobind from "../decorators/autobind";
import { prjState } from "../state/project-state";
import { Validate, validate } from "../util/validation";
import Component from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLDivElement> {
  titleElement: HTMLInputElement;
  descElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, ppl] = userInput;
      prjState.addProject(title, desc, ppl);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleElement.value = "";
    this.descElement.value = "";
    this.peopleElement.value = "";
  }

  private getUserInput(): [string, string, number] | void {
    const title = this.titleElement.value;
    const desc = this.descElement.value;
    const people = this.peopleElement.value;

    const validatableTitle: Validate = {
      value: title,
      required: true,
      minLength: 1,
      maxLength: 10,
    };
    const validatableDesc: Validate = {
      value: desc,
      required: true,
      minLength: 1,
      maxLength: 10,
    };

    const validatablePeople: Validate = {
      value: people,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(validatableTitle) ||
      !validate(validatableDesc) ||
      !validate(validatablePeople)
    ) {
      alert("Invalid input");
      return;
    } else {
      return [
        this.titleElement.value,
        this.descElement.value,
        +this.peopleElement.value,
      ];
    }
  }
}
