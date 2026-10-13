interface Observer<TEvent> {
  update(event: TEvent): void;
}

interface Subject<TEvent> {
  subscribe(observer: Observer<TEvent>): () => void;
  unsubscribe(observer: Observer<TEvent>): void;
  notify(event: TEvent): void;
}

abstract class Observable<TEvent> implements Subject<TEvent> {
  private readonly observers = new Set<Observer<TEvent>>();

  subscribe(observer: Observer<TEvent>): () => void {
    this.observers.add(observer);

    return () => {
      this.unsubscribe(observer);
    };
  }

  unsubscribe(observer: Observer<TEvent>): void {
    this.observers.delete(observer);
  }

  notify(event: TEvent): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }

  protected get observerCount(): number {
    return this.observers.size;
  }
}

type StockEvent = {
  symbol: string;
  previousPrice: number;
  currentPrice: number;
  changedAt: Date;
};

class StockTicker extends Observable<StockEvent> {
  private readonly prices = new Map<string, number>();

  setPrice(symbol: string, currentPrice: number): void {
    const normalizedSymbol = symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      throw new Error("Stock symbol is required.");
    }

    const previousPrice = this.prices.get(normalizedSymbol);
    this.prices.set(normalizedSymbol, currentPrice);

    if (previousPrice === undefined || previousPrice === currentPrice) {
      return;
    }

    this.notify({
      symbol: normalizedSymbol,
      previousPrice,
      currentPrice,
      changedAt: new Date()
    });
  }

  getPrice(symbol: string): number | undefined {
    return this.prices.get(symbol.trim().toUpperCase());
  }
}

class PriceAlert implements Observer<StockEvent> {
  constructor(
    private readonly symbol: string,
    private readonly thresholdPercent: number
  ) {}

  update(event: StockEvent): void {
    if (event.symbol !== this.symbol.trim().toUpperCase()) {
      return;
    }

    const percentChange =
      ((event.currentPrice - event.previousPrice) / event.previousPrice) * 100;

    if (Math.abs(percentChange) >= this.thresholdPercent) {
      console.log(
        `${event.symbol} moved ${percentChange.toFixed(2)}%: ` +
          `${event.previousPrice} -> ${event.currentPrice}`
      );
    }
  }
}

class AuditLog implements Observer<StockEvent> {
  readonly entries: string[] = [];

  update(event: StockEvent): void {
    this.entries.push(
      `[${event.changedAt.toISOString()}] ${event.symbol}: ` +
        `${event.previousPrice} -> ${event.currentPrice}`
    );
  }
}

function runObserverDemo(): void {
  const ticker = new StockTicker();
  const auditLog = new AuditLog();
  const unsubscribeAlert = ticker.subscribe(new PriceAlert("OPENAI", 5));

  ticker.subscribe(auditLog);

  ticker.setPrice("OPENAI", 100);
  ticker.setPrice("OPENAI", 103);
  ticker.setPrice("OPENAI", 109);

  unsubscribeAlert();

  ticker.setPrice("OPENAI", 120);

  console.log(auditLog.entries);
}

runObserverDemo();
