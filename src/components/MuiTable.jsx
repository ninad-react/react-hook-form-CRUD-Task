
import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    Paper,
    TableCell,
    Stack,
    IconButton
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MuiTable = () => {

  const [ data , setData ] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setData(response.data);
    }catch(error){
      toast.error(error.message)
    }
  };

  const handleEditUser = (id) => {
    navigate("edituser/"+id)
  }

  const deleteUser = async (id) => {

    const deleteRemove = window.confirm('Are you sure you want to delete this item?');
    if(deleteRemove){
        try {
            await axios.delete(`http://localhost:8000/users/${id}`);
            toast.success("User deleted successfully !!");
            fetchData();
        }
        catch (error) {
            toast.error(error.message);
        }
    }
}

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
    <TableContainer component={Paper}>
        <Table aria-label='simple table'>
            <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
            </TableHead>
            <TableBody>
                {
                    data.map( row => (
                        <TableRow 
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{row?.id}</TableCell>
                            <TableCell>{row?.firstName}</TableCell>
                            <TableCell>{row?.lastName}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <div style={{display:"flex"}}>
                                    <IconButton aria-label='edit' color='success' size='small' onClick={() => handleEditUser(row?.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label='edit' color='warning' size='small' onClick={() => deleteUser(row?.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
    <ToastContainer />
    </>
  )
}

export default MuiTable