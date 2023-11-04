import {Box, Button, ButtonGroup, Typography} from '@mui/material'

export default function Home() {
  return (
    <Box my={20} textAlign="center">
      <Typography variant="h1" paragraph>模板网站</Typography>
      <Typography variant="subtitle1" paragraph>Vite + React + TS + SWC + MUI + React Router</Typography>
      <ButtonGroup size="large">
        <Button variant="contained" href="打卡">立即上手</Button>
        <Button href="https://github.com/iamnottsh/vite-mui-template" target="_blank" rel="noreferrer">Github</Button>
      </ButtonGroup>
    </Box>
  )
}
