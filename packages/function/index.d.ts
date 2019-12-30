import {F, L} from "ts-toolbelt";

/**
 * Internal logic of `curry` function. Takes `n` as the length of the function
 * `f` and then returned the curried version of this function. The returned
 * function compares the length of the passed `arguments` with `n`. When greater
 * or equal to `n`, then it calls the original reference with the specified
 * `arguments`. Otherwise it call `curryN()` where the new `n` value equals the
 * current `n` value minus the length of the passed `arguments` and the new
 * function reference is the original reference bound to the passed arguments.
 *
 * @template {F.Function} Fn
 * @param {number} n
 * Arity of the function to curry.
 *
 * @param {Fn} fn
 * The function to curry.
 *
 * @returns {F.Curry<Fn>}
 * Returns the curried function.
 */
export function curryN<Fn extends F.Function>(
  n: number, 
  fn: Fn
): F.Curry<Fn>;

/**
 * Curry `f`. The returned function can be partially applied automatically.
 *
 * @example
 * const add = curry((x, y, z) => x + y + z);
 *
 * add(1, 2, 3) // -> 6
 * add(1)(2, 3) // -> 6
 * add(1)(2)(3) // -> 6
 * add(1, 2)(3) // -> 6
 *
 * @template {F.Function} Fn
 * @param {Fn} f
 * The function to curry.
 *
 * @returns {F.Curry<Fn>}
 * Returns the curried function.
 */
export function curry <Fn extends F.Function>(f: Fn): F.Curry<Fn>;

/**
 * Identity function.
 *
 * @template A
 * @param {A} x
 * The value to return
 *
 * @returns {A}
 * Returns the passed argument.
 */
export function identity<A>(x: A): A;

/**
 * Composes two functions `f` and `g` to create a new one. The new function
 * first compute `y=g(x)`, and then use `y` to compute `z=f(y)`.
 *
 * @example
 * const fullName = compose(
 *   intersperse(" ")
 *   map(cap),
 *   props("firstName", "lastName")
 * );
 *
 * getUser(1)
 *   .then(fullName)
 *   .then(console.log)
 * // => "John Doe"
 *
 * @template {F.Function} Fns
 * @param  {...F.Composer<Fns>} fns
 * The functions to compose from right to left.
 *
 * @returns {F.Curry<F.Composed<Fns>>}
 * Returns the new composed function.
 */
export function compose<Fns extends F.Function[]>(
  ...fns: F.Composer<Fns>
): F.Curry<F.Composed<Fns>>;

/**
 * Composes two functions `f` and `g` to create a new one. The new function
 * first compute `y=g(x)`, and then use `y` to compute `z=f(y)`.
 *
 * @example
 * const fullName = pipe(
 *   props("firstName", "lastName"),
 *   map(cap),
 *   intersperse(" ")
 * );
 *
 * getUser(1)
 *   .then(fullName)
 *   .then(console.log)
 * // => "John Doe"
 *
 * @template {F.Function[]} Fns
 * @param {...F.Piper<Fns>} fns
 * The functions to compose from right to left.
 *
 * @returns {F.Curry<F.Piped<Fns>>}
 * Returns the new composed function.
 */
export function pipe<Fns extends F.Function[]>(
  ...fns: F.Piper<Fns>
): F.Curry<F.Piped<Fns>>;

/**
 * Flips the two arguments in reverse order of the specified function `f`.
 *
 * @example
 * const addl = curry((x, y) => x + y);
 * const addr = flip(addl);
 * addr("hello", "world");
 * // => "worldhello"
 *
 * @template {F.Function} Fn
 * @param {Fn} fn
 * The function to flip.
 *
 * @returns {F.Curry<(...args: L.Reverse<F.Parameters<Fn>>) => F.Return<Fn>>}
 * Returns the flipped function.
 */
export function flip<Fn extends F.Function>(
  fn: Fn
): F.Curry<(...args: L.Reverse<F.Parameters<Fn>>) => F.Return<Fn>>;

/**
 * Creates an unary function which evaluates to `x` for all inputs.
 *
 * ```
 * const fill = pipe(constant, map);
 * fill(42)(new Array(4));
 * // => [42, 42, 42, 42]
 * ```
 *
 * @template A
 * @template B
 * @param {A} x
 * The const value
 * 
 * @returns {(_: B) => A}
 * Returns the constant function.
 */
export const constant = <A, B>(x: A) => ((_: B) => A);

/**
 * Calls the function `f` until the predicate `p` matches. Each times `f` is
 * computed the return value is used for the next `until` cycle.
 *
 * @example
 * until(
 *   xs => head(xs) === 'c',
 *   xs => tail(xs),
 *   ['a', 'b', 'c', 'd']
 * )
 * // => ['c', 'd']
 *
 * @template A
 * @param {(x: A) => boolean} p
 * The predicate always computed before `f`.
 *
 * @param {(x: A) => A} f
 * The function computed after the predicate `p` returned `false`.
 *
 * @param {A} x
 * The value to pass over the to the predicate `p` and the function `f`.
 */
export const until: F.Curry<<A>(p: (x: A) => boolean, f: (x: A) => A, r: A) => A>;
