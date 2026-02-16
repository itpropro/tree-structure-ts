import { describe, expect, it } from "vitest";
import { TreeNode } from "../src/TreeNode";

const buildDeepNode = (depth: number) => {
  const root = new TreeNode(0);
  let current = root;

  for (let i = 1; i <= depth; i++) {
    current = current.addChild(i);
  }

  return { root, deepest: current };
};

describe("TreeNode", () => {
  describe("TreeNode", () => {
    const buildBranchingNode = () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      const nodeB = root.addChild("b");
      const nodeC = nodeA.addChild("c");
      const nodeD = nodeA.addChild("d");
      const nodeE = nodeB.addChild("e");
      return { root, nodeA, nodeB, nodeC, nodeD, nodeE };
    };

    it("addChild", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      const nodeB = root.addChild("b");
      expect(root.children.includes(nodeA)).toBeTruthy();
      expect(root.children.includes(nodeB)).toBeTruthy();
      expect(nodeA.parent).toBe(root);
      expect(nodeB.parent).toBe(root);
    });

    it("all", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      const nodeB = root.addChild("b");
      const nodeC = nodeA.addChild("c");
      expect(root.all().includes(nodeA)).toBeTruthy();
      expect(root.all().includes(nodeB)).toBeTruthy();
      expect(root.all().includes(nodeC)).toBeTruthy();
      expect(root.all().length).toBe(3);
      expect(nodeA.all().length).toBe(1);
      expect(nodeB.all().length).toBe(0);
    });

    it("getPath", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      const nodeB = nodeA.addChild("b");
      const nodeC = nodeB.addChild("c");
      const generatedPath = [root, nodeA, nodeB, nodeC];
      const path = nodeC.getPath();
      expect(path).toStrictEqual(generatedPath);
    });

    it("hasChildren", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      expect(root.hasChildren()).toBeTruthy();
      expect(nodeA.hasChildren()).toBeFalsy();
    });

    it("hasSiblings", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      root.addChild("b");
      const nodeC = nodeA.addChild("c");
      expect(root.hasSiblings()).toBeFalsy();
      expect(nodeA.hasSiblings()).toBeTruthy();
      expect(nodeC.hasSiblings()).toBeFalsy();
    });

    it("isRoot", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      expect(root.isRoot()).toBeTruthy();
      expect(nodeA.isRoot()).toBeFalsy();
    });

    it("remove", () => {
      const root = new TreeNode("root");
      const nodeA = root.addChild("a");
      const nodeB = root.addChild("b");
      expect(root.children.length).toBe(2);
      const newCurrentNode = nodeA.remove();
      expect(root.children.length).toBe(1);
      expect(root.children[0]).toBe(nodeB);
      expect(newCurrentNode).toBe(root);
    });

    it("remove on root returns null", () => {
      const root = new TreeNode("root");
      expect(root.remove()).toBeNull();
      expect(root.isRoot()).toBeTruthy();
    });

    it("traverses a branching node in expected order for each mode", () => {
      const { root } = buildBranchingNode();

      const expectedOrder: Record<"breadthFirst" | "depthFirst" | "preOrder" | "postOrder", string[]> = {
        breadthFirst: ["root", "a", "b", "c", "d", "e"],
        depthFirst: ["root", "a", "c", "d", "b", "e"],
        preOrder: ["root", "a", "c", "d", "b", "e"],
        postOrder: ["c", "d", "a", "e", "b", "root"],
      };

      const modes: Array<keyof typeof expectedOrder> = ["breadthFirst", "depthFirst", "preOrder", "postOrder"];

      for (const mode of modes) {
        const visited: string[] = [];
        root.traverse((node) => {
          visited.push(node.value);
        }, mode);
        expect(visited).toStrictEqual(expectedOrder[mode]);
      }
    });

    it("throws on unknown traversal mode", () => {
      const root = new TreeNode("root");
      const traverse: unknown = Reflect.get(root, "traverse");

      if (typeof traverse !== "function") {
        throw new TypeError("TreeNode.traverse must be a function");
      }

      expect(() => {
        Reflect.apply(traverse, root, [() => {}, "invalid"]);
      }).toThrow();
    });

    it("prevents external children mutation from changing structure", () => {
      const root = new TreeNode("root");
      const child = root.addChild("child");
      const leakedChildren: unknown = Reflect.get(root, "children");

      if (!Array.isArray(leakedChildren)) {
        throw new TypeError("TreeNode.children must be an array");
      }

      leakedChildren.push(new TreeNode("rogue"));

      expect(root.children.length).toBe(1);
      expect(root.children[0]).toBe(child);
    });

    it("rejects external parent reassignment", () => {
      const root = new TreeNode("root");
      const child = root.addChild("child");

      const didSet = Reflect.set(child, "parent", null);

      expect(didSet).toBe(false);

      expect(child.getPath().map((node) => node.value)).toStrictEqual(["root", "child"]);
    });

    it("builds paths for very deep nodes", () => {
      const depth = 15000;
      const { root, deepest } = buildDeepNode(depth);
      let path: TreeNode<number>[] = [];

      expect(() => {
        path = deepest.getPath();
      }).not.toThrow();

      expect(path.length).toBe(depth + 1);
      expect(path[0]).toBe(root);
      expect(path.at(-1)).toBe(deepest);
      expect(path.at(-1)?.value).toBe(depth);
    });
  });
});
