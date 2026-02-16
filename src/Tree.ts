import { TreeNode } from "./TreeNode.js";

/**
 * Represents a tree data structure.
 */
export class Tree<T> {
  /**
   * The root node of the tree.
   */
  root: TreeNode<T> | null;

  /**
   * Creates a new `Tree` instance.
   * @param value The value to initialize the root node with.
   */
  constructor(value: T) {
    this.root = new TreeNode(value);
  }

  /**
   * Traverses the tree using the specified traversal method,
   * calling the provided callback function on each visited node.
   * @param callback A function to call on each visited node.
   * @param traversal The traversal method to use. Can be one of:
   * 'breadthFirst', 'depthFirst', 'preOrder', 'postOrder'.
   */
  traverse(
    callback: (node: TreeNode<T>) => void,
    traversal: "breadthFirst" | "depthFirst" | "preOrder" | "postOrder",
  ) {
    if (!this.root) return;
    this.root.traverse(callback, traversal);
  }

  /**
   * Returns all the nodes of the tree in an array.
   */
  all(): TreeNode<T>[] {
    if (!this.root) return [];
    return this.root.all();
  }
}
