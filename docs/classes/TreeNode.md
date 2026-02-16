[**@itpropro/tree-structure-ts**](../README.md)

***

[@itpropro/tree-structure-ts](../globals.md) / TreeNode

# Class: TreeNode\<T\>

Defined in: [TreeNode.ts:4](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L4)

Represents a node in a tree structure.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new TreeNode**\<`T`\>(`value`, `parent?`): `TreeNode`\<`T`\>

Defined in: [TreeNode.ts:33](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L33)

Creates a new TreeNode instance.

#### Parameters

##### value

`T`

The value of the node.

##### parent?

The parent of the node.

`TreeNode`\<`T`\> | `null`

#### Returns

`TreeNode`\<`T`\>

## Properties

### value

> **value**: `T`

Defined in: [TreeNode.ts:8](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L8)

The value of the node.

## Accessors

### children

#### Get Signature

> **get** **children**(): readonly `TreeNode`\<`T`\>[]

Defined in: [TreeNode.ts:17](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L17)

The children of the node.

##### Returns

readonly `TreeNode`\<`T`\>[]

***

### parent

#### Get Signature

> **get** **parent**(): `TreeNode`\<`T`\> \| `null`

Defined in: [TreeNode.ts:24](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L24)

The parent of the node.

##### Returns

`TreeNode`\<`T`\> \| `null`

## Methods

### addChild()

> **addChild**(`value`): `TreeNode`\<`T`\>

Defined in: [TreeNode.ts:44](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L44)

Adds a child node to the current node.

#### Parameters

##### value

`T`

The value of the child node.

#### Returns

`TreeNode`\<`T`\>

The new child node.

***

### all()

> **all**(): `TreeNode`\<`T`\>[]

Defined in: [TreeNode.ts:54](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L54)

Gets all nodes in the tree below the current node.

#### Returns

`TreeNode`\<`T`\>[]

An array of TreeNode instances.

***

### getPath()

> **getPath**(): `TreeNode`\<`T`\>[]

Defined in: [TreeNode.ts:78](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L78)

Gets the path from the root node to the current node.

#### Returns

`TreeNode`\<`T`\>[]

An array of TreeNode instances.

***

### hasChildren()

> **hasChildren**(): `boolean`

Defined in: [TreeNode.ts:93](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L93)

Checks if the current node has any child nodes.

#### Returns

`boolean`

`true` if the node has children, `false` otherwise.

***

### hasSiblings()

> **hasSiblings**(): `boolean`

Defined in: [TreeNode.ts:101](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L101)

Checks if the current node has any siblings.

#### Returns

`boolean`

`true` if the node has siblings, `false` otherwise.

***

### isRoot()

> **isRoot**(): `boolean`

Defined in: [TreeNode.ts:109](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L109)

Checks if the current node is the root node.

#### Returns

`boolean`

`true` if the node is the root node, `false` otherwise.

***

### remove()

> **remove**(): `TreeNode`\<`T`\> \| `null`

Defined in: [TreeNode.ts:117](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L117)

Removes the current node from the tree.

#### Returns

`TreeNode`\<`T`\> \| `null`

The new current node after removing the current node.

***

### traverse()

> **traverse**(`callback`, `traversal`): `void`

Defined in: [TreeNode.ts:134](https://github.com/itpropro/tree-structure-ts/blob/4483285b189e8de68bbdf3da155711dff9ccb8ed/src/TreeNode.ts#L134)

Traverses the tree starting from the current node.

#### Parameters

##### callback

(`node`) => `void`

A function to be called for each visited node.

##### traversal

`true` to traverse the tree in depth-first order, `false` for breadth-first order.

`"breadthFirst"` | `"depthFirst"` | `"preOrder"` | `"postOrder"`

#### Returns

`void`
