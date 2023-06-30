import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
  DeleteForever,
  EditLocationAlt,
  ModeEditOutline,
} from "@mui/icons-material";
import { Alert, Box, CardActions, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { deletePost, getPostDetails } from "../../store/actions/postActions";
import DeletePopUp from "../library/DeletePopup";

const DiaryDetail = () => {
  const [open, setOpen] = useState(false);
  const id = useSelector((state) => state?.auth?.user?._id);
  const postId = useParams().id
  const [postData, setPostData] = useState({})

  useEffect(() => {
    getPostDetails(postId).then(({ post }) => {
      setPostData(post)
    })
  }, [])

  const isCurrentUserPost = () => {
    if (id === postData.user) {
      return true;
    }
    return false;
  };

  return (
    <Box>
      <Card
        sx={{
          width: { xs: "100vw", md: "500px" },
          height: "auto",
          marginBottom: "14px",
          display: "flex",
          marginX: "auto",
          flexDirection: "column",
          boxShadow: "5px 5px 10px #ccc"
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              N
            </Avatar>
          }
          action={
            <IconButton color="info">
              <EditLocationAlt />
            </IconButton>
          }
          title={postData.location}
          subheader={postData.date}
        />
        <img height="194" src={postData.image} alt="Paella dish" />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {postData.title}
          </Typography>
          <hr />
          <Box display={"flex"} pt={2} px={2}>
            <Typography variant="body2" color="text.secondary">
              {postData.description}
            </Typography>
          </Box>
        </CardContent>
        {isCurrentUserPost() && (
          <>
            <CardActions sx={{ marginLeft: "auto" }}>
              <Fragment>
                <IconButton
                  component={Link}
                  to={`/post/${postId}`}
                  color="warning"
                  style={{ textDecoration: "none" }}
                >
                  <ModeEditOutline />
                </IconButton>
                <DeletePopUp id={postId} deletePost={deletePost} />
              </Fragment>
            </CardActions>
          </>
        )}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Post Deleted Successfully !!
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  )
}

export default DiaryDetail