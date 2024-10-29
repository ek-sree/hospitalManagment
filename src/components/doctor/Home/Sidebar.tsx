import HomeIcon from '@mui/icons-material/Home';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gradient-to-b from-black to-slate-900 min-h-[650px] w-20 ml-2 rounded-lg flex flex-col items-center py-6">
      <div className="text-purple-600 mb-12"> 
        <AcUnitRoundedIcon fontSize="large" />
      </div>

      <button
        onClick={() => handleButtonClick('/doctor/home')} 
        className={`text-slate-500 hover:text-white mb-6 ${isActive('/doctor/home') ? 'bg-slate-600 text-slate-300' : ''} p-2 rounded-full`}
      >
        <HomeIcon />
      </button>

      <button
        onClick={() => handleButtonClick('/doctor/editDoctor')} 
        className={`text-slate-500 hover:text-white mb-6 ${isActive('/doctor/userDetails') ? 'bg-slate-600 text-slate-300' : ''} p-2 rounded-full`}
      >
        <AccountCircleIcon />
      </button>

      <Link to='/'>
        <button className="text-slate-500 hover:text-white">
          <LogoutRoundedIcon />
        </button> 
      </Link>
    </div>
  );
};

export default SideNav;
