import { Stack, Avatar, Typography } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function UserCard({item:{id,firstName,lastName}}) {
  const Navigate = useNavigate()
  return (
    <Stack
    className = "usercard"
    direction="row"
    padding={2}
    spacing={2}
    sx={{py:1}}
    onClick ={()=>Navigate(`/${id}/${firstName} ${lastName}`)}
    >
    <Avatar
    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${firstName}${lastName}.svg`}
    sx={{width:"32px",height:"32px"}}
    />
    <Typography variant='subtitle2'>{firstName} {lastName}</Typography>
    </Stack>
  )
}

export default UserCard