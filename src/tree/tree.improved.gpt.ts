type TreeConstructor = <T>(
  value: T,
  left: Tree<T> | EmptyTree<T>,
  right: Tree<T> | EmptyTree<T>
) => Tree<T>;

type EmptyTreeConstructor = <T>() => EmptyTree<T>;

type Tree<T> = <U extends TreeFn<T>, Y extends EmptyFn<T>>(
  fn: U,
  _: Y
) => ReturnType<U>;

type EmptyTree<T> = <U extends TreeFn<T>, Y extends EmptyFn<T>>(
  _: U,
  fn: Y
) => ReturnType<Y>;

type TreeFn<T> = <U>(
  value: T,
  left: Tree<T> | EmptyTree<T>,
  right: Tree<T> | EmptyTree<T>
) => any;

type EmptyFn<T> = (...args: []) => any;

const Tree: TreeConstructor = (value, left, right) => (fn, _) =>
  fn(value, left, right);

const EmptyTree: EmptyTreeConstructor = () => (_, fn) => fn();

const tree = Tree(1, Tree(2, EmptyTree(), EmptyTree()), EmptyTree());

const result = tree(
  (value, left, right) =>
    left(
      (value, left, right) => "",
      () => ""
    ) +
    right(
      (value, left, right) => "",
      () => null
    ),
  () => null
);

export { Tree, EmptyTree };
