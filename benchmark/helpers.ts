import { Tree } from "../src/Tree";
import { TreeNode } from "../src/TreeNode";

export type Traversal = "breadthFirst" | "depthFirst" | "preOrder" | "postOrder";

export type DeepTreeFixture = {
  tree: Tree<number>;
  deepest: TreeNode<number>;
};

export const readPositiveInt = (name: string, fallback: number): number => {
  const raw = process.env[name];
  if (raw === undefined) return fallback;

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return parsed;
};

export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};

export const buildDeepTree = (depth: number): DeepTreeFixture => {
  const tree = new Tree(0);
  let current = tree.root!;

  for (let value = 1; value <= depth; value += 1) {
    current = current.addChild(value);
  }

  return { tree, deepest: current };
};

export const expectedWideNodeCount = (branching: number, levels: number): number => {
  let total = 0;
  let levelWidth = 1;

  for (let level = 0; level <= levels; level += 1) {
    total += levelWidth;
    levelWidth *= branching;
  }

  return total;
};

export const buildWideTree = (branching: number, levels: number): Tree<number> => {
  const tree = new Tree(0);
  let currentLevel = [tree.root!];
  let value = 1;

  for (let level = 0; level < levels; level += 1) {
    const nextLevel: TreeNode<number>[] = [];

    for (const node of currentLevel) {
      for (let index = 0; index < branching; index += 1) {
        nextLevel.push(node.addChild(value));
        value += 1;
      }
    }

    currentLevel = nextLevel;
  }

  return tree;
};

export const countTraversal = (tree: Tree<number>, mode: Traversal): number => {
  let visited = 0;
  tree.traverse(() => {
    visited += 1;
  }, mode);
  return visited;
};
