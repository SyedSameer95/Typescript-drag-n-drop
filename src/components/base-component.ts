export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAfterBegin: boolean,
    elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (elementId) {
      this.element.id = elementId;
    }

    this.render(insertAfterBegin);
  }

  private render(insertAfterBegin: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAfterBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
