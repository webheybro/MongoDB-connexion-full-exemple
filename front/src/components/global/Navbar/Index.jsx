import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navbar: {
        position: 'absolute',
        width: '100%',
        zIndex: 400,
        backgroundColor: 'transparent',
        transition: 'background-color 0.5s',
    },
    fixedbar: {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.7)',
        transitions: 'position 2s, background-color 2s',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    grow: {
        flexGrow: 1,
        boxshadow: 'none',
    },
    bar: {
        background: 'transparent',
        boxShadow: 'none',
    },
    menuButton: {
        zIndex: '20',
    },
    logo: {
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        zIndex: '10',
        color: '#FDFDFF',
        left: '0px',
        fontWeight: 'bold',
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: 'Fredoka One',
        [theme.breakpoints.down('md')]: {
            marginTop: '10px',
            fontSize: '20px',
        }
    },
    sectionDesktop: {
        zIndex: '20',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        zIndex: '20',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const Navbar = ({ openSideBar }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [scroll, setScroll] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/'>Home</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/login'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register'>S'incrire</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const handleScroll = (event) => {
        if (window.scrollY < 150 && scroll === true) {
            setScroll(false)
        }
        else if (window.scrollY > 150 && scroll === false) {
            setScroll(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <div className={scroll ? classes.navbar + " " + classes.fixedbar : classes.navbar}>
            <div className={classes.grow} >
                <AppBar position="static" className={classes.bar}>
                    <Toolbar className={classes.root}>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>

                        <div className={classes.logo}>
                            <h1 className={classes.title}>
                                Connection - MERN
                        </h1>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div >
        </div >
    );
}


export default Navbar;