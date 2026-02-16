[**@itpropro/tree-structure-ts**](../README.md)

***

[@itpropro/tree-structure-ts](../globals.md) / Tree

# Class: Tree\<T\>

Defined in: [Tree.ts:6](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/Tree.ts#L6)

Represents a tree data structure.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Tree**\<`T`\>(`value`): `Tree`\<`T`\>

Defined in: [Tree.ts:16](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/Tree.ts#L16)

Creates a new `Tree` instance.

#### Parameters

##### value

`T`

The value to initialize the root node with.

#### Returns

`Tree`\<`T`\>

## Properties

### root

> **root**: [`TreeNode`](TreeNode.md)\<`T`\> \| `null`

Defined in: [Tree.ts:10](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/Tree.ts#L10)

The root node of the tree.

## Methods

### all()

> **all**(): [`TreeNode`](TreeNode.md)\<`T`\>[]

Defined in: [Tree.ts:38](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/Tree.ts#L38)

Returns all the nodes of the tree in an array.

#### Returns

[`TreeNode`](TreeNode.md)\<`T`\>[]

***

### traverse()

> **traverse**(`callback`, `traversal`): `void`

Defined in: [Tree.ts:27](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/Tree.ts#L27)

Traverses the tree using the specified traversal method,
calling the provided callback function on each visited node.

#### Parameters

##### callback

(`node`) => `void`

A function to call on each visited node.

##### traversal

The traversal method to use. Can be one of:
'breadthFirst', 'depthFirst', 'preOrder', 'postOrder'.

`"breadthFirst"` | `"depthFirst"` | `"preOrder"` | `"postOrder"`

#### Returns

`void`
