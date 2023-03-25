import { describe, it, expect, beforeEach } from "vitest";
import { Factory, FactoryDefinition } from "./Factory";

type Car = {
  maker: string;
  modelYear: number;
};

type TestContext = { carFactory: FactoryDefinition<Car> };

describe("Factory, given a blueprint of Car", () => {
  beforeEach<TestContext>((ctx) => {
    ctx.carFactory = Factory<Car>((faker) => ({
      maker: faker.company.name(),
      modelYear: faker.date.between("1769-01-01", new Date()).getFullYear(),
    }));
  });

  it<TestContext>("should be able to create one Car", ({ carFactory }) => {
    const car = carFactory.make();

    expect(typeof car.maker).toBe(typeof "string");
    expect(typeof car.modelYear).toBe(typeof 1);
  });

  it<TestContext>("should be able to create multiple Cars", ({
    carFactory,
  }) => {
    const cars = carFactory.makeMany(5);

    cars.forEach((car) => {
      expect(typeof car.maker).toBe(typeof "string");
      expect(typeof car.modelYear).toBe(typeof 1);
    });
  });

  it<TestContext>("should be able take overrides for fields when making one", ({
    carFactory,
  }) => {
    const volvo = carFactory.make({ maker: "Volvo Cars" });
    expect(volvo.maker).toBe("Volvo Cars");
  });

  it<TestContext>("should be extendable for more detailed specifics", ({
    carFactory,
  }) => {
    const volvoFactory = carFactory.with({ maker: "Volvo Cars" });
    const volvo = volvoFactory.make();

    expect(volvo.maker).toBe("Volvo Cars");
  });
});
