interface TemperatureSensor {
  getCelsius(): number;
}

class CelsiusSensor implements TemperatureSensor {
  constructor(private readonly temperature: number) {}

  getCelsius(): number {
    return this.temperature;
  }
}

class LegacyFahrenheitSensor {
  constructor(private readonly temperature: number) {}

  readFahrenheit(): number {
    return this.temperature;
  }
}

class FahrenheitSensorAdapter implements TemperatureSensor {
  constructor(private readonly sensor: LegacyFahrenheitSensor) {}

  getCelsius(): number {
    return ((this.sensor.readFahrenheit() - 32) * 5) / 9;
  }
}

class TemperatureDisplay {
  constructor(private readonly sensor: TemperatureSensor) {}

  show(label: string): void {
    console.log(`${label}: ${this.sensor.getCelsius().toFixed(1)} C`);
  }
}

function runAdapterDemo(): void {
  const celsiusSensor = new CelsiusSensor(25);
  const legacySensor = new LegacyFahrenheitSensor(77);
  const adaptedSensor = new FahrenheitSensorAdapter(legacySensor);

  const modernDisplay = new TemperatureDisplay(celsiusSensor);
  const legacyDisplay = new TemperatureDisplay(adaptedSensor);

  modernDisplay.show("Celsius sensor");
  legacyDisplay.show("Adapted Fahrenheit sensor");
}

runAdapterDemo();
