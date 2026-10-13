type LogLevel = "info" | "warn" | "error";

type LogEntry = {
  level: LogLevel;
  message: string;
};

class Logger {
  private static instance: Logger | undefined;
  private readonly entries: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log(level: LogLevel, message: string): void {
    if (message.trim() === "") {
      throw new Error("Log message must not be empty.");
    }

    this.entries.push({ level, message });
  }

  getEntries(): readonly LogEntry[] {
    return this.entries;
  }
}

class OrderService {
  placeOrder(orderId: string): void {
    Logger.getInstance().log("info", `Order ${orderId} placed.`);
  }
}

class PaymentService {
  charge(orderId: string, amount: number): void {
    const logger = Logger.getInstance();

    if (amount <= 0) {
      logger.log("error", `Invalid amount for order ${orderId}.`);
      return;
    }

    logger.log("info", `Charged $${amount.toFixed(2)} for order ${orderId}.`);
  }
}

function runSingletonDemo(): void {
  new OrderService().placeOrder("A-100");
  new PaymentService().charge("A-100", 49.9);
  new PaymentService().charge("A-101", 0);

  console.log(
    "Same instance:",
    Logger.getInstance() === Logger.getInstance()
  );
  console.log("Shared log:", Logger.getInstance().getEntries());
}

runSingletonDemo();
