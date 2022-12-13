import { describe, expect, it } from 'vitest'
import { TreeNode } from '../src/TreeNode'

describe('TreeNode', () => {
  describe('Class', () => {
    it('should be defined', () => {
      expect(TreeNode).toBeDefined()
    })

    it('should instantiate', () => {
      const treeNode = new TreeNode('test')
      expect(treeNode).toBeDefined()
    })
  })

  describe('TreeNode', () => {
    it('addChild', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = root?.addChild('b')
      expect(root?.children.includes(nodeA as TreeNode<string>)).toBeTruthy()
      expect(root?.children.includes(nodeB as TreeNode<string>)).toBeTruthy()
    })

    it('all', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = root?.addChild('b')
      const nodeC = nodeA?.addChild('c')
      expect(root?.all().includes(nodeA as TreeNode<string>)).toBeTruthy()
      expect(root?.all().includes(nodeB as TreeNode<string>)).toBeTruthy()
      expect(root?.all().includes(nodeC as TreeNode<string>)).toBeTruthy()
      expect(root?.all().length).toBe(3)
      expect(nodeA?.all().length).toBe(1)
      expect(nodeB?.all().length).toBe(0)
    })

    it('getPath', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const generatedPath = [root, nodeA, nodeB, nodeC]
      const path = nodeC?.getPath()
      expect(path).toStrictEqual(generatedPath)
    })

    it('hasChildren', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      expect(root?.hasChildren()).toBeTruthy()
      expect(nodeA?.hasChildren()).toBeFalsy()
    })

    it('hasSiblings', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      root?.addChild('b')
      const nodeC = nodeA?.addChild('c')
      expect(root?.hasSiblings()).toBeFalsy()
      expect(nodeA?.hasSiblings()).toBeTruthy()
      expect(nodeC?.hasSiblings()).toBeFalsy()
    })

    it('isRoot', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      expect(root?.isRoot()).toBeTruthy()
      expect(nodeA?.isRoot()).toBeFalsy()
    })

    it('remove', () => {
      const root = new TreeNode('root')
      const nodeA = root.addChild('a')
      const nodeB = root.addChild('b')
      expect(root.children.length).toBe(2)
      const newCurrentNode = nodeA.remove()
      expect(root.children.length).toBe(1)
      expect(root.children[0]).toBe(nodeB)
      expect(newCurrentNode).toBe(root)
    })

    it('traverse breadthFirst', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const nodes: TreeNode<string>[] = []
      nodeA?.traverse((node) => {
        nodes.push(node)
      }, 'breadthFirst')
      expect(nodes.length).toBe(3)
      expect(nodes[0]).toStrictEqual(nodeA)
      expect(nodes[1]).toStrictEqual(nodeB)
      expect(nodes[2]).toStrictEqual(nodeC)
    })

    it('traverse depthFirst', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const nodes: TreeNode<string>[] = []
      nodeA?.traverse((node) => {
        nodes.push(node)
      }, 'depthFirst')
      expect(nodes.length).toBe(3)
      expect(nodes[0]).toStrictEqual(nodeA)
      expect(nodes[1]).toStrictEqual(nodeB)
      expect(nodes[2]).toStrictEqual(nodeC)
    })

    it('traverse postOrder', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const nodes: TreeNode<string>[] = []
      nodeA?.traverse((node) => {
        nodes.push(node)
      }, 'postOrder')
      expect(nodes.length).toBe(3)
      expect(nodes[0]).toStrictEqual(nodeC)
      expect(nodes[1]).toStrictEqual(nodeB)
      expect(nodes[2]).toStrictEqual(nodeA)
    })

    it('traverse preOrder', () => {
      const root = new TreeNode('root')
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const nodes: TreeNode<string>[] = []
      nodeA?.traverse((node) => {
        nodes.push(node)
      }, 'preOrder')
      expect(nodes.length).toBe(3)
      expect(nodes[0]).toStrictEqual(nodeA)
      expect(nodes[1]).toStrictEqual(nodeB)
      expect(nodes[2]).toStrictEqual(nodeC)
    })
  })
})
