Object.defineProperty(
  Array.prototype,
  'sum',
  {
    value: function sum(): number {
      return this.reduce((a: number, b: number) => a + b, 0);
    }
  }
);

declare global {
  interface Array<T> {
    sum(): number;
  }
}

export {};
