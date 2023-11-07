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
          <Navi {...tree} path={[decodeURIComponent(useLocation().pathname.split('/')[1])]}/>
        </Box>
        <Tree {...tree} main/>
      </Box>
    </>
  )
}
