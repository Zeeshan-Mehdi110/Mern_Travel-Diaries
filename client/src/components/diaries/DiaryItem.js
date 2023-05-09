import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { DeleteForever, EditLocationAlt, ModeEditOutline } from '@mui/icons-material';
import { Alert, Box, CardActions, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deletePost } from '../../store/actions/postActions';

export default function DiaryItem({ title, description, image, location, date, user, postId , name }) {
  const [open , setOpen] = useState(false)
  const id = useSelector(state => state?.auth?.user?._id)

  const isCurrentUserPost = () => {
    if (id === user) {
      return true
    }
    return false
  }

  const handleDelete = () => {
    deletePost(postId).then((data) => {
      setOpen(true)
    }).catch(err => console.log(err))
  }

  return (
    <Card sx={{ width: "50%", height: 'auto', marginBottom: "14px", display: "flex", flexDirection: "column", boxShadow: "5px 5px 10px #ccc" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton color='info' >
            <EditLocationAlt />
          </IconButton>
        }
        title={location}
        subheader={date}
      />
      <img
        height="194"
        src={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography pb={1} variant="h6" color="text.secondary">
          {title}
        </Typography>
        <hr />
        <Box display={"flex"} pt={1} >
          <Typography width={"80%"} variant="caption" fontWeight={"bold"} color="text.secondary">{name} :</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      {
        isCurrentUserPost() && <CardActions sx={{ "marginLeft": "auto" }} >
          <IconButton LinkComponent={Link} to={`/post/${postId}`} color='warning' >
            <ModeEditOutline />
          </IconButton>
          <IconButton onClick={handleDelete} color='error' >
            <DeleteForever />
          </IconButton>
        </CardActions>
      }
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Post Deleted Successfully !!
        </Alert>
      </Snackbar>
    </Card>
  );
}
