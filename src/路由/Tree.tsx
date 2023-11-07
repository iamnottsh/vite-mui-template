import {ComponentType} from 'react'
import {Route, Routes} from 'react-router-dom'
import TreeElement from './TreeElement.tsx'

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

export default function Tree({Component, children, main}: TreeProps & {main?: boolean}) {
  return (
    <Routes>
      <Route index element={<TreeElement main={main}><Component/></TreeElement>}/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
