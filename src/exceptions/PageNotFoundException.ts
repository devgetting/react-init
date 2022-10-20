class PageNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PageNotFoundException";
  }
}

export default PageNotFoundException;
