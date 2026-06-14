class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  makeSound() {
    console.log("Gau Gau");
  }
}
