import {Box, Toolbar} from '@mui/material'
import {useLocation} from 'react-router-dom'
import Tree, {TreeProps} from '../Tree.tsx'
import children from './children'
import Component from './Component.mdx'
import Navi from './Navi.tsx'

const tree: TreeProps = {
  Component,
  children,
}

const width = 240

export default function 讲义() {
  return (
    <>
      <Box display="none" displayPrint="block">
        <Tree {...tree}/>
      </Box>
      <Box left={width} width={{xs: '100%', md: `calc(100% - ${width}px)`}} displayPrint="none">
        <Box
          position="fixed"
          top={0}
          left={0}
          height="100%"
          overflow="auto"
          width={{xs: 0, md: width}}
        >
          <Toolbar/>
          <Navi {...tree} path={useLocation().pathname.split('/').slice(1, 2)}/>
        </Box>
        <Tree {...tree}/>
      </Box>
    </>
  )
}
