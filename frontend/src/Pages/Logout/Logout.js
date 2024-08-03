import { useAuth } from '../../Components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return handleLogout;
};

export default Logout;