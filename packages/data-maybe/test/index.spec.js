/*eslint-env mocha*/
import {Maybe, Just, Nothing, isJust, isNothing, fromJust, fromMaybe,
  mapMaybe, catMaybes}  from "../lib/index.js";
import {pure}           from "@prelude/trait-applicative";
import * as functor     from "@prelude/trait-functor/lib/laws.js";
import * as applicative from "@prelude/trait-applicative/lib/laws.js";
import * as monad       from "@prelude/trait-monad/lib/laws.js";
import assert           from "assert";

describe("@prelude/data-maybe", () => {
  describe("Maybe", () => {
    it("should not be instantiable", () => {
      assert.throws(
        () => new Maybe(10),
        TypeError,
        "Data type violation."
      );
    });
  });
  describe("Just", () => {
    it("should throws when instantiate with undefined value", () => {
      assert.throws(
        () => Just(undefined),
        TypeError,
        "Just value cannot be null"
      );
    });
    it("should throws when instantiate with null value", () => {
      assert.throws(
        () => Just(null),
        TypeError,
        "Just value cannot be null"
      );
    });
  });
  describe("isJust()", () => {
    it("should return [true] when [Just]", () => {
      assert.ok(Just(1) |> isJust);
    });
    it("should return [false] when [Nothing]", () => {
      assert.ok(!(Nothing() |> isJust));
    });
  });
  describe("isNothing()", () => {
    it("should return [false] when [Just]", () => {
      assert.ok(!(Just(1) |> isNothing));
    });
    it("should return [true] when [Nothing]", () => {
      assert.ok(Nothing() |> isNothing);
    });
  });
  describe("fromJust()", () => {
    it("should return inner [value] when [Just]", () => {
      assert.strictEqual(Just(1) |> fromJust, 1);
    });
    it("should throw when [Nothing]", () => {
      assert.throws(() => Nothing() |> fromJust);
    });
  });
  describe("fromMaybe(defaultValue)", () => {
    it("should return inner [value] when [Just]", () => {
      assert.strictEqual(Just(1) |> fromMaybe(0), 1);
    });
    it("should return [defaultValue] when [Nothing]", () => {
      assert.strictEqual(Nothing() |> fromMaybe(0), 0);
    });
  });
  describe("mapMaybes(fn, xs)", () => {
    it("should return an array containing only values " +
       "where [fn] returned [Just]", () => {
      const keepEven = x => 0 === (x % 2)
        ? Just(x)
        : Nothing();
      assert.deepStrictEqual(
        [1, 2, 3, 4] |> mapMaybe(keepEven),
        [2, 4]
      );
    });
  });
  describe("catMaybes(xs)", () => {
    it("should return an array containing only values " +
      "from [Just] elements", () => {
      assert.deepStrictEqual(
        [Nothing(), Just(2), Nothing(), Just(4)] |> catMaybes,
        [2, 4]
      );
    });
  });
  describe("impl Maybe.prototype for @prelude/functor", () => {
    functor.testLaw(Just(1));
  });
  describe("impl Maybe.prototype for @prelude/applicative", () => {
    applicative.testLaw(Maybe);
    describe("implementation specific", () => {
      it("should return Nothing when pure is called with undefined", () => {
        assert.deepStrictEqual(undefined |> pure(Maybe), Nothing());
      });
      it("should return Nothing when pure is called with null", () => {
        assert.deepStrictEqual(null |> pure(Maybe), Nothing());
      });
      it("should return Nothing when pure is called with NaN", () => {
        assert.deepStrictEqual(NaN |> pure(Maybe), Nothing());
      });
    });
  });
  describe("impl Maybe.prototype for @prelude/monad", () => {
    monad.testLaw(Maybe);
  });
});
