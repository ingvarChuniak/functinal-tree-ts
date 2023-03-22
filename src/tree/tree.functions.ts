type TreeConstructor = <T>(
  value: T,
  left: Tree<T> | EmptyTree<T>,
  right: Tree<T> | EmptyTree<T>
) => Tree<T>;

type EmptyTreeConstructor = <T>() => EmptyTree<T>;

type Tree<T> = <
  U extends (
    value: T,
    left: Tree<T> | EmptyTree<T>,
    right: Tree<T> | EmptyTree<T>
  ) => ReturnType<U>,
  Y extends (...args: []) => ReturnType<Y>
>(
  fn: U,
  _: Y
) => ReturnType<U>;

type EmptyTree<T> = <
  U extends (
    value: T,
    left: Tree<T> | EmptyTree<T>,
    right: Tree<T> | EmptyTree<T>
  ) => ReturnType<U>,
  Y extends (...args: []) => ReturnType<Y>
>(
  _: U,
  fn: Y
) => ReturnType<Y>;

const Tree: TreeConstructor = (value, left, right) => (fn, _) =>
  fn(value, left, right);

const EmptyTree: EmptyTreeConstructor = () => (_, fn) => fn();

export { Tree, EmptyTree };
