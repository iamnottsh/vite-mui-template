import MenuIcon from '@mui/icons-material/Menu'
import {AppBar, Box, Button, ButtonGroup, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {MouseEvent, useEffect, useRef, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home.tsx'
import 路由 from './路由'

export default function Site() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const listener = (event: Event) => {
      const {current} = ref
      if (!current) return
      const {scrollingElement} = document
      if (!scrollingElement) return
      const {target} = event
      if (!(target instanceof HTMLAnchorElement)) return
      const href = target.getAttribute('href')
      if (!href?.startsWith('#')) return
      const element = document.getElementById(decodeURIComponent(href.substring(1)))
      if (!element) return
      event.preventDefault()
      scrollingElement.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - current.clientHeight,
        left: element.offsetLeft,
      })
    }
    document.addEventListener('click', listener)
    return () => document.removeEventListener('click', listener)
  }, [ref])
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <BrowserRouter>
      <Box displayPrint="none">
        <AppBar ref={ref}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                  size="large"
                  onClick={handleOpen}
                  color="inherit"
                >
                  <MenuIcon/>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {路由.map(([page]) => (
                    <MenuItem
                      key={page}
                      component="a"
                      href={`/${page}`}
                      onClick={handleClose}
                      selected={location.pathname === `/${encodeURIComponent(page)}`}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                模板
              </Typography>
              <ButtonGroup color="inherit" sx={{display: {xs: 'none', md: 'flex'}}}>
                {路由.map(([page]) => (
                  <Button
                    key={page}
                    href={`/${page}`}
                    onClick={handleClose}
                    sx={{fontWeight: location.pathname === `/${encodeURIComponent(page)}` ? 'bold' : 'normal'}}
                  >
                    {page}
                  </Button>
                ))}
              </ButtonGroup>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar/>
      </Box>
      <Container>
        <Routes>
          <Route index element={<Home/>}/>
          {路由.map(([page, Component]) => <Route key={page} path={page} element={<Component/>}/>)}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
