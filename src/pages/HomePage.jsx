import MuiTable from "../components/MuiTable"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeUsername } from "../utils";


const HomePage = () => {

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/adduser');
  }

  const handleLogout = () => {
    removeUsername();
    navigate("/signin");
  }

  return (
    <div>
      <h2>Welcome To User Data !</h2>
      <Button style={{marginRight:"10px"}} variant="contained" size="small" startIcon={<PersonAddAltIcon />} onClick={handleAddUser}>
        Add User
      </Button>
      
      <Button variant="outlined" size="small" startIcon={<LogoutIcon />} onClick={handleLogout}>
        Log Out
      </Button>
      <br />
      <br />
      <MuiTable />
    </div>
  )
}

export default HomePage