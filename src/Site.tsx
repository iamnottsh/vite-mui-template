import MenuIcon from '@mui/icons-material/Menu'
import {AppBar, Box, Button, ButtonGroup, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {MouseEvent, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home.tsx'
import 路由 from './路由'

export default function Site() {
  const [height, setHeight] = useState<number>()
  const ref = (current: HTMLElement) => {
    if (current) setHeight(current.offsetHeight)
  }
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
              <Box sx={{display: {xs: 'flex', lg: 'none'}}}>
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
                      selected={location.pathname.split('/')[1] === encodeURIComponent(page)}
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
                {document.title}
              </Typography>
              <ButtonGroup color="inherit" sx={{display: {xs: 'none', lg: 'flex'}}}>
                {路由.map(([page]) => (
                  <Button
                    key={page}
                    href={`/${page}`}
                    onClick={handleClose}
                    sx={{fontWeight: location.pathname.split('/')[1] === encodeURIComponent(page) ? 'bold' : 'normal'}}
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
      <Box sx={{
        py: 2,
        ...height !== undefined && {
          '& :target:before': {
            display: 'block',
            content: '" "',
            height: `${height}px`,
            marginTop: `${-height}px`,
            visibility: 'hidden',
          },
        },
      }}>
        <Routes>
          <Route index element={<Home/>}/>
          {路由.map(([page, Component]) => <Route key={page} path={`${page}/*`} element={<Component/>}/>)}
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
