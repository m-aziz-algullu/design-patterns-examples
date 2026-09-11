interface ReportFormatter {
  format(rows: ReportRow[]): string;
}

type ReportRow = {
  product: string;
  quantity: number;
};

class JsonReportFormatter implements ReportFormatter {
  format(rows: ReportRow[]): string {
    return JSON.stringify(rows, null, 2);
  }
}

class CsvReportFormatter implements ReportFormatter {
  format(rows: ReportRow[]): string {
    const lines = rows.map((row) => {
      const product = row.product.replace(/"/g, '""');

      return `"${product}",${row.quantity}`;
    });

    return ["product,quantity", ...lines].join("\n");
  }
}

abstract class ReportExporter {
  protected abstract createFormatter(): ReportFormatter;

  export(rows: ReportRow[]): string {
    for (const row of rows) {
      if (!Number.isInteger(row.quantity) || row.quantity < 0) {
        throw new Error("Product quantity must be a non-negative integer.");
      }
    }

    const formatter = this.createFormatter();

    return formatter.format(rows);
  }
}

class JsonReportExporter extends ReportExporter {
  protected createFormatter(): ReportFormatter {
    return new JsonReportFormatter();
  }
}

class CsvReportExporter extends ReportExporter {
  protected createFormatter(): ReportFormatter {
    return new CsvReportFormatter();
  }
}

function runFactoryMethodDemo(): void {
  const rows: ReportRow[] = [
    { product: "Keyboard", quantity: 3 },
    { product: 'Monitor, 27"', quantity: 2 }
  ];
  const exporters: ReportExporter[] = [
    new JsonReportExporter(),
    new CsvReportExporter()
  ];

  for (const exporter of exporters) {
    console.log(exporter.export(rows));
  }
}

runFactoryMethodDemo();
