import {Container, Drawer, List, ListItemButton, ListItemText, Toolbar} from '@mui/material'
import BananaSlug from 'github-slugger'
import {ComponentType, Dispatch, MouseEvent, useEffect, useRef, useState} from 'react'
import {Route, Routes} from 'react-router-dom'

interface ItemProps {
  title: string
  id: string
  level: number
}

function Item({title, id, level, current, setCurrent}: ItemProps & {current: string, setCurrent: Dispatch<string>}) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
    ref.current?.click()
  }
  return (
    <ListItemButton selected={current === id} href={`#${id}`} ref={ref} onClick={() => setCurrent(id)}>
      <ListItemText primary={title} primaryTypographyProps={{noWrap: true, onClick}} sx={{pl: (level - 1) << 1}}/>
    </ListItemButton>
  )
}

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

export default function Tree({Component, children}: TreeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [toc, setToc] = useState<ItemProps[]>()
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
  const [current, setCurrent] = useState(decodeURIComponent(location.hash.substring(1)))
  return (
    <Routes>
      <Route index element={
        <Container sx={{my: 4}} maxWidth="md" ref={ref}>
          <Component/>
          <Drawer
            anchor="right"
            open
            variant="permanent"
            sx={{displayPrint: 'none'}}
            PaperProps={{
              sx: {zIndex: 0, width: {xs: 0, lg: 144, xl: 288}},
            }}
          >
            <Toolbar/>
            <List>
              {toc?.map(({title, id, level}) => <Item key={id} title={title} id={id} level={level} current={current} setCurrent={setCurrent}/>)}
            </List>
          </Drawer>
        </Container>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
