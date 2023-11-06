import {Box, List, ListItemButton, ListItemText, Toolbar} from '@mui/material'
import BananaSlug from 'github-slugger'
import {ComponentType, useEffect, useRef, useState} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'

export interface TreeProps {
  Component: ComponentType
  children?: [string, TreeProps][]
}

const width = 240

export default function Tree({Component, children}: TreeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [toc, setToc] = useState<[string, string, number][]>()
  useEffect(() => {
    const {current} = ref
    if (!current) return
    const slugger = new BananaSlug()
    setToc(Array.from(current.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(value => {
      const title = value.textContent ?? '', id = slugger.slug(title)
      value.id = id
      return [title, id, Number(value.tagName.substring(1))]
    }))
  }, [ref])
  const {hash} = useLocation()
  return (
    <Routes>
      <Route index element={
        <>
          <Box display="none" displayPrint="block">
            <Component/>
          </Box>
          <Box ref={ref} width={{xs: '100%', md: `calc(100% - ${width}px)`}} displayPrint="none">
            <Component/>
            <Box
              position="fixed"
              top={0}
              right={0}
              height="100%"
              overflow="auto"
              width={{xs: 0, md: width}}
            >
              <Toolbar/>
              <List>
                {toc?.map(([title, id, level]) =>
                  <ListItemButton key={id} href={`#${id}`} selected={`#${encodeURIComponent(id)}` === hash}>
                    <ListItemText primary={title} primaryTypographyProps={{noWrap: true}} sx={{pl: (level - 1) << 1}}/>
                  </ListItemButton>)}
              </List>
            </Box>
          </Box>
        </>
      }/>
      {children?.map(([page, node]) => <Route key={page} path={`${page}/*`} element={<Tree {...node}/>}/>)}
    </Routes>
  )
}
