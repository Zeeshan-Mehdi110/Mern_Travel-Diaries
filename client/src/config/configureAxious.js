import axios from "axios"


const configureAxious = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
}

export default configureAxious