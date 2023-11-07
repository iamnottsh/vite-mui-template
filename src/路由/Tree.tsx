import {ComponentType} from 'react'
import {Route, Routes} from 'react-router-dom'
import Markdown from './Markdown.tsx'

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

export default function Tree({Component, children, main}: TreeProps & {main?: boolean}) {
  return (
    <Routes>
      <Route index element={<Markdown main={main}><Component/></Markdown>}/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node} main={main}/>}/>)}
    </Routes>
  )
}
