import { faker, Faker } from "@faker-js/faker";

export type FieldName<TItem> = keyof TItem;
export type FieldValue<TItem> = TItem[keyof TItem] | (() => TItem[keyof TItem]);
export type Blueprint<TItem> = {
  [name in FieldName<TItem>]: FieldValue<TItem>;
};
export type Plan<TItem> = (faker: Faker) => Blueprint<TItem>;
export type PartialPlan<TITem> = (faker: Faker) => Partial<Blueprint<TITem>>;

export type FactoryDefinition<TItem> = {
  make: (overrides?: PartialPlan<TItem>) => TItem;
  makeMany: (count: number, overrides?: PartialPlan<TItem>) => TItem[];
  extend: (overrides: PartialPlan<TItem>) => FactoryDefinition<TItem>;
};

export function Factory<TItem>(plan: Plan<TItem>): FactoryDefinition<TItem> {
  const make = (overrides?: PartialPlan<TItem>) => {
    if (overrides) {
      return produce(mergePlans(plan, overrides));
    }
    return produce(plan);
  };

  const makeMany = (count: number, overrides?: PartialPlan<TItem>) => {
    return Array.from({ length: count }).map(() => make(overrides));
  };

  const extend = (overrides: PartialPlan<TItem>) => {
    return Factory<TItem>(mergePlans(plan, overrides));
  };

  return { make, makeMany, extend };
}

function produce<TItem>(plan: Plan<TItem>): TItem {
  const item = {} as TItem;

  const blueprint = plan(faker);
  Object.keys(blueprint).forEach((key) => {
    const fieldValue = blueprint[key];

    if (typeof fieldValue === "function") {
      item[key] = fieldValue();
    } else {
      item[key] = fieldValue;
    }
  });

  return item;
}

function mergePlans<TItem>(
  plan: Plan<TItem>,
  overrides: PartialPlan<TItem>
): Plan<TItem> {
  return (faker) => Object.assign(plan(faker), overrides(faker));
}
