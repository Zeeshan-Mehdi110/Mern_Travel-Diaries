import { authActionsTypes } from "../actions/authActions"
import { studentsActionTypes } from "../actions/studentsAction"

const initState = {
  students: [],
  loading: false,
  error: null
}
const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case studentsActionTypes.LOAING_STUDENTS:
      return {
        ...state,
        loading: true,
        error: null
      }
    case studentsActionTypes.LOADED_STUDENTS:
      return {
        ...state,
        loading: false,
        students: action.students,
        error: null
      }
    case studentsActionTypes.ERROR_OCCURE:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case studentsActionTypes.DELETED_STUDENT:
      return {
        ...state,
        students: state.students.filter(students => students._id !== action.id)
      }
    case studentsActionTypes.UPDATED_STUDENT : 
      return {
        ...state,
        
      }
    case authActionsTypes.LOGOUT : 
      return initState
    default:
      return state
  }
}
export default studentReducer