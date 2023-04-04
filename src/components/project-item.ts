import autobind from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import Component from "./base-component";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 Person";
    } else {
      return `${this.project.people} Persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.dropEffect = "move";
  }

  dragEndHandler(_: DragEvent): void {
    console.log("Drag End");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
