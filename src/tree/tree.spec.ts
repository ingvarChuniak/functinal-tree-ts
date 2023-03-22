import { Tree, EmptyTree } from "./tree.functions";

describe("Tree", () => {
  it("To return a function", () => {
    const tree = Tree<number>(1, EmptyTree(), EmptyTree());

    const returnType = tree(
      (value, left, right) => true,
      <any>() => null
    );

  });
});
