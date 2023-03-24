# Faker Factory

The goal of this project is, by wrapping [Faker](https://github.com/faker-js/faker), to make a tool to easily write blueprints for generating data, mainly for testing purposes. Heavily inspired by my experience and patterns I learned to appreciate while using and writing tests with [Laravel](https://laravel.com/)!

## Example

```typescript
import { Factory } from "@sebber/faker-factory";

type Car = {
  maker: string;
  modelYear: number;
};

// You can create a factory by defining a blueprint for something
// you would like to generate
const carFactory = Factory<Car>((faker) => ({
  maker: faker.company.name(),
  modelYear: faker.date.between("1769-01-01", new Date()).getFullYear(),
}));

// with which you could make one
const car = carFactory.make();
console.log(car); // { maker: some maker, modelYear: some model year }

// or even many at a time.
const cars = carFactory.makeMany(5);
console.log(cars); // [{ maker: some maker, modelYear: some model year }, ...]

// You can also extend existing factories tp make a new one for more
// specific use cases either by adding new fields or overwriting existing
const volvoFactory = carFactory.with({ maker: "Volvo Cars" });
const volvo = volvoFactory.make();
console.log(car); // { maker: "Volvo Cars", modelYear: some model year }

// or just overwriting existing fields just once
// with which you could make one
const car = carFactory.make({ maker: "Volvo Cars" });
console.log(car); // { maker: "Volvo Cars", modelYear: some model year }
```

## Appreciations

- [Faker](https://github.com/faker-js/faker)

Thank you to all the people behind `Faker` for your work to create and maintain what is utterly essential for `Faker Factory` to even be possible!

- [Laravel](https://laravel.com/)

As mentioned, `Laravel` was a big inspiration for me and how I learned to appreciate writing tests at all.

- [Matt Pocock](https://www.mattpocock.com/)

To even get started with a sane base for making a proper published package, I stole heavily from `Matt Pocock`.
