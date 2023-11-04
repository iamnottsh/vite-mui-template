import {Container, Drawer, List, ListItem, ListItemText, Toolbar} from '@mui/material'
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
        <Container sx={{my: 4}}>
          <Component/>
          <Drawer anchor="right" open variant="permanent" sx={{displayPrint: 'none', '& .MuiPaper-root': {zIndex: 0}}}>
            <Toolbar/>
            <List>
              <ListItem>
                <ListItemText primary="目录"/>
              </ListItem>
            </List>
          </Drawer>
        </Container>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
