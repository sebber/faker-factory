import { faker, Faker } from "@faker-js/faker";

export type FactoryBlueprint<T> = (faker: Faker) => T;

export interface FactoryDefinition<T> {
  make(fields?: Partial<T>): T;
  makeMany(howMany: number): T[];
  with<T2>(fields: T2): FactoryDefinition<T & T2>;
}

function makeOne<T>(blueprint: FactoryBlueprint<T>): T {
  return blueprint(faker);
}

function makeMany<T>(blueprint: FactoryBlueprint<T>, howMany: number): T[] {
  return [...Array(howMany).keys()].map(() => blueprint(faker));
}

function withFields<T>(blueprint: FactoryBlueprint<T>, fields: Partial<T>): T {
  return Factory<T>(() => ({
    ...blueprint(faker),
    ...fields,
  })).make();
}

export function Factory<T>(
  blueprint: FactoryBlueprint<T>
): FactoryDefinition<T> {
  return {
    make: (fields?: Partial<T>) =>
      fields ? withFields(blueprint, fields) : makeOne(blueprint),
    makeMany: (howMany) => makeMany(blueprint, howMany),
    with: <T2>(fields: T2) => {
      return Factory(() => ({
        ...blueprint(faker),
        ...fields,
      }));
    },
  };
}
