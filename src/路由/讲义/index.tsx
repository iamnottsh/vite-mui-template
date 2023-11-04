import Tree, {TreeProps} from '../Tree.tsx'
import children from './children'
import Component from './Component.mdx'

const tree: TreeProps = {
  Component,
  children,
}

export default function 讲义() {
  return <Tree {...tree}/>
}
