import { describe, it, expect } from "vitest";
import { Factory } from "./Factory";

type Car = {
  maker: string;
  modelYear: number;
};

describe("Factory", () => {
  describe("given a blueprint", () => {
    it("should be able to create one item of", () => {
      const carFactory = Factory<Car>((faker) => ({
        maker: faker.company.name(),
        modelYear: faker.date.between("1769-01-01", new Date()).getFullYear(),
      }));

      const car = carFactory.make();

      expect(typeof car.maker).toBe(typeof "string");
      expect(typeof car.modelYear).toBe(typeof 1);
    });

    it("should be able to create multiple items of", () => {
      const carFactory = Factory<Car>((faker) => ({
        maker: faker.company.name(),
        modelYear: faker.date.between("1769-01-01", new Date()).getFullYear(),
      }));

      const cars = carFactory.makeMany(5);

      cars.forEach((car) => {
        expect(typeof car.maker).toBe(typeof "string");
        expect(typeof car.modelYear).toBe(typeof 1);
      });
    });

    it("should be extendable", () => {
      const carFactory = Factory<Car>((faker) => ({
        maker: faker.company.name(),
        modelYear: faker.date.between("1769-01-01", new Date()).getFullYear(),
      }));

      const volvoFactory = carFactory.with({ maker: "Volvo Cars" });
      const volvo = volvoFactory.make();

      expect(volvo.maker).toBe("Volvo Cars");
    });
  });
});
