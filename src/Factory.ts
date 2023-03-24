import { faker, Faker } from "@faker-js/faker";

export type FactoryBlueprint<T> = (faker: Faker) => T;

export interface FactoryDefinition<T> {
  make(): T;
  makeMany(howMany: number): T[];
  with(fields: Partial<T>): FactoryDefinition<T>;
}

export function Factory<T>(
  blueprint: FactoryBlueprint<T>
): FactoryDefinition<T> {
  return {
    make: () => blueprint(faker),
    makeMany: (howMany) =>
      [...Array(howMany).keys()].map(() => blueprint(faker)),
    with: (fields) => {
      return Factory(() => ({
        ...blueprint(faker),
        ...fields,
      }));
    },
  };
}
