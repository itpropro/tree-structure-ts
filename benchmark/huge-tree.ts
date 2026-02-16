import { Tree } from "../src/Tree";
import { TreeNode } from "../src/TreeNode";
import {
  assert,
  buildDeepTree,
  buildWideTree,
  countTraversal,
  expectedWideNodeCount,
  readPositiveInt,
} from "./helpers";

const DEEP_DEPTH = readPositiveInt("DEEP_DEPTH", 250_000);
const WIDE_BRANCHING = readPositiveInt("WIDE_BRANCHING", 12);
const WIDE_LEVELS = readPositiveInt("WIDE_LEVELS", 5);

const formatMs = (durationMs: number): string => durationMs.toFixed(2).padStart(10);

const benchmark = <T>(name: string, fn: () => T): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const durationMs = end - start;
  console.log(`${name.padEnd(36)} ${formatMs(durationMs)} ms`);
  return result;
};

console.log("Huge Tree Benchmark");
console.log(`DEEP_DEPTH=${DEEP_DEPTH}`);
console.log(`WIDE_BRANCHING=${WIDE_BRANCHING}`);
console.log(`WIDE_LEVELS=${WIDE_LEVELS}`);
console.log("");

let deepTree: Tree<number>;
let deepLeaf: TreeNode<number>;

benchmark("build deep tree", () => {
  const built = buildDeepTree(DEEP_DEPTH);
  deepTree = built.tree;
  deepLeaf = built.deepest;
});

const deepNodeCount = DEEP_DEPTH + 1;

const deepPath = benchmark("deep getPath", () => deepLeaf!.getPath());
assert(deepPath.length === deepNodeCount, "deep getPath length mismatch");

const deepAll = benchmark("deep all", () => deepTree!.all());
assert(deepAll.length === DEEP_DEPTH, "deep all length mismatch");

const deepBreadthFirstCount = benchmark("deep traverse breadthFirst", () => countTraversal(deepTree!, "breadthFirst"));
assert(deepBreadthFirstCount === deepNodeCount, "deep breadthFirst count mismatch");

const deepDepthFirstCount = benchmark("deep traverse depthFirst", () => countTraversal(deepTree!, "depthFirst"));
assert(deepDepthFirstCount === deepNodeCount, "deep depthFirst count mismatch");

const deepPreOrderCount = benchmark("deep traverse preOrder", () => countTraversal(deepTree!, "preOrder"));
assert(deepPreOrderCount === deepNodeCount, "deep preOrder count mismatch");

const deepPostOrderCount = benchmark("deep traverse postOrder", () => countTraversal(deepTree!, "postOrder"));
assert(deepPostOrderCount === deepNodeCount, "deep postOrder count mismatch");

let wideTree: Tree<number>;

benchmark("build wide tree", () => {
  wideTree = buildWideTree(WIDE_BRANCHING, WIDE_LEVELS);
});

const expectedWideNodes = expectedWideNodeCount(WIDE_BRANCHING, WIDE_LEVELS);

console.log(`deepNodeCount=${deepNodeCount}`);
console.log(`wideNodeCount=${expectedWideNodes}`);
console.log("");

const wideAll = benchmark("wide all", () => wideTree!.all());
assert(wideAll.length === expectedWideNodes - 1, "wide all length mismatch");

const wideBreadthFirstCount = benchmark("wide traverse breadthFirst", () => countTraversal(wideTree!, "breadthFirst"));
assert(wideBreadthFirstCount === expectedWideNodes, "wide breadthFirst count mismatch");

const widePostOrderCount = benchmark("wide traverse postOrder", () => countTraversal(wideTree!, "postOrder"));
assert(widePostOrderCount === expectedWideNodes, "wide postOrder count mismatch");

console.log("\nBenchmark completed successfully.");
