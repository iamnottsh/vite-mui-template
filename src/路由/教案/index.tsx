import Tree, {TreeProps} from '../Tree.tsx'

async function im(dir: string[]): Promise<TreeProps> {
  const node = await import(`./${dir.join('/')}/index.mdx`)
  const {children} = node
  return {Component: node.default, children: children && await Promise.all(children.map(async (value: string) => [value, await im(dir.concat(value))]))}
}

const tree = await im(['有效流'])

export default function 教案() {
  return <Tree {...tree} main/>
}
