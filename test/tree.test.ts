import { describe, expect, it } from "vitest";
import { Tree } from "../src/Tree";

describe("treeClass", () => {
  describe("Tree", () => {
    const buildDeepTree = (depth: number) => {
      const tree = new Tree(0);
      let current = tree.root!;

      for (let i = 1; i <= depth; i++) {
        current = current.addChild(i);
      }

      return { tree, deepest: current };
    };

    const buildBranchingTree = () => {
      const tree = new Tree("root");
      const root = tree.root!;
      const nodeA = root.addChild("a");
      const nodeB = root.addChild("b");
      const nodeC = nodeA.addChild("c");
      const nodeD = nodeA.addChild("d");
      const nodeE = nodeB.addChild("e");
      return { tree, nodeA, nodeB, nodeC, nodeD, nodeE };
    };

    it("can have different node types", () => {
      const stringTree = new Tree("root");
      expect(stringTree.root!.value).toBe("root");
      expect(stringTree.root!.value).toBeTypeOf("string");

      const numberTree = new Tree(1);
      expect(numberTree.root!.value).toBe(1);
      expect(numberTree.root!.value).toBeTypeOf("number");

      const objectTree = new Tree({ test: 1 });
      expect(objectTree.root!.value).toStrictEqual({ test: 1 });
      expect(objectTree.root!.value).toBeTypeOf("object");
    });

    it("traverses a branching tree in expected order for each mode", () => {
      const { tree } = buildBranchingTree();

      const expectedOrder: Record<"breadthFirst" | "depthFirst" | "preOrder" | "postOrder", string[]> = {
        breadthFirst: ["root", "a", "b", "c", "d", "e"],
        depthFirst: ["root", "a", "c", "d", "b", "e"],
        preOrder: ["root", "a", "c", "d", "b", "e"],
        postOrder: ["c", "d", "a", "e", "b", "root"],
      };

      const modes: Array<keyof typeof expectedOrder> = ["breadthFirst", "depthFirst", "preOrder", "postOrder"];

      for (const mode of modes) {
        const visited: string[] = [];
        tree.traverse((node) => {
          visited.push(node.value);
        }, mode);
        expect(visited).toStrictEqual(expectedOrder[mode]);
      }
    });

    it("throws on unknown traversal mode", () => {
      const tree = new Tree("root");
      const traverse: unknown = Reflect.get(tree, "traverse");

      if (typeof traverse !== "function") {
        throw new TypeError("Tree.traverse must be a function");
      }

      expect(() => {
        Reflect.apply(traverse, tree, [() => {}, "invalid"]);
      }).toThrow();
    });

    it("all", () => {
      const { tree, nodeA, nodeB, nodeC, nodeD, nodeE } = buildBranchingTree();
      const all = tree.all();

      expect(all.includes(nodeA)).toBeTruthy();
      expect(all.includes(nodeB)).toBeTruthy();
      expect(all.includes(nodeC)).toBeTruthy();
      expect(all.includes(nodeD)).toBeTruthy();
      expect(all.includes(nodeE)).toBeTruthy();
      expect(all.length).toBe(5);
    });

    it("handles null root safely", () => {
      const tree = new Tree("root");
      tree.root = null;

      expect(tree.all()).toStrictEqual([]);
      expect(() => {
        tree.traverse(() => {
          throw new Error("callback should not run when root is null");
        }, "breadthFirst");
      }).not.toThrow();
    });

    it("traverses very deep trees in preOrder", () => {
      const depth = 15000;
      const { tree } = buildDeepTree(depth);
      const visited: number[] = [];

      expect(() => {
        tree.traverse((node) => {
          visited.push(node.value);
        }, "preOrder");
      }).not.toThrow();

      expect(visited.length).toBe(depth + 1);
      expect(visited[0]).toBe(0);
      expect(visited.at(-1)).toBe(depth);
    });

    it("returns all descendants for very deep trees", () => {
      const depth = 15000;
      const { tree } = buildDeepTree(depth);
      let descendants = tree.all();

      expect(() => {
        descendants = tree.all();
      }).not.toThrow();

      expect(descendants.length).toBe(depth);
      expect(descendants[0].value).toBe(1);
      expect(descendants.at(-1)?.value).toBe(depth);
    });
  });
});
