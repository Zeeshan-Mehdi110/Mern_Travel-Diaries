import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Field, Form } from "react-final-form";
import TextInput from "../library/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showError, showSuccess } from "../../store/actions/alertActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box
        p={3}
        textAlign={"center"}
        bgcolor="#fff"
        boxShadow={"0px 0px 17px 5px #dbdada"}
        width={"450px"}
      >
        <Typography
          textAlign={"center"}
          variant="h5"
          fontWeight={"bold"}
          pb={1}
        >
          Travel Diaries
        </Typography>
        <Form
          onSubmit={(data) => {
            return axios
              .post("api/user/forgot-password", data)
              .then(({ data }) => {
                if (data.success) {
                  navigate("/reset-password");
                  dispatch(
                    showSuccess(
                      "An Email has been sent to your inbox. Please check your email and reset your password"
                    )
                  );
                }
              })
              .catch((err) => {
                let message =
                  err && err.response && err.response.data
                    ? err.response.data.error
                    : err.message;
                dispatch(showError(message));
              });
          }}
          validate={(data) => {
            const errors = {};
            if (!data.email) {
              errors.email = "Email Address Required";
            } else if (
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
        >
          {(props) => {
            const { invalid, submitting } = props;
            return (
              <form onSubmit={props.handleSubmit} action="">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  component={TextInput}
                  autoFocus
                />
                <Button type="submit" disabled={submitting || invalid}>
                  Reset Password{" "}
                  {submitting && (
                    <CircularProgress
                      size={20}
                      style={{ marginLeft: "10px" }}
                    />
                  )}{" "}
                </Button>
                <Box mt={2}>
                  <Link style={{ textDecoration: "none" }} to="/login">
                    Sign In
                  </Link>
                </Box>
              </form>
            );
          }}
        </Form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
