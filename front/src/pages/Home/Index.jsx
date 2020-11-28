import React from 'react'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '50px',
        display: 'block',
        textAlign: 'center'
    }
}));

function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Accueil</h1>
        </div>
    )
}

export default Home
