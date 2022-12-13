[@itpropro/tree-structure-ts](../README.md) / [Exports](../modules.md) / Tree

# Class: Tree<T\>

Represents a tree data structure.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](Tree.md#constructor)

### Properties

- [root](Tree.md#root)

### Methods

- [all](Tree.md#all)
- [traverse](Tree.md#traverse)

## Constructors

### constructor

• **new Tree**<`T`\>(`value`)

Creates a new `Tree` instance.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to initialize the root node with. |

#### Defined in

Tree.ts:16

## Properties

### root

• **root**: ``null`` \| [`TreeNode`](TreeNode.md)<`T`\>

The root node of the tree.

#### Defined in

Tree.ts:10

## Methods

### all

▸ **all**(): [`TreeNode`](TreeNode.md)<`T`\>[]

Returns all the nodes of the tree in an array.

#### Returns

[`TreeNode`](TreeNode.md)<`T`\>[]

#### Defined in

Tree.ts:70

___

### traverse

▸ **traverse**(`callback`, `traversal`): `undefined` \| `Promise`<`void`[]\>

Traverses the tree using the specified traversal method,
calling the provided callback function on each visited node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`node`: [`TreeNode`](TreeNode.md)<`T`\>) => `void` | A function to call on each visited node. |
| `traversal` | ``"breadthFirst"`` \| ``"depthFirst"`` \| ``"preOrder"`` \| ``"postOrder"`` | The traversal method to use. Can be one of: 'breadthFirst', 'depthFirst', 'preOrder', 'postOrder'. |

#### Returns

`undefined` \| `Promise`<`void`[]\>

#### Defined in

Tree.ts:27
