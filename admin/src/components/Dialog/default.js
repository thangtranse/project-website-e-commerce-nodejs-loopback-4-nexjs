import {
    Button, Dialog,



    DialogActions, DialogContent,
    DialogContentText, DialogTitle, makeStyles
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    DialogCss: {
        minWidth: '320px'
    }
}));

export default ({ open: { status, title, content, redirectTo, confirmFn = () => { }, rejectFn = () => { } } }) => {
    const classes = useStyles()
    return (
        <>
            <Dialog
                open={status}
                onClose={() => {
                    rejectFn()
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    className={classes.DialogCss}
                    id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={() => confirmFn()}
                        href={redirectTo}
                        component={redirectTo == '' ? 'button' : 'a'}
                    >Đồng ý</Button>
                    {
                        redirectTo == '' ? (
                            <Button
                                style={{ color: 'red' }}
                                color="primary"
                                onClick={() => {
                                    rejectFn()
                                }}>Hủy bỏ</Button>
                        ) : ""
                    }

                </DialogActions>
            </Dialog>
        </>
    );
}