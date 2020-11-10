/*eslint-env mocha*/
import {map}                  from "@prelude/trait-functor";
import {flatMap}              from "@prelude/trait-monad";
import {Identity}             from "@prelude/data-identity";
import {getStateT, runStateT} from "../lib/index.js";
import chai                   from "chai";

describe("@prelude/data-state-transformer", () => {
  const {put, get, modify, state} = getStateT(Identity);

  describe("get()", () => {
    it("should returns state value for both elements", () => {
      const s = get();
      chai.expect((1 |> runStateT(s)).value)
        .to.be.deep.equal([1, 1]);
    });
  });

  describe("put(state)", () => {
    it("should returns unit and new [state]", () => {
      const s = put(4);
      chai.expect((1 |> runStateT(s)).value)
        .to.be.deep.equal([{}, 4]);
    });
  });

  describe("modify(fn)", () => {
    it("should returns unit and new computed state", () => {
      const s = modify(x => x + 1);
      chai.expect((1 |> runStateT(s)).value)
        .to.be.deep.equal([{}, 2]);
    });
  });

  describe("[Functor.map](fn, stateT)", () => {
    it("should map first element", () => {
      const s = get() |> map(x => x + 1);
      chai.expect((1 |> runStateT(s)).value)
        .to.be.deep.equal([2, 1]);
    });
  });

  describe("[Monad.flatMap](fn, stateT)", () => {
    it("should bind [fn] to first element", () => {
      const s = get() |> flatMap(x => state(_ => [x + 1, x]));
      chai.expect((1 |> runStateT(s)).value)
        .to.be.deep.equal([2, 1]);
    });
  });
});
