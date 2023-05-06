import axios from "axios"

export const studentsActionTypes = {
    LOAING_STUDENTS : 'loading',
    LOADED_STUDENTS : 'loaded',
    DELETED_STUDENT : 'deleted student',
    UPDATED_STUDENT : "updated student",
    ERROR_OCCURE    : 'error',
}

export const loadStudents = () => {
    return (dispatch) => {
            dispatch({ type : studentsActionTypes.LOAING_STUDENTS })
            axios.get('http://localhost:5000/api/user/post/load').then(result => {
                dispatch({ type : studentsActionTypes.LOADED_STUDENTS , students : result.data.post })
            }).catch(err => {
                console.log(err)
                dispatch({ type : studentsActionTypes.ERROR_OCCURE , error : err.message })
            })
    }
}

