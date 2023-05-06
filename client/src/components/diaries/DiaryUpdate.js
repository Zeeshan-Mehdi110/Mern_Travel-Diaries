import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert,Box, Button, CircularProgress} from '@mui/material'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { getPostDetails } from '../../store/actions/postActions'

const DiaryUpdate = () => {
  const [postData,setPostData] = useState({})
  const [inputs , setInputs] = useState({
    title : "",
    description : "",
    image : "",
    location : "",
  })
  const id = useParams().id
  useEffect(() => {
    getPostDetails(id).then(data => {
      setPostData(data.post)
      
      setInputs({
        title : postData.title,
        description : postData.description,
        image : postData.image,
        location : postData.location
      })
    })
    .catch(err => console.log(err))

  }, [id,postData.title])



  return <Form
    initialValues={inputs}
    onSubmit={(data, form) => {
      return axios.post(`http://localhost:5000/api/user/post/update/${id}`, data)
        .then((result) => {
          console.log(result)
          setTimeout(() => {
            form.reset({})
            return {}
          }, 2000);
        }).catch(err => {
          console.log(err)
          return { [FORM_ERROR]: err.message }
        })
    }}
  >

    {
      ({ handleSubmit, submitting, errors, values, invalid, submitSucceeded, submitError }) => {
        return <Box display={'flex'} justifyContent='center' alignItems={'center'} flexDirection='column'>
          <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'marginTop': '5px', 'maxWidth': '700px', 'padding': '20px', 'boxShadow': '2px 2px 5px rgba(0, 0, 0, 0.3)', 'borderRadius': '3px', "backgroundColor": '#EEEFFB' }} >
            <Box fontSize={'36px'} paddingBottom='24px' color='crimson' textAlign={"center"} sx={{ 'fontFamily': 'var(--dancing)', "fontWeight": "600" }} >Add Your Travel Diaries</Box>
            <Box display={'flex'} flexDirection='column' width={600} >
              <Field name="title" component='input' placeholder="Title" style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='textarea' name='description' placeholder='Description' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='input' name='image' size='small' placeholder='Image URL' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='input' name='location' size='small' placeholder='Location ' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='input' type='date' name='date' size='small' placeholder='Date' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Button type='submit' variant='contained' style={{ 'backgroundColor': 'crimson', 'color': 'white', 'fontFamily': 'var(--josefin)' }} disabled={submitting || invalid} >POST</Button>
            </Box>
            <Box  >
              {
                submitting && <CircularProgress />
              }
              {
                submitError && <Alert color='error' >{submitError}</Alert>
              }
            </Box>
          </form>
        </Box>
      }
    }
  </Form>
}

export default DiaryUpdate
