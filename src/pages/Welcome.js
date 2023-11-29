import React from 'react'
import {Stack,Typography} from '@mui/material'

function Welcome() {
  return (
    <Stack
     justifyContent="center"
     alignItems="center"
     flexGrow={1}
    >
        <Typography variant='h2'>Welcome to teams</Typography>
    </Stack>
  )
}

export default Welcome