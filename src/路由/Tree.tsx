import {Container, Drawer, List, ListItem, ListItemText, Toolbar} from '@mui/material'
import BananaSlug from 'github-slugger'
import {ComponentType, useEffect, useRef, useState} from 'react'
import {Route, Routes} from 'react-router-dom'

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

export default function Tree({Component, children}: TreeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [toc, setToc] = useState<{title: string, id: string, level: number}[]>()
  useEffect(() => {
    const {current} = ref
    if (!current) return
    const slugger = new BananaSlug()
    setToc(Array.from(current.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(value => {
      const title = value.textContent ?? '', id = slugger.slug(title)
      value.id = id
      return {title, id, level: Number(value.tagName.substring(1))}
    }))
  }, [ref])
  return (
    <Routes>
      <Route index element={
        <Container sx={{my: 4}} maxWidth="md" ref={ref}>
          <Component/>
          <Drawer anchor="right" open variant="permanent" sx={{displayPrint: 'none'}} PaperProps={{sx: {zIndex: 0, width: {xs: 0, lg: 144, xl: 288}}}}>
            <Toolbar/>
            <List>
              {toc?.map(({title, id, level}) =>
                <ListItem key={id}>
                  <ListItemText primary={title} primaryTypographyProps={{component: 'a', href: `#${id}`, noWrap: true}} sx={{pl: (level - 1) << 1}}/>
                </ListItem>)}
            </List>
          </Drawer>
        </Container>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
