import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteStudent, editStudent, loadStudents } from '../../store/actions/studentsAction'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.blue,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StudentsData = ({ students, dispatch }) => {
    console.log(students.users)
    const handldeDelete = (ID) => {
        dispatch(deleteStudent(ID))
    }
    const handldeEdit = (ID) => {
        dispatch(editStudent(ID))
    }
    useEffect(() => {
        dispatch(loadStudents())
    }, [])

    return (
        <Box sx={{ 'maxWidth': '786px', 'boxShadow': '2px 2px 5px rgba(0, 0, 0, 0.3)', 'borderRadius': '3px', 'marginX': 'auto', 'marginTop': '50px', 'fontFamily': 'var(--josefin)' }} >
            <TableContainer component={Paper}   >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow  >
                            <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)', 'fontWeight': '800' }} align="center">Student Name</StyledTableCell>
                            <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)', 'fontWeight': '800' }} align="center">Email</StyledTableCell>
                            <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)', 'fontWeight': '800' }} align="center">Password</StyledTableCell>
                            <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)', 'fontWeight': '800' }} align="center">Edit</StyledTableCell>
                            <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)', 'fontWeight': '800' }} align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.users.map((obj) => (
                            <React.Fragment key={obj._id}>
                                <StyledTableRow>
                                    <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)' }} align='center'>{obj.name}</StyledTableCell>
                                    <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)' }} align="center">{obj.email}</StyledTableCell>
                                    <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)' }} align="center">{(obj.password).slice(0,10)}</StyledTableCell>
                                    <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)' }} align="center"><Button onClick={() => { handldeEdit(obj._id) }} color='success' component={Link} to={`/edit/${obj._id}`}   ><EditIcon /></Button></StyledTableCell>
                                    <StyledTableCell sx={{ 'fontFamily': 'var(--josefin)' }} align="center"><Button onClick={() => { handldeDelete(obj._id) }} sx={{ "color": "crimson" }}  ><AutoDeleteIcon /></Button></StyledTableCell>
                                </StyledTableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        students: state.students.students
    }
}

export default connect(mapStateToProps)(StudentsData)
