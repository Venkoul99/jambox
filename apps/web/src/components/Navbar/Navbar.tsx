import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import { Menu, X } from 'tabler-icons-react'; // For hamburger icon
import classes from './Navbar.module.css';
import { Button } from '@mantine/core';
import { useIsMobile } from '@/hooks/useIsMobile';

const data = [
  { link: '', label: 'News' },
  { link: '/artists', label: 'Jambox Artists' },
];

const adminData = [
  { link: '/admin/create-new-artist', label: 'Add new artist' },
  { link: '/admin/create-new-article', label: 'Add new article' },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const [navbarOpen, setNavbarOpen] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  const closeNavbar = () => {
    if (isMobile) {
      setNavbarOpen(false);
    }
  };

  const links = data.map((item) => (
    <Link
      className={classes.link}
      to={item.link}
      key={item.label}
      onClick={closeNavbar}
    >
      <span>{item.label}</span>
    </Link>
  ));

  const adminLinks = adminData.map((item) => (
    <Link
      className={classes.link}
      to={item.link}
      key={item.label}
      onClick={closeNavbar}
    >
      <span>{item.label}</span>
    </Link>
  ));

  const toggleNavbar = () => {
    if (isMobile) {
      setNavbarOpen(!navbarOpen);
    } else {
      setNavbarOpen(true);
    }
  };

  return (
    <nav className={`${classes.navbar} ${navbarOpen ? classes.open : ''}`}>

      <Button className={classes.hamburger} onClick={toggleNavbar}>
        {navbarOpen ? <X size={30} /> : <Menu size={30} />}
      </Button>

      {navbarOpen && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/logo.PNG"
            alt="Logo"
            style={{
              marginTop: '20px',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      <div
        className={`${classes.navbarMain} ${navbarOpen ? classes.open : ''}`}
      >
        {links}
        {isAuthenticated ? (
          <div
            style={{
              marginTop: isMobile ? '0' : '200px',
            }}
          >
            {adminLinks}
          </div>
        ) : ''}

      </div>
    </nav>
  );
}
