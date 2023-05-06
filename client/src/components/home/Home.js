import { Box, Button, Typography } from "@mui/material"
import travel2 from "../../static/travel2.jpg"
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <Box>
      <Box position={"relative"} width={"100%"} height={"90vh"} >
        <img src={travel2} alt="img" width={"100%"} height={"70%"} />
        <Typography sx={{"backgroundColor":"#EEEFFB"}} position={"absolute"} top={0} left={"auto"} width={"100%"} fontFamily={"var(--dancing)"} fontWeight={600} textAlign={"center"}  variant="h3" color={"crimson"} >Life is more important than Art</Typography>
        <Box width={"100%"} height={"30%"} pt={"16px"} >
        <Typography textAlign={"center"} fontFamily={"var(--dancing)"} variant="h4" >SHARE YOUR TRAVEL DIARIES WITH US</Typography>
        <Box margin={"auto"} textAlign={"center"} mt={2} >
          <Button LinkComponent={Link} to="/login" variant="outlined" sx={{"marginRight":2}} >Share Your Story</Button>
          <Button LinkComponent={Link} to="/diaries" variant="contained">View Diaries</Button>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
