[@itpropro/tree-structure-ts](../README.md) / [Exports](../modules.md) / TreeNode

# Class: TreeNode<T\>

Represents a node in a tree structure.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](TreeNode.md#constructor)

### Properties

- [children](TreeNode.md#children)
- [parent](TreeNode.md#parent)
- [value](TreeNode.md#value)

### Methods

- [addChild](TreeNode.md#addchild)
- [all](TreeNode.md#all)
- [getPath](TreeNode.md#getpath)
- [hasChildren](TreeNode.md#haschildren)
- [hasSiblings](TreeNode.md#hassiblings)
- [isRoot](TreeNode.md#isroot)
- [remove](TreeNode.md#remove)
- [traverse](TreeNode.md#traverse)

## Constructors

### constructor

• **new TreeNode**<`T`\>(`value`, `parent?`)

Creates a new TreeNode instance.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `T` | `undefined` | The value of the node. |
| `parent` | ``null`` \| [`TreeNode`](TreeNode.md)<`T`\> | `null` | The parent of the node. |

#### Defined in

[TreeNode.ts:25](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L25)

## Properties

### children

• **children**: [`TreeNode`](TreeNode.md)<`T`\>[]

The children of the node.

#### Defined in

[TreeNode.ts:13](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L13)

___

### parent

• **parent**: ``null`` \| [`TreeNode`](TreeNode.md)<`T`\>

The parent of the node.

#### Defined in

[TreeNode.ts:18](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L18)

___

### value

• **value**: `T`

The value of the node.

#### Defined in

[TreeNode.ts:8](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L8)

## Methods

### addChild

▸ **addChild**(`value`): [`TreeNode`](TreeNode.md)<`T`\>

Adds a child node to the current node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value of the child node. |

#### Returns

[`TreeNode`](TreeNode.md)<`T`\>

The new child node.

#### Defined in

[TreeNode.ts:36](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L36)

___

### all

▸ **all**(): [`TreeNode`](TreeNode.md)<`T`\>[]

Gets all nodes in the tree below the current node.

#### Returns

[`TreeNode`](TreeNode.md)<`T`\>[]

An array of TreeNode instances.

#### Defined in

[TreeNode.ts:46](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L46)

___

### getPath

▸ **getPath**(): [`TreeNode`](TreeNode.md)<`T`\>[]

Gets the path from the root node to the current node.

#### Returns

[`TreeNode`](TreeNode.md)<`T`\>[]

An array of TreeNode instances.

#### Defined in

[TreeNode.ts:59](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L59)

___

### hasChildren

▸ **hasChildren**(): `boolean`

Checks if the current node has any child nodes.

#### Returns

`boolean`

`true` if the node has children, `false` otherwise.

#### Defined in

[TreeNode.ts:75](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L75)

___

### hasSiblings

▸ **hasSiblings**(): `boolean`

Checks if the current node has any siblings.

#### Returns

`boolean`

`true` if the node has siblings, `false` otherwise.

#### Defined in

[TreeNode.ts:83](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L83)

___

### isRoot

▸ **isRoot**(): `boolean`

Checks if the current node is the root node.

#### Returns

`boolean`

`true` if the node is the root node, `false` otherwise.

#### Defined in

[TreeNode.ts:91](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L91)

___

### remove

▸ **remove**(): ``null`` \| [`TreeNode`](TreeNode.md)<`T`\>

Removes the current node from the tree.

#### Returns

``null`` \| [`TreeNode`](TreeNode.md)<`T`\>

The new current node after removing the current node.

#### Defined in

[TreeNode.ts:99](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L99)

___

### traverse

▸ **traverse**(`callback`, `traversal`): `void`

Traverses the tree starting from the current node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`node`: [`TreeNode`](TreeNode.md)<`T`\>) => `void` | A function to be called for each visited node. |
| `traversal` | ``"breadthFirst"`` \| ``"depthFirst"`` \| ``"preOrder"`` \| ``"postOrder"`` | `true` to traverse the tree in depth-first order, `false` for breadth-first order. |

#### Returns

`void`

#### Defined in

[TreeNode.ts:119](https://github.com/itpropro/tree-structure-ts/blob/d89204c/src/TreeNode.ts#L119)
