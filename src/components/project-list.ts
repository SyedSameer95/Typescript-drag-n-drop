import autobind from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { prjState } from "../state/project-state";
import Component from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    prjState.switchProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);

    prjState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-project-list`
    ) as HTMLUListElement;
    listElement.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} - PROJECTS`;
  }
}
