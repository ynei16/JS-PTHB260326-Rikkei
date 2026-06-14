function identity<T>(arg: T): T {
  return arg;
}

interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "Hello" };
const numberBox: Box<number> = { content: 123 };

console.log(identity("Test"));
console.log(identity(456));
