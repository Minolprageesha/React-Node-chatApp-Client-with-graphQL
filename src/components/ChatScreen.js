import React,{useState} from 'react'
import {useParams} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar, TextField} from '@mui/material'
import MessageCard from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/system';
import { SEND_MSG } from '../graphql/mutations';
import { MSG_SUB } from '../graphql/subscriptions';

function ChatScreen() {
  const {id,name} = useParams()
  const [text, settext] = useState("")
  const [messages, setmessages] = useState([])
  const {data,loading,error} = useQuery(GET_MESSAGES,{
    variables:{
      receiverId: +id
    },
    onCompleted(data){
      setmessages(data.massagesByUser)
    }
  }) 
  const [sendMassage] = useMutation(SEND_MSG,{
    onCompleted(data){
      setmessages((prevMessages) => [...prevMessages,data.createMassage] )
    }
  })

  const {data:subData} = useSubscription(MSG_SUB,{
    onSubscriptionData({subscriptionData:{data}}){
      setmessages((prevMessages) =>[...prevMessages,data.messageAdded])
    }
  }) 


  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Avatar
        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}.svg`}
        sx={{width:"32px",height:"32px", mr:2}}/>
        <Typography variant="h6"> {name} </Typography>
      </Toolbar>
    </AppBar>
    <Box backgroundColor="#f5f5f5" height="80vh" padding="50px" sx={{overflowY:"auto"}}>
      {loading?<Typography variant='h6'>loading chats</Typography>:
      messages.map(msg=>{
        return  <MessageCard key={msg.createdAt} text={msg.text} date={msg.createdAt} direction ={msg.receiverId ==+id ? "end": "start"} />
      })}
    </Box>
    <Stack direction="row">
    <TextField
    placeholder='Enter a message'
    variant="standard"
    fullWidth
    multiline
    rows={2}
    value = {text}
    onChange={e=>settext(e.target.value)}/>
    <SendIcon fontSize='large' onClick ={()=>{sendMassage({
      variables:{
        receiverId:+id,
        text:text
      }
    })}}/>
    </Stack>
  </Box>
  )
}

export default ChatScreen