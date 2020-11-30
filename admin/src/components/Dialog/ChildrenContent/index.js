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

export default ({
    open: {
        status, // đóng mở popup
        title, // tiêu đề popup
        redirectTo, // tùy chọn redirect khi kết thúc (confirm)
        confirmFn = () => { }, // sự kiện khi confirm
        rejectFn = () => { } // sự kiện khi reject
    },
    disableFooter = false, // Ẩn Thanh Footer của popup true -> ẩn
    children
}) => {
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
                    {children}
                </DialogContent>
                {
                    disableFooter ? ("") : (
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
                    )
                }

            </Dialog>
        </>
    );
}