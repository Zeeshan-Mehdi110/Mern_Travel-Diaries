import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import travel3 from "../../static/travel3.jpg"
import { DeleteForever, EditLocationAlt, ModeEditOutline } from '@mui/icons-material';
import { Box, CardActions } from '@mui/material';
import { useSelector } from 'react-redux';

export default function DiaryItem({title,description,image,location,date, user}) {
  const id = useSelector(state=> state?.auth?.student?._id)

  const isCurrentUserPost = () => {
    if( id === user ){
      return true
    }
    return false
  }
  console.log(isCurrentUserPost())

  return (
    <Card sx={{ width:"50%",height:'75vh',marginBottom:"14px",display:"flex", flexDirection : "column" , boxShadow : "5px 5px 10px #ccc"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
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
        src={travel3}
        alt="Paella dish"
      />
      <CardContent>
        <Typography pb={1} variant="h6" color="text.secondary">
          {title}
        </Typography>
        <hr />
        <Box display={"flex"} pt={1} >
          <Typography width={"214px"} variant="caption" fontWeight={"bold"} color="text.secondary">Zeeshan Mehdi :</Typography>
          <Typography  variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      { isCurrentUserPost() && <CardActions sx={{"marginLeft":"auto"}} >
        <IconButton color='warning' >
          <ModeEditOutline />
        </IconButton>
        <IconButton color='error' >
          <DeleteForever />
        </IconButton>
      </CardActions>}
    </Card>
  );
}
