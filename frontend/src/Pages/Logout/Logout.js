import { useAuth } from "../../Components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return handleLogout;
};

export default Logout;
