export class BaseError extends Error {
  constructor(name: string, msg?: any) {
    super(msg || name);
    this.name = name;
  }
}

