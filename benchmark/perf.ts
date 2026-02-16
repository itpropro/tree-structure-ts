import { Bench } from "tinybench";
import {
  assert,
  buildDeepTree,
  buildWideTree,
  countTraversal,
  expectedWideNodeCount,
  readPositiveInt,
} from "./helpers";

const PERF_TIME_MS = readPositiveInt("PERF_TIME_MS", 1_000);
const PERF_WARMUP_MS = readPositiveInt("PERF_WARMUP_MS", 300);
const PERF_DEEP_DEPTH = readPositiveInt("PERF_DEEP_DEPTH", 20_000);
const PERF_WIDE_BRANCHING = readPositiveInt("PERF_WIDE_BRANCHING", 8);
const PERF_WIDE_LEVELS = readPositiveInt("PERF_WIDE_LEVELS", 5);
const PERF_INCLUDE_HUGE = ["1", "true", "yes"].includes((process.env.PERF_INCLUDE_HUGE ?? "").toLowerCase());

const PERF_HUGE_DEEP_DEPTH = PERF_INCLUDE_HUGE ? readPositiveInt("PERF_HUGE_DEEP_DEPTH", 250_000) : 0;
const PERF_HUGE_WIDE_BRANCHING = PERF_INCLUDE_HUGE ? readPositiveInt("PERF_HUGE_WIDE_BRANCHING", 12) : 0;
const PERF_HUGE_WIDE_LEVELS = PERF_INCLUDE_HUGE ? readPositiveInt("PERF_HUGE_WIDE_LEVELS", 5) : 0;

const deepFixture = buildDeepTree(PERF_DEEP_DEPTH);
const deepNodeCount = PERF_DEEP_DEPTH + 1;
const wideTree = buildWideTree(PERF_WIDE_BRANCHING, PERF_WIDE_LEVELS);
const expectedWideNodes = expectedWideNodeCount(PERF_WIDE_BRANCHING, PERF_WIDE_LEVELS);

let hugeDeepFixture: ReturnType<typeof buildDeepTree> | undefined;
let hugeDeepNodeCount = 0;
let hugeWideTree: ReturnType<typeof buildWideTree> | undefined;
let expectedHugeWideNodes = 0;

if (PERF_INCLUDE_HUGE) {
  hugeDeepFixture = buildDeepTree(PERF_HUGE_DEEP_DEPTH);
  hugeDeepNodeCount = PERF_HUGE_DEEP_DEPTH + 1;
  hugeWideTree = buildWideTree(PERF_HUGE_WIDE_BRANCHING, PERF_HUGE_WIDE_LEVELS);
  expectedHugeWideNodes = expectedWideNodeCount(PERF_HUGE_WIDE_BRANCHING, PERF_HUGE_WIDE_LEVELS);
}

assert(deepFixture.tree.all().length === PERF_DEEP_DEPTH, "deep fixture node count mismatch");
assert(countTraversal(wideTree, "breadthFirst") === expectedWideNodes, "wide fixture node count mismatch");

if (PERF_INCLUDE_HUGE) {
  assert(hugeDeepFixture !== undefined, "huge deep fixture must exist");
  assert(hugeWideTree !== undefined, "huge wide fixture must exist");

  assert(hugeDeepFixture.tree.all().length === PERF_HUGE_DEEP_DEPTH, "huge deep fixture node count mismatch");
  assert(countTraversal(hugeWideTree, "breadthFirst") === expectedHugeWideNodes, "huge wide fixture node count mismatch");
}

let sink = 0;

const bench = new Bench({
  name: "tree-structure-ts perf",
  time: PERF_TIME_MS,
  warmupTime: PERF_WARMUP_MS,
});

bench.add("deep getPath", () => {
  sink += deepFixture.deepest.getPath().length;
});

bench.add("deep all", () => {
  sink += deepFixture.tree.all().length;
});

bench.add("deep traverse breadthFirst", () => {
  sink += countTraversal(deepFixture.tree, "breadthFirst");
});

bench.add("deep traverse depthFirst", () => {
  sink += countTraversal(deepFixture.tree, "depthFirst");
});

bench.add("deep traverse preOrder", () => {
  sink += countTraversal(deepFixture.tree, "preOrder");
});

bench.add("deep traverse postOrder", () => {
  sink += countTraversal(deepFixture.tree, "postOrder");
});

bench.add("wide all", () => {
  sink += wideTree.all().length;
});

bench.add("wide traverse breadthFirst", () => {
  sink += countTraversal(wideTree, "breadthFirst");
});

bench.add("wide traverse postOrder", () => {
  sink += countTraversal(wideTree, "postOrder");
});

if (PERF_INCLUDE_HUGE) {
  assert(hugeDeepFixture !== undefined, "huge deep fixture must exist");
  assert(hugeWideTree !== undefined, "huge wide fixture must exist");

  bench.add("huge traverse depthFirst", () => {
    sink += countTraversal(hugeDeepFixture.tree, "depthFirst");
  });

  bench.add("huge traverse postOrder", () => {
    sink += countTraversal(hugeDeepFixture.tree, "postOrder");
  });

  bench.add("huge wide traverse breadthFirst", () => {
    sink += countTraversal(hugeWideTree, "breadthFirst");
  });

  bench.add("huge wide traverse postOrder", () => {
    sink += countTraversal(hugeWideTree, "postOrder");
  });
}

bench.add("build deep tree", () => {
  sink += buildDeepTree(PERF_DEEP_DEPTH).deepest.value;
});

bench.add("build wide tree", () => {
  const built = buildWideTree(PERF_WIDE_BRANCHING, PERF_WIDE_LEVELS);
  sink += built.root!.children.length;
});

console.log("Tree Performance Benchmark");
console.log(`PERF_TIME_MS=${PERF_TIME_MS}`);
console.log(`PERF_WARMUP_MS=${PERF_WARMUP_MS}`);
console.log(`PERF_DEEP_DEPTH=${PERF_DEEP_DEPTH}`);
console.log(`PERF_WIDE_BRANCHING=${PERF_WIDE_BRANCHING}`);
console.log(`PERF_WIDE_LEVELS=${PERF_WIDE_LEVELS}`);
console.log(`PERF_INCLUDE_HUGE=${PERF_INCLUDE_HUGE}`);

if (PERF_INCLUDE_HUGE) {
  console.log(`PERF_HUGE_DEEP_DEPTH=${PERF_HUGE_DEEP_DEPTH}`);
  console.log(`PERF_HUGE_WIDE_BRANCHING=${PERF_HUGE_WIDE_BRANCHING}`);
  console.log(`PERF_HUGE_WIDE_LEVELS=${PERF_HUGE_WIDE_LEVELS}`);
}

console.log(`deepNodeCount=${deepNodeCount}`);
console.log(`wideNodeCount=${expectedWideNodes}`);

if (PERF_INCLUDE_HUGE) {
  console.log(`hugeDeepNodeCount=${hugeDeepNodeCount}`);
  console.log(`hugeWideNodeCount=${expectedHugeWideNodes}`);
}

console.log("");

await bench.run();

console.table(bench.table());
console.log(`\nSink: ${sink}`);
