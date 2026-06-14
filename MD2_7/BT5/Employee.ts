class Employee {
  public name: string;
  private salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public printInfo() {
    console.log(`Name: ${this.name}, Salary: ${this.salary}`);
  }
}

const emp = new Employee("Nguyen Van A", 1000);
emp.printInfo();
// console.log(emp.salary);
