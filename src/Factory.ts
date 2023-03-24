import { faker, Faker } from "@faker-js/faker";

export type FactoryBlueprint<TItem> = (faker: Faker) => TItem;

export interface FactoryDefinition<TItem> {
  make(fields?: Partial<TItem>): TItem;
  makeMany(howMany: number): TItem[];
  with<TItemExtension>(
    fields: TItemExtension
  ): FactoryDefinition<TItem & TItemExtension>;
}

function makeOne<TItem>(blueprint: FactoryBlueprint<TItem>): TItem {
  return blueprint(faker);
}

function makeMany<TItem>(
  blueprint: FactoryBlueprint<TItem>,
  howMany: number
): TItem[] {
  return [...Array(howMany).keys()].map(() => blueprint(faker));
}

function withFields<TItem>(
  blueprint: FactoryBlueprint<TItem>,
  fields: Partial<TItem>
): TItem {
  return Factory<TItem>(() => ({
    ...blueprint(faker),
    ...fields,
  })).make();
}

export function Factory<TItem>(
  blueprint: FactoryBlueprint<TItem>
): FactoryDefinition<TItem> {
  return {
    make: (fields?: Partial<TItem>) =>
      fields ? withFields(blueprint, fields) : makeOne(blueprint),
    makeMany: (howMany) => makeMany(blueprint, howMany),
    with: <TItemExtension>(fields: TItemExtension) => {
      return Factory(() => ({
        ...blueprint(faker),
        ...fields,
      }));
    },
  };
}
