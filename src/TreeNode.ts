/**
 * Represents a node in a tree structure.
 */
export class TreeNode<T> {
  /**
   * The value of the node.
   */
  value: T;

  #children: TreeNode<T>[];

  #parent: TreeNode<T> | null;

  /**
   * The children of the node.
   */
  get children(): readonly TreeNode<T>[] {
    return [...this.#children];
  }

  /**
   * The parent of the node.
   */
  get parent(): TreeNode<T> | null {
    return this.#parent;
  }

  /**
   * Creates a new TreeNode instance.
   * @param value The value of the node.
   * @param parent The parent of the node.
   */
  constructor(value: T, parent: TreeNode<T> | null = null) {
    this.value = value;
    this.#children = [];
    this.#parent = parent;
  }

  /**
   * Adds a child node to the current node.
   * @param value The value of the child node.
   * @returns The new child node.
   */
  addChild(value: T): TreeNode<T> {
    const newNode = new TreeNode(value, this);
    this.#children.push(newNode);
    return newNode;
  }

  /**
   * Gets all nodes in the tree below the current node.
   * @returns An array of TreeNode instances.
   */
  all(): TreeNode<T>[] {
    const nodes: TreeNode<T>[] = [];
    const stack: TreeNode<T>[] = [];

    for (let i = this.#children.length - 1; i >= 0; i--) {
      stack.push(this.#children[i]);
    }

    while (stack.length > 0) {
      const current = stack.pop()!;
      nodes.push(current);

      for (let i = current.#children.length - 1; i >= 0; i--) {
        stack.push(current.#children[i]);
      }
    }

    return nodes;
  }

  /**
   * Gets the path from the root node to the current node.
   * @returns An array of TreeNode instances.
   */
  getPath(): TreeNode<T>[] {
    const path: TreeNode<T>[] = [this];

    while (path[path.length - 1].#parent !== null) {
      path.push(path[path.length - 1].#parent!);
    }

    path.reverse();
    return path;
  }

  /**
   * Checks if the current node has any child nodes.
   * @returns `true` if the node has children, `false` otherwise.
   */
  hasChildren(): boolean {
    return this.#children.length > 0;
  }

  /**
   * Checks if the current node has any siblings.
   * @returns `true` if the node has siblings, `false` otherwise.
   */
  hasSiblings(): boolean {
    return this.#parent !== null && this.#parent.#children.length > 1;
  }

  /**
   * Checks if the current node is the root node.
   * @returns `true` if the node is the root node, `false` otherwise.
   */
  isRoot(): boolean {
    return this.#parent === null;
  }

  /**
   * Removes the current node from the tree.
   * @returns The new current node after removing the current node.
   */
  remove(): TreeNode<T> | null {
    if (this.#parent) {
      const parent = this.#parent;
      parent.#children = parent.#children.filter((child) => child !== this);

      this.#parent = null;
      return parent;
    }

    return null;
  }

  /**
   * Traverses the tree starting from the current node.
   * @param callback A function to be called for each visited node.
   * @param traversal `true` to traverse the tree in depth-first order, `false` for breadth-first order.
   */
  traverse(
    callback: (node: TreeNode<T>) => void,
    traversal: "breadthFirst" | "depthFirst" | "preOrder" | "postOrder",
  ) {
    switch (traversal) {
      case "postOrder": {
        const stack: Array<{ node: TreeNode<T>; visited: boolean }> = [{ node: this, visited: false }];

        while (stack.length > 0) {
          const current = stack.pop()!;

          if (current.visited) {
            callback(current.node);
            continue;
          }

          stack.push({ node: current.node, visited: true });

          for (let i = current.node.#children.length - 1; i >= 0; i--) {
            stack.push({ node: current.node.#children[i], visited: false });
          }
        }

        return;
      }

      case "breadthFirst": {
        const queue: TreeNode<T>[] = [this];
        let index = 0;

        while (index < queue.length) {
          const current = queue[index];
          index += 1;
          callback(current);

          for (const child of current.#children) {
            queue.push(child);
          }
        }

        return;
      }

      case "depthFirst":
      case "preOrder": {
        const stack: TreeNode<T>[] = [this];

        while (stack.length > 0) {
          const current = stack.pop()!;
          callback(current);

          for (let i = current.#children.length - 1; i >= 0; i--) {
            stack.push(current.#children[i]);
          }
        }

        return;
      }

      default:
        throw new Error(`Unknown traversal mode: ${String(traversal)}`);
    }
  }
}
