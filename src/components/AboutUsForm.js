import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

const AboutUsForm = () => {
  const [full_name, setFullName] = useState('');
  const [professional_email, setProfEmail] = useState('');
  const [their_message, setTheirMessage] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    fetch(`/api/client_messages`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ full_name, professional_email, their_message })
    })
    .then(r => r.json())
    
    alert("Message Received!")
  }

  return (
    <>
        <div style={{textAlign: "center", fontSize: 14, fontWeight: "bold"}}>
            <p>Leave Us A Message</p>
        </div>
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
        >
            <div style={{textAlign: "center"}}>
            <FormControl sx={{ m: 1, width: "70%" }}>
              <InputLabel htmlFor="Full Name">Full Name</InputLabel>
              <OutlinedInput
                id="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)} 
                label="Full Name"
              />
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: "70%" }}>
              <InputLabel htmlFor="Professional Email">Professional Email</InputLabel>
              <OutlinedInput
                id="professional_email"
                value={professional_email}
                onChange={(e) => setProfEmail(e.target.value)}
                label="Professional Email"
              />
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: "70%" }}>
              <InputLabel htmlFor="Message">Message</InputLabel>
              <OutlinedInput
                id="their_message"
                multiline
                rows={4}
                type="text"
                value={their_message}
                onChange={(e) => setTheirMessage(e.target.value)}
                label="Message"
              />
            </FormControl>
        </div>
        <div className='aboutBtn' style={{
            display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
            }}>
            <FormControl>
              <button style={{
                fontSize: 14,
                backgroundColor: "#4e60ff",
                width: 200,
                height: 40,
                color: "#fff",
                borderRadius: 10,
                cursor: "pointer",
                border: "none"
              }}
              >
                Submit
              </button>
            </FormControl>
        </div>
        </Box>
    </>
  )
}

export default AboutUsForm