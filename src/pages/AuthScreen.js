import React,{useRef, useState} from 'react'
import {Box,Stack,Typography,Button,TextField,Card, CircularProgress, Alert } from '@mui/material'
import { useMutation, ApolloError  } from '@apollo/client'
import { SIGNUP_USER,SIGNIN_USER } from '../graphql/mutations'

function AuthScreen({setloggedIn}) {
 const [showLogin, setShowLogin] = useState(true)
 const [formData, setFormData] = useState({})
 const authForm = useRef()
 const [signupUser,{data : signupData,loading:l1,error:e1}] =  useMutation(SIGNUP_USER)
 const [signinUser,{data : signinData,loading:l2,error:e2}] =  useMutation(SIGNIN_USER,{
     onCompleted(data){
         localStorage.setItem("jwt",data.signinUser.token)
         setloggedIn(true)
     }
 })

if(l1 || l2){
    return(
        <Box display="flex"
         justifyContent ="center"
         alignItems="center"
         height="100vh" >
             <Box textAlign="center">
             <CircularProgress/>
             <Typography variant='h6'> Authenticating.....</Typography>
             </Box>
        </Box>
    )
}


  const handleChange =(e)=>{
      setFormData({
          ...formData,
          [e.target.name]:e.target.value
      })
  }


const handleSubmit =async(e)=>{
    e.preventDefault()
  
    if(showLogin){
      try {
        // Perform signup mutation
        await signinUser({variables:{userSignin:formData}})
        // Handle successful signup
      } catch (error) {
        // Handle signup errors
        handleApolloError(error, "signup");
      }
        
    }else{
      try {
        // Perform signup mutation
        await signupUser({variables:{userNew:formData}})
        // Handle successful signup
      } catch (error) {
        // Handle signup errors
        handleApolloError(error, "signup");
      }
        
    }
}

const handleApolloError = (error, operation) => {
  console.error(`Apollo Error during ${operation}:`, error.message);

  // Handle network errors
  if (error.networkError) {
    console.error("Network Error:", error.networkError);
    // You might want to show a user-friendly message to the user
  }

  // Handle other Apollo-specific errors
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((graphQLError) => {
      console.error("GraphQL Error:", graphQLError.message);
    });
  }
};

  return (
  <Box ref={authForm}
       component="form"
       onSubmit={handleSubmit}
       display="flex"
       justifyContent="center"
       alignItems="center"
       height="80vh"
       >
    <Card
    sx={{padding:"10px"}}
    variant="outlined"
    >
      <Stack 
      spacing={2}
      direction="column"
      sx={{width:"500px"}}>
          {e1 && <Alert severity='error'>{e1.message}</Alert>}
          {e2 && <Alert severity='error'>{e2.message}</Alert>}
          {signupData && <Alert severity='success'>{signupData.signupUser.firstName}</Alert>}
          <Typography variant="h5">
              Please {showLogin?"Login":"Signup"}
          </Typography>
        {
            !showLogin && 
            <>
            <TextField
            label="First Name"
            name="firstName"
            variant="standard"
            onChange={handleChange}
            />
            <TextField
            label="Last Name"
            name="lastName"
            variant="standard"
            onChange={handleChange}
            />
        </>
        }
         
          <TextField
          type="email"
          label="Email"
          name="email"
          variant="standard"
          onChange={handleChange}
          />
          <TextField
          type="password"
          label="Password"
          name="password"
          variant="standard"
          onChange={handleChange}
          />
          <Typography textAlign="center" variant='subtitle1' 
          onClick = { ()=> {
              setShowLogin((preValue)=>!preValue);
              setFormData({});
              authForm.current.reset()
          }}
          >{showLogin?"Signup?":"Login?"}</Typography>
          <Button variant="outlined" type ="submit">{showLogin?"Login":"Signup"}</Button>
      </Stack>
      </Card>
  </Box>
  )
}

export default AuthScreen