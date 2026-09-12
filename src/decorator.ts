interface Beverage {
  getDescription(): string;
  getCost(): number;
}

class Coffee implements Beverage {
  getDescription(): string {
    return "Coffee";
  }

  getCost(): number {
    return 3;
  }
}

abstract class BeverageDecorator implements Beverage {
  constructor(protected readonly beverage: Beverage) {}

  getDescription(): string {
    return this.beverage.getDescription();
  }

  getCost(): number {
    return this.beverage.getCost();
  }
}

class Milk extends BeverageDecorator {
  getDescription(): string {
    return `${super.getDescription()}, milk`;
  }

  getCost(): number {
    return super.getCost() + 0.5;
  }
}

class Caramel extends BeverageDecorator {
  getDescription(): string {
    return `${super.getDescription()}, caramel`;
  }

  getCost(): number {
    return super.getCost() + 0.75;
  }
}

function runDecoratorDemo(): void {
  const coffee = new Coffee();
  const coffeeWithMilk = new Milk(coffee);
  const caramelLatte = new Caramel(coffeeWithMilk);
  const beverages: Beverage[] = [coffee, coffeeWithMilk, caramelLatte];

  for (const beverage of beverages) {
    console.log(
      `${beverage.getDescription()}: $${beverage.getCost().toFixed(2)}`
    );
  }
}

runDecoratorDemo();
