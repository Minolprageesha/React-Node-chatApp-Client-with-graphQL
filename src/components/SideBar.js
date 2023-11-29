import React from 'react'
import {Box,Divider,Typography,Stack} from '@mui/material'
import UserCard from './UserCard'
import LogoutIcon from '@mui/icons-material/Logout';
import {useQuery} from '@apollo/client';
import { GET_USERS } from '../graphql/queries';

function SideBar({setloggedIn} ) {
  const {loading,data,error} = useQuery(GET_USERS)

  if(loading) return <Typography variant='h6'>Loading Chats</Typography>
  if(data){
    
  }
  if(error){
    console.log(error.message);
  }

  return (
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    maxWidth="250px"
    padding="30px"
    >
    <Stack direction="row" justifyContent="space-between">
    <Typography variant='h6'>Chat</Typography>
    <LogoutIcon onClick={()=>{
      localStorage.removeItem('jwt')
      setloggedIn(false)
    }}
      />
    </Stack>
    <Divider/>
    {
        data.users.map(item=>{
            return <UserCard key={item.id} item={item} />
        })
    }
    </Box>
  )
}

export default SideBar