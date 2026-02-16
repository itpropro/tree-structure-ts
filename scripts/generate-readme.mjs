import { writeFile } from 'node:fs/promises'
import { md } from 'mdbox'

const packageName = '@itpropro/tree-structure-ts'
const packageDocsUrl = 'https://github.com/itpropro/tree-structure-ts/blob/main/docs/modules.md'

const badges = [
  md.link(
    'https://www.npmjs.com/package/@itpropro/tree-structure-ts',
    md.image('https://img.shields.io/npm/v/@itpropro/tree-structure-ts', 'npm (scoped)'),
  ),
  md.image('https://img.shields.io/bundlephobia/min/@itpropro/tree-structure-ts', 'npm bundle size (scoped)'),
  md.link(
    'https://github.com/itpropro/tree-structure-ts/actions/workflows/ci.yml',
    md.image('https://github.com/itpropro/tree-structure-ts/actions/workflows/ci.yml/badge.svg', 'ci'),
  ),
  md.image('https://img.shields.io/badge/coverage->95%25-green', 'Code Coverage'),
]

const contentBlocks = [
  md.heading(packageName, 1).trim(),
  badges.join('\n'),
  md.heading('Introduction', 2).trim(),
  "This module helps interacting with `Tree` structures in TypeScript. It is optimized to work with big trees without causing overflows. Therefore it doesn't use recursion and the implementations for `preOrder` and `postOrder` traversals use `Promise.all` for concurrency to traverse multiple nodes at once.",
  'It is fully typed and has over 95% test coverage.',
  md.list([
    'Zero dependency',
    'Fully typed',
    'Optimized for big trees',
    'No recursion -> no memory overflows',
    'Small bundle size',
  ]),
  md.heading('Quick Start', 2).trim(),
  md.heading('Installation', 3).trim(),
  'To install the module, run the following command:',
  md.codeBlock(
    [
      '# bun',
      'bun add @itpropro/tree-structure-ts',
      '',
      '# npm',
      'npm install @itpropro/tree-structure-ts',
      '',
      '# yarn',
      'yarn add @itpropro/tree-structure-ts',
    ].join('\n'),
    'bash',
  ),
  md.heading('Import', 3).trim(),
  md.codeBlock(
    [
      '// ESM / TypeScript',
      "import { Tree } from '@itpropro/tree-structure-ts'",
      "import type { TreeNode } from '@itpropro/tree-structure-ts'",
    ].join('\n'),
    'typescript',
  ),
  md.heading('Usage', 2).trim(),
  'To create a new `Tree` instance, use the `Tree` constructor:',
  md.codeBlock(
    [
      "const tree = new Tree('root')",
      'const root = tree.root',
    ].join('\n'),
    'typescript',
  ),
  'To add a child node to a TreeNode, use the `addChild` method:',
  md.codeBlock(
    [
      "const child1 = root.addChild('child1')",
      "const child2 = root.addChild('child2')",
    ].join('\n'),
    'typescript',
  ),
  'To get all nodes in the tree below a TreeNode, use the `all` method:',
  md.codeBlock('const nodes = root.all()', 'typescript'),
  'To traverse a tree, use the `traverse` method:',
  md.codeBlock(
    [
      'root.traverse((node) => {',
      '  // This function is called for each node in the tree',
      '})',
    ].join('\n'),
    'typescript',
  ),
  'You can specify the traversal order by passing one of the following values to the `traverse` method:',
  md.list([
    'breadthFirst (the default): visits nodes in breadth-first order',
    'depthFirst: visits nodes in depth-first order',
    'preOrder: visits the current node, then traverses the left subtree, then traverses the right subtree',
    'postOrder: traverses the left subtree, then traverses the right subtree, then visits the current node',
  ]),
  `For all available methods and fields, please read the detailed documentation of the \`Tree\` and \`TreeNode\` classes: ${md.link(packageDocsUrl, 'Class docs')}.`,
  md.heading('Contribution', 2).trim(),
  `See ${md.link('https://github.com/itpropro/tree-structure-ts/blob/main/CONTRIBUTING.md', 'Contributing Guide')}.`,
  md.heading('License', 2).trim(),
  'Made with :heart:',
  `Published under ${md.link('./LICENSE', 'MIT License')}.`,
]

const readme = `${contentBlocks.join('\n\n')}\n`

await writeFile(new URL('../README.md', import.meta.url), readme, 'utf8')

console.log('README.md generated successfully')
