# Design Patterns Examples

TypeScript examples of the 23 Gang of Four (GoF) design patterns. Each pattern lives in a single file with a small, runnable demo.

## Getting Started

```bash
yarn install
yarn example src/behavioral/strategy.ts   # run any example
yarn run check                            # type-check the project
```

> Use `yarn run check`, not `yarn check` — the latter is a built-in Yarn v1 command.

## Patterns

### Creational

| Pattern | Status | File |
| --- | --- | --- |
| Abstract Factory | ✅ | [abstract-factory.ts](src/creational/abstract-factory.ts) |
| Builder | ✅ | [builder.ts](src/creational/builder.ts) |
| Factory Method | ✅ | [factory-method.ts](src/creational/factory-method.ts) |
| Prototype | ⬜ | |
| Singleton | ✅ | [singleton.ts](src/creational/singleton.ts) |

### Structural

| Pattern | Status | File |
| --- | --- | --- |
| Adapter | ✅ | [adapter.ts](src/structural/adapter.ts) |
| Bridge | ⬜ | |
| Composite | ⬜ | |
| Decorator | ✅ | [decorator.ts](src/structural/decorator.ts) |
| Facade | ⬜ | |
| Flyweight | ⬜ | |
| Proxy | ⬜ | |

### Behavioral

| Pattern | Status | File |
| --- | --- | --- |
| Chain of Responsibility | ⬜ | |
| Command | ✅ | [command.ts](src/behavioral/command.ts) |
| Interpreter | ⬜ | |
| Iterator | ⬜ | |
| Mediator | ⬜ | |
| Memento | ⬜ | |
| Observer | ✅ | [observer.ts](src/behavioral/observer.ts) |
| State | ⬜ | |
| Strategy | ✅ | [strategy.ts](src/behavioral/strategy.ts) |
| Template Method | ⬜ | |
| Visitor | ⬜ | |
