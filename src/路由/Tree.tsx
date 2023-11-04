import {Grid} from '@mui/material'
import {ComponentType} from 'react'
import {Route, Routes} from 'react-router-dom'

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

export default function Tree({Component, children}: TreeProps) {
  return (
    <Routes>
      <Route index element={
        <Grid container>
          <Grid item md={10}>
            <Component/>
          </Grid>
          <Grid item md={2}>
            目录
          </Grid>
        </Grid>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
