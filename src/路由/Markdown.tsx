import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import {Box, Container, Drawer, Fab, List, ListItemButton, ListItemText, Toolbar, useMediaQuery, useTheme} from '@mui/material'
import BananaSlug from 'github-slugger'
import {ReactNode, useEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import useOpen from './useOpen.ts'

const width = 240

export default function Markdown({children, main}: {children?: ReactNode, main?: boolean}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [toc, setToc] = useState<[string, string, number][]>()
  useEffect(() => {
    if (!main) return
    const {current} = ref
    if (!current) return
    const slugger = new BananaSlug()
    setToc(Array.from(current.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(value => {
      const title = value.textContent ?? '', id = slugger.slug(title)
      value.id = id
      return [title, id, Number(value.tagName.substring(1))]
    }))
  }, [ref, main])
  const [open, show, hide] = useOpen()
  const {hash} = useLocation()
  const list =
    <List>
      {toc?.map(([title, id, level]) =>
        <ListItemButton key={id} href={`#${id}`} selected={`#${encodeURIComponent(id)}` === hash}>
          <ListItemText primary={title} primaryTypographyProps={{noWrap: true}} sx={{pl: (level - 1) << 1}}/>
        </ListItemButton>)}
    </List>
  return (
    <>
      <Box display="none" displayPrint="block">
        {children}
      </Box>
      <Box ref={ref} width={{xs: '100%', md: `calc(100% - ${width}px)`}} displayPrint="none">
        <Container maxWidth="md">
          {children}
        </Container>
        <Box
          position="fixed"
          top={0}
          right={0}
          height="100%"
          overflow="auto"
          width={{xs: 0, md: width}}
        >
          <Toolbar/>
          {list}
        </Box>
        <Fab
          onClick={show}
          sx={{
            position: 'fixed',
            bottom: '50%',
            right: 0,
            transform: 'translateX(75%)',
            display: {xs: 'flex', md: 'none'},
          }}
        >
          <ArrowLeftIcon sx={{transform: 'translateX(-75%)'}}/>
        </Fab>
        <Drawer open={useMediaQuery(useTheme().breakpoints.down('md')) && open} anchor="right" onClose={hide} PaperProps={{onClick: hide, sx: {width}}}>
          {list}
        </Drawer>
      </Box>
    </>
  )
}
