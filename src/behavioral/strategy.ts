interface ShippingStrategy {
  calculateCost(weightKg: number): number;
}

class StandardShipping implements ShippingStrategy {
  calculateCost(weightKg: number): number {
    return 5 + weightKg * 2;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculateCost(weightKg: number): number {
    return 15 + weightKg * 5;
  }
}

class StorePickup implements ShippingStrategy {
  calculateCost(_weightKg: number): number {
    return 0;
  }
}

type ShippingQuote = {
  weightKg: number;
  cost: number;
};

class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  getQuote(weightKg: number): ShippingQuote {
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      throw new Error("Package weight must be a positive, finite number.");
    }

    return {
      weightKg,
      cost: this.strategy.calculateCost(weightKg)
    };
  }
}

function runStrategyDemo(): void {
  const calculator = new ShippingCalculator(new StandardShipping());
  const weightKg = 3;

  console.log("Standard shipping:", calculator.getQuote(weightKg));

  calculator.setStrategy(new ExpressShipping());

  console.log("Express shipping:", calculator.getQuote(weightKg));

  calculator.setStrategy(new StorePickup());

  console.log("Store pickup:", calculator.getQuote(weightKg));
}

runStrategyDemo();
