interface Button {
  render(label: string): string;
}

interface Checkbox {
  render(label: string, checked: boolean): string;
}

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class LightButton implements Button {
  render(label: string): string {
    return `[ ${label} ] (light)`;
  }
}

class LightCheckbox implements Checkbox {
  render(label: string, checked: boolean): string {
    return `${checked ? "[x]" : "[ ]"} ${label} (light)`;
  }
}

class DarkButton implements Button {
  render(label: string): string {
    return `▐ ${label} ▌ (dark)`;
  }
}

class DarkCheckbox implements Checkbox {
  render(label: string, checked: boolean): string {
    return `${checked ? "■" : "□"} ${label} (dark)`;
  }
}

class LightThemeFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }

  createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

class SettingsForm {
  private readonly saveButton: Button;
  private readonly notificationsCheckbox: Checkbox;

  constructor(factory: UIFactory) {
    this.saveButton = factory.createButton();
    this.notificationsCheckbox = factory.createCheckbox();
  }

  render(notificationsEnabled: boolean): string {
    return [
      this.notificationsCheckbox.render(
        "Enable notifications",
        notificationsEnabled
      ),
      this.saveButton.render("Save")
    ].join("\n");
  }
}

function runAbstractFactoryDemo(): void {
  const factories: Record<string, UIFactory> = {
    light: new LightThemeFactory(),
    dark: new DarkThemeFactory()
  };

  for (const [theme, factory] of Object.entries(factories)) {
    const form = new SettingsForm(factory);

    console.log(`${theme} theme:\n${form.render(theme === "dark")}`);
  }
}

runAbstractFactoryDemo();
