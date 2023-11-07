import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {Box, Drawer, Fab, Toolbar, useMediaQuery, useTheme} from '@mui/material'
import {useLocation} from 'react-router-dom'
import Tree, {TreeProps} from '../Tree.tsx'
import useOpen from '../useOpen.ts'
import children from './children'
import Component from './Component.mdx'
import Navi from './Navi.tsx'

const tree: TreeProps = {
  Component,
  children,
}

const width = 240

export default function 讲义() {
  const [open, show, hide] = useOpen()
  const list = <Navi {...tree} path={[decodeURIComponent(useLocation().pathname.split('/')[1])]}/>
  return (
    <>
      <Box display="none" displayPrint="block">
        <Tree {...tree}/>
      </Box>
      <Box position="absolute" right={0} width={{xs: '100%', xl: `calc(100% - ${width}px)`}} displayPrint="none">
        <Box
          position="fixed"
          top={0}
          left={0}
          height="100%"
          overflow="auto"
          width={{xs: 0, xl: width}}
        >
          <Toolbar/>
          {list}
        </Box>
        <Fab
          onClick={show}
          sx={{
            position: 'fixed',
            bottom: '50%',
            left: 0,
            transform: 'translateX(-75%)',
            display: {xs: 'flex', xl: 'none'},
          }}
        >
          <ArrowRightIcon sx={{transform: 'translateX(75%)'}}/>
        </Fab>
        <Drawer open={useMediaQuery(useTheme().breakpoints.down('xl')) && open} onClose={hide} PaperProps={{onClick: hide, sx: {width}}}>
          {list}
        </Drawer>
        <Tree {...tree} main/>
      </Box>
    </>
  )
}
