import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
    },
    link: {
        color: 'white',
        fontWeight: 'bold',
        "&.Mui-selected": {
            color: '#D72638',
        }
    },
});

const BottomNav = ({ userLogged }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const goToo = (newValue) => {
        switch (newValue) {
            case 0:
                return <Redirect push to='/' />
            case 1:
                return <Redirect push to='/login' />
            case 2:
                return <Redirect push to='/register' />
            case 3:
                return <Redirect push to='/admin' />
            default:
                return;
        }
    }
    return (
        <>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    goToo(newValue)
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction className={classes.link} label="Home" component={Link} to="/" />
                {userLogged && <BottomNavigationAction className={classes.link} label="Déconnexion" component={Link} to="/logout" />}
                {!userLogged && <BottomNavigationAction className={classes.link} label="Login" component={Link} to="/login" />}
                {!userLogged && <BottomNavigationAction className={classes.link} label="Register" component={Link} to="/register" />}


                {userLogged && <BottomNavigationAction className={classes.link} label="Admin" component={Link} to="/admin" />}
            </BottomNavigation >
        </>
    );
}

export default BottomNav