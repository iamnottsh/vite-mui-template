import {Divider, List, ListItemButton, ListItemText} from '@mui/material'
import {Route, Routes} from 'react-router-dom'
import {TreeProps} from '../Tree.tsx'

export default function Navi({children, path}: TreeProps & {path: string[]}) {
  return (
    <Routes>
      <Route index element={
        <List>
          <ListItemButton component="a" href={`/${path.slice(0, path.length - 1).join('/')}`}>
            <ListItemText primary="返回"/>
          </ListItemButton>
          <Divider/>
          {children?.map(([page]) =>
            <ListItemButton key={page} component="a" href={`/${path.concat(page).join('/')}`}>
              <ListItemText primary={page}/>
            </ListItemButton>)}
        </List>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Navi {...node} path={path.concat(page)}/>}/>)}
    </Routes>
  )
}
