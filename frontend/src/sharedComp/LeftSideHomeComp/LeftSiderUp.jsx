import React, { useContext, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Clock02Icon, EncryptIcon, Key01Icon, Location08Icon, Logout02Icon } from '../../icons/Icons';
import './LeftSiderUp.css';
import { Context } from '../../context/ContextProvider';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const LIST_COMP = [
  { icon: <Key01Icon />, title: 'Passwords', link: '/' },
  { icon: <EncryptIcon />, title: 'Password Generator', link: '/password-generator' },
  // { icon: <Location08Icon />, title: 'Address', link: '/address' },
  // { icon: <Clock02Icon />, title: 'Generate History', link: '/generate-history' },
  { icon: <Logout02Icon />, title: 'Signout', link: '/login' },
];

const LeftSiderUp = ({ open, onClose }) => {
  const { setAuth } = useContext(Context);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    setAuth(false);
  };

  const navLinks = useMemo(() => (
    LIST_COMP.map((item, index) => (
      <NavLink
        key={item.title}
        to={item.link}
        className={({ isActive }) => `value space-x-2 ${isActive ? 'active' : ''}`}
        onClick={item.link === '/login' ? handleLogOut : undefined}
      >
        {item.icon} <span>{item.title}</span>
      </NavLink>
    ))
  ), []);

  const drawerContent = useMemo(() => (
    <List>
      {LIST_COMP.map((item) => (
        <ListItem
          button
          key={item.title}
          component={NavLink}
          to={item.link}
          onClick={item.link === '/login' ? handleLogOut : onClose}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  ), [onClose]);


  return (
    <section className='shadow-lg rounded-xl'>
      <div className="hidden sm:block input shadow-lg space-y-2 hover:shadow-slate-900">
        {navLinks}
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              backgroundColor: 'black',
              color: 'white',
            }
          }}
        >
          {drawerContent}
        </Drawer>
      </div>
    </section>
  );
};

export default LeftSiderUp;