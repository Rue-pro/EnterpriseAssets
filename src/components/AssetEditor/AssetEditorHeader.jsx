import React from 'react'
import {
    makeStyles, Button, AppBar, Toolbar,
    IconButton, Icon, Typography,
} from '@material-ui/core';

export const AssetEditorHeader = (props) => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge='start' color='inherit' onClick={props.handleClose} aria-label='close'>
                    <Icon>close</Icon>
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                    {props.headerName}
                </Typography>
                <Button color='inherit' type='submit' >
                    Сохранить
                </Button>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));