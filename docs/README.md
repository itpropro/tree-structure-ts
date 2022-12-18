@itpropro/tree-structure-ts / [Exports](modules.md)

# @itpropro/tree-structure-ts

[![npm (scoped)](https://img.shields.io/npm/v/@itpropro/tree-structure-ts)](https://www.npmjs.com/package/@itpropro/tree-structure-ts)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@itpropro/tree-structure-ts)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/itpropro/tree-structure-ts/ci.yml?branch=main)
![Code Coverage](https://img.shields.io/badge/coverage->95%25-green)

## Introduction

This module helps interacting with `Tree` structures in TypeScript. It is optimized to work with big trees without causing overflows. Therefore it doesn't use recursion and the implementations for `preOrder` and `postOrder` traversals use `Promise.all` for concurrency to traverse multiple nodes at ones.
It is fully typed and has over 95% test coverage.

🚀 Zero dependency<br>
🏷️ Fully typed<br>
✨ Optimized for big trees<br>
🚧 No recursion -> no memory overflows<br>
🤏 Small bundle size<br>

## Installation

To install the module, run the following command:

```bash
pnpm install @itpropro/tree-structure-ts
```

## Usage

To create a new `Tree` instance, use the `Tree` constructor:

```typescript
const tree = new Tree('root')
const root = tree.root
```

To add a child node to a TreeNode, use the addChild method:

```typescript
const child1 = root.addChild('child1')
const child2 = root.addChild('child2')
```

To get all nodes in the tree below a TreeNode, use the all method:

```typescript
const nodes = root.all()
```

To traverse a tree, use the traverse method:

```typescript
root.traverse((node) => {
  // This function is called for each node in the tree
})
```

You can specify the traversal order by passing one of the following values to the traverse method:

- breadthFirst (the default): visits nodes in breadth-first order
- depthFirst: visits nodes in depth-first order
- preOrder: visits the current node, then traverses the left subtree, then traverses the right subtree
- postOrder: traverses the left subtree, then traverses the right subtree, then visits the current node

for all avalaible methods and fields, please read the detailed documentation of the `Tree` and `TreeNode` class: [Class docs](https://github.com/itpropro/tree-structure-ts/blob/main/docs/modules.md).

## Contribution

See [Contributing Guide](https://github.com/itpropro/tree-structure-ts/blob/main/CONTRIBUTING.md).

## License

Made with :heart:

Published under [MIT License](./LICENCE).
