import { Tree, EmptyTree } from "./tree.functions";

const reverse: <T>(tree: Tree<T> | EmptyTree<T>) => Tree<T> | EmptyTree<T> = (tree) =>
  tree(
    (value, left, rigth) => Tree(value, reverse(rigth), reverse(left)),
    () => EmptyTree()
  );

const map = (mapFn, tree) =>
  tree(
    (value, left, right) =>
      Tree(mapFn(value), map(mapFn, left), map(mapFn, right)),
    () => EmptyTree()
  );

const fromArray = (arr) =>
  arr.reduce((tree, current) => insert(current, tree), EmptyTree());

const insert = (newValue, tree) =>
  tree(
    (value, left, right) =>
      newValue <= value
        ? Tree(value, insert(newValue, left), right)
        : Tree(value, left, insert(newValue, right)),
    () => Tree(newValue, EmptyTree(), EmptyTree())
  );

const reduce = (tree) =>
  tree(
    (value, left, right) => value + reduce(left) + reduce(right),
    () => 0
  );

const flattenTree = (rootQueue) =>
  rootQueue.reduce((queue, tree) => {
    const newQueue = tree(
      (value, left, right) => {
        if (predicate(value)) {
          return value;
        }
        return [left, right];
      },
      () => [] //For an empty tree do nothing;
    );

    return queue.concat(newQueue);
  });

const dequeueFind = (queue, targetValue) =>
  queue.find(
    (tree) =>
      targetValue ===
      tree(
        (value) => value,
        () => null
      )
  );

const dequeue = (queue) =>
  queue.reduce((dequeued, tree) => {
    const value = tree(
      (value) => value,
      () => null
    );
    if (value !== null) {
      dequeued.push(value);
    }

    return dequeued;
  }, []);

const lineUp = (queue) =>
  queue.reduce(
    (newQueue, tree) =>
      newQueue.concat(
        tree(
          (_, left, right) => [left, right],
          () => []
        )
      ),
    []
  );

const flatten = (queue, dequeued) => {
  return queue.length === 0
    ? dequeued
    : flatten(lineUp(queue), dequeued.concat(dequeue(queue)));
};

const breadthFirstSearchTree = (queue, result = null) => {
  return result === null && queue.length !== 0
    ? breadthFirstSearchTree(lineUp(queue), dequeueFind(queue))
    : result;
};

const debthFirstSearch = (targetValue, tree) =>
  tree(
    (value, left, right) =>
      (targetValue === value && value) || targetValue < value
        ? debthFirstSearch(left)
        : debthFirstSearch(right),
    () => false
  );

const range = (length) => new Array(length).fill(0).map((_, i) => i + 1);

module.exports = {
  reverse,
  reduce,
  map,
  fromArray,
  range,
  flatten,
  breadthFirstSearchTree,
};
