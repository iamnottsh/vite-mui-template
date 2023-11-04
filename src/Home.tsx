import {Box, Button, Container, Typography} from '@mui/material'

export default function Home() {
  return (
    <Container sx={{my: 16, textAlign: 'center'}}>
      <Typography variant="h2" paragraph>模板网站</Typography>
      <Typography variant="subtitle2" paragraph>Vite + React + TS + SWC + MUI + React Router</Typography>
      <Box sx={{'& .MuiButton-root': {mx: 1}}}>
        <Button size="large" variant="contained" href="打卡">立即上手</Button>
        <Button size="large" variant="outlined" href="https://github.com/iamnottsh/vite-mui-template" target="_blank" rel="noreferrer">Github</Button>
      </Box>
    </Container>
  )
}
