import { Alert, Box, Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileInput from '../library/form/FileInput'
import preview from '../../static/preview.png'
import { useState } from 'react'

const AddPost = () => {
  const navigate = useNavigate()
  const id = useSelector((state) => state.auth && state.auth.user && state.auth.user._id)
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          width: { xs: "100vw", md: "500px" },
          height: { xs: "300px", md: "400px" },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        {selectedImage ? (
          <img src={URL.createObjectURL(selectedImage)} alt="img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </Box>
      <Form
        onSubmit={(data, form) => {
          return axios
            .postForm(`/api/user/post/${id}`, data)
            .then((result) => {
              setTimeout(() => {
                form.reset({})
                return {}
              }, 2000)
              navigate('/diaries')
            })
            .catch((err) => {
              console.log(err)
              return { [FORM_ERROR]: err.message }
            })
        }}
      >
        {({ handleSubmit, submitting, errors, values, invalid, submitSucceeded, submitError }) => {
          return (
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  width: { xs: '100vw', md: 600 },
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginTop: '10px',
                  padding: '20px',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                  borderRadius: '3px',
                  backgroundColor: '#EEEFFB',
                }}
              >
                <Box
                  fontSize="36px"
                  paddingBottom="24px"
                  color="crimson"
                  textAlign="center"
                  sx={{ fontFamily: 'var(--dancing)', fontWeight: '600' }}
                >
                  Add Your Travel Diaries
                </Box>
                <Box display="flex" flexDirection="column" width={{ xs: '100%', md: 600 }}>
                  <Field
                    name="title"
                    component="input"
                    placeholder="Title"
                    style={{
                      marginBottom: '16px',
                      padding: '14px',
                      borderRadius: '5px',
                      fontFamily: 'var(--josefin)',
                      border: '1px solid gray',
                      fontSize: '15px',
                    }}
                  />
                  <Field
                    component="textarea"
                    name="description"
                    placeholder="Description"
                    style={{
                      marginBottom: '16px',
                      padding: '14px',
                      borderRadius: '5px',
                      fontFamily: 'var(--josefin)',
                      border: '1px solid gray',
                      fontSize: '15px',
                    }}
                  />
                  <Field
                    component={FileInput}
                    name="image"
                    inputProps={{ accept: 'image/*' }}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                  <Field
                    component="input"
                    name="location"
                    size="small"
                    placeholder="Location"
                    style={{
                      marginBottom: '16px',
                      padding: '14px',
                      borderRadius: '5px',
                      fontFamily: 'var(--josefin)',
                      border: '1px solid gray',
                      fontSize: '15px',
                    }}
                  />
                  <Field
                    component="input"
                    type="date"
                    name="date"
                    size="small"
                    placeholder="Date"
                    style={{
                      marginBottom: '16px',
                      padding: '14px',
                      borderRadius: '5px',
                      fontFamily: 'var(--josefin)',
                      border: '1px solid gray',
                      fontSize: '15px',
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: 'crimson', color: 'white', fontFamily: 'var(--josefin)' }}
                    disabled={submitting || invalid}
                  >
                    ADD Diary
                  </Button>
                </Box>
                <Box>
                  {submitting && <CircularProgress />}
                  {submitError && <Alert color="error">{submitError}</Alert>}
                </Box>
              </form>
            </Box>
          )
        }}
      </Form>
    </Box>
  )
}

export default AddPost
