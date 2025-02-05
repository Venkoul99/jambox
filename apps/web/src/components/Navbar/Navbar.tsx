import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import { Menu, X, BrandInstagram, BrandFacebook, BrandYoutube } from 'tabler-icons-react';
import classes from './Navbar.module.css';
import { Button, ActionIcon } from '@mantine/core';
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
        <div className={classes.logoContainer}>
          <img
            src="/logo.PNG"
            alt="Logo"
            className={classes.logo}
          />
        </div>
      )}

      <div className={`${classes.navbarMain} ${navbarOpen ? classes.open : ''}`}>
        <div style={{ marginBottom: '150px' }}>
          {links}
        </div>
        {isAuthenticated && (
          <div className={classes.adminLinks}>
            {adminLinks}
          </div>
        )}

        <div className={classes.socialMedia}>
          <ActionIcon
            component="a"
            href="https://www.instagram.com/jambox.rec"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            className={classes.socialIcon}
          >
            <BrandInstagram size={30} />
          </ActionIcon>

          <ActionIcon
            component="a"
            href="https://www.facebook.com/profile.php?id=61566491512876"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            className={classes.socialIcon}
          >
            <BrandFacebook size={30} />
          </ActionIcon>

          <ActionIcon
            component="a"
            href="https://www.youtube.com/@jambox.rec1"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            className={classes.socialIcon}
          >
            <BrandYoutube size={30} />
          </ActionIcon>
        </div>

      </div>

    </nav>
  );
}
