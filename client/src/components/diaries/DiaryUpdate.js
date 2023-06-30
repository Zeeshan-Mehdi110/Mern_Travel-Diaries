import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { FORM_ERROR } from "final-form";
import { Form, Field } from "react-final-form";
import { getPostDetails } from "../../store/actions/postActions";
import FileInput from '../library/form/FileInput'
import preview from '../../static/preview.png'

const DiaryUpdate = () => {
  const [postData, setPostData] = useState({});
  const navigator = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null)

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
  })
  const id = useParams().id;
  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPostData(data.post);

        setInputs({
          title: postData.title,
          description: postData.description,
          image: postData.image,
          location: postData.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id, postData.title]);

  return (
    <Form
      initialValues={inputs}
      onSubmit={(data, form) => {
        return axios
          .postForm(`/api/user/post/update/${id}`, data)
          .then((result) => {
            navigator("/profile");
            setTimeout(() => {
              form.reset({});
              return {};
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            return { [FORM_ERROR]: err.message };
          });
      }}
    >
      {({
        handleSubmit,
        submitting,
        errors,
        values,
        invalid,
        submitSucceeded,
        submitError,
      }) => {
        return (
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
          >
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
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "50px",
                width: { xs: "100vw", md: 600 },
                padding: "20px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                borderRadius: "3px",
                backgroundColor: "#EEEFFB",
              }}
            >
              <Box
                fontSize={"36px"}
                paddingBottom="24px"
                color="crimson"
                textAlign={"center"}
                sx={{ fontFamily: "var(--dancing)", fontWeight: "600" }}
              >
                Add Your Travel Diaries
              </Box>
              <Box display={"flex"} flexDirection="column" width={{ xs: "100%", md: 600 }}>
                <Field
                  name="title"
                  component="input"
                  placeholder="Title"
                  style={{
                    marginBottom: "16px",
                    padding: "14px",
                    borderRadius: "5px",
                    fontFamily: "var(--josefin)",
                    border: "1px solid gray",
                    fontSize: "15px",
                  }}
                />
                <Field
                  component="textarea"
                  name="description"
                  placeholder="Description"
                  style={{
                    marginBottom: "16px",
                    padding: "14px",
                    borderRadius: "5px",
                    fontFamily: "var(--josefin)",
                    border: "1px solid gray",
                    fontSize: "15px",
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
                  placeholder="Location "
                  style={{
                    marginBottom: "16px",
                    padding: "14px",
                    borderRadius: "5px",
                    fontFamily: "var(--josefin)",
                    border: "1px solid gray",
                    fontSize: "15px",
                  }}
                />
                <Field
                  component="input"
                  type="date"
                  name="date"
                  size="small"
                  placeholder="Date"
                  style={{
                    marginBottom: "16px",
                    padding: "14px",
                    borderRadius: "5px",
                    fontFamily: "var(--josefin)",
                    border: "1px solid gray",
                    fontSize: "15px",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "crimson",
                    color: "white",
                    fontFamily: "var(--josefin)",
                  }}
                  disabled={submitting || invalid}
                >
                  POST
                </Button>
              </Box>
              <Box>
                {submitting && <CircularProgress />}
                {submitError && <Alert color="error">{submitError}</Alert>}
              </Box>
            </form>
          </Box>
        );
      }}
    </Form>
  );
};

export default DiaryUpdate;
