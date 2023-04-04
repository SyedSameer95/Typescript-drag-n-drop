import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private static instance: ProjectState;
  private projects: Project[] = [];

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, desc: string, ppl: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      ppl,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  switchProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const prjState = ProjectState.getInstance();
