type TreeConstructor = <T>(
    value: T,
    left: Tree<T> | EmptyTree<T>,
    right: Tree<T> | EmptyTree<T>
  ) => Tree<T>;
  
  type EmptyTreeConstructor = <T>() => EmptyTree<T>;
  
  type Tree<T> = (fn: TreeFn<T>, _: EmptyTree<T>) => ReturnType<TreeFn<T>>;
  
  type EmptyTree<T> = (_: TreeFn<T>, fn: EmptyFn<T>) => ReturnType<EmptyFn<T>>;
  
  type TreeFn<T, U extends T> = (
    value: T,
    left: Tree<T> | EmptyTree<T>,
    right: Tree<T> | EmptyTree<T>
  ) => U;
  
  type EmptyFn<T, U extends T> = (...args: []) => U;
  
  const Tree: TreeConstructor = (value, left, right) => (fn, _) =>
    fn(value, left, right);
  
  const EmptyTree: EmptyTreeConstructor = () => (_, fn) => fn();
  
  const tree = Tree(1, Tree(2, EmptyTree(), EmptyTree()), EmptyTree());
  
  const result = tree(
    (value, left, right) =>
      left(
        (value, left, right) => 1,
        () => 1
      ) +
      right(
        (value, left, right) => 1,
        () => 1
      ),
    () => 1
  );
  
  export { Tree, EmptyTree };
  