import { describe, expect, it } from 'vitest'
import type { TreeNode } from '../src/TreeNode'
import { Tree } from '../src/Tree'

describe('treeClass', () => {
  describe('class', () => {
    it('should be defined', () => {
      expect(Tree).toBeDefined()
    })

    it('should instantiate', () => {
      const tree = new Tree('test')
      expect(tree).toBeDefined()
    })
  })

  describe('Tree', () => {
    it('can have different node types', () => {
      const stringTree = new Tree('root')
      expect(stringTree.root?.value).toBe('root')
      expect(stringTree.root?.value).toBeTypeOf('string')

      const numberTree = new Tree(1)
      expect(numberTree.root?.value).toBe(1)
      expect(numberTree.root?.value).toBeTypeOf('number')

      const objectTree = new Tree({ test: 1 })
      expect(objectTree.root?.value).toStrictEqual({ test: 1 })
      expect(objectTree.root?.value).toBeTypeOf('object')
    })

    it('traverse breadthFirst', () => {
      const tree = new Tree('root')
      const root = tree.root
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      nodeB?.addChild('c')
      const nodes: String[][] = []
      tree.traverse((node) => {
        const path = node.getPath()
        const values = path.map(elem => elem.value)
        nodes.push(values)
      }, 'breadthFirst')
      expect(nodes.length).toBe(4)
      expect(nodes[0]).toStrictEqual(['root'])
      expect(nodes[1]).toStrictEqual(['root', 'a'])
      expect(nodes[2]).toStrictEqual(['root', 'a', 'b'])
      expect(nodes[3]).toStrictEqual(['root', 'a', 'b', 'c'])
    })

    it('traverse depthFirst', () => {
      const tree = new Tree('root')
      const root = tree.root
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      nodeB?.addChild('c')
      const nodes: String[][] = []
      tree.traverse((node) => {
        const path = node.getPath()
        const values = path.map(elem => elem.value)
        nodes.push(values)
      }, 'depthFirst')
      expect(nodes.length).toBe(4)
      expect(nodes[0]).toStrictEqual(['root'])
      expect(nodes[1]).toStrictEqual(['root', 'a'])
      expect(nodes[2]).toStrictEqual(['root', 'a', 'b'])
      expect(nodes[3]).toStrictEqual(['root', 'a', 'b', 'c'])
    })

    it('traverse postOrder', () => {
      const tree = new Tree('root')
      const root = tree.root
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      nodeB?.addChild('c')
      const nodes: String[][] = []
      tree.traverse((node) => {
        const path = node.getPath()
        const values = path.map(elem => elem.value)
        nodes.push(values)
      }, 'postOrder')
      expect(nodes.length).toBe(4)
      expect(nodes[3]).toStrictEqual(['root'])
      expect(nodes[2]).toStrictEqual(['root', 'a'])
      expect(nodes[1]).toStrictEqual(['root', 'a', 'b'])
      expect(nodes[0]).toStrictEqual(['root', 'a', 'b', 'c'])
    })

    it('traverse preOrder', () => {
      const tree = new Tree('root')
      const root = tree.root
      const nodeA = root?.addChild('a')
      const nodeB = nodeA?.addChild('b')
      nodeB?.addChild('c')
      const nodes: String[][] = []
      tree.traverse((node) => {
        const path = node.getPath()
        const values = path.map(elem => elem.value)
        nodes.push(values)
      }, 'preOrder')
      expect(nodes.length).toBe(4)
      expect(nodes[0]).toStrictEqual(['root'])
      expect(nodes[1]).toStrictEqual(['root', 'a'])
      expect(nodes[2]).toStrictEqual(['root', 'a', 'b'])
      expect(nodes[3]).toStrictEqual(['root', 'a', 'b', 'c'])
    })

    it('all', () => {
      const tree = new Tree('root')
      const root = tree.root
      const nodeA = root?.addChild('a')
      const nodeB = root?.addChild('b')
      const nodeC = nodeB?.addChild('c')
      const nodeD = nodeC?.addChild('d')
      const nodeE = nodeC?.addChild('e')
      const nodeF = nodeD?.addChild('f')
      const all = tree.all()

      expect(all.includes(nodeA as TreeNode<string>)).toBeTruthy()
      expect(all.includes(nodeB as TreeNode<string>)).toBeTruthy()
      expect(all.includes(nodeC as TreeNode<string>)).toBeTruthy()
      expect(all.includes(nodeD as TreeNode<string>)).toBeTruthy()
      expect(all.includes(nodeE as TreeNode<string>)).toBeTruthy()
      expect(all.includes(nodeF as TreeNode<string>)).toBeTruthy()
    })
  })
})
