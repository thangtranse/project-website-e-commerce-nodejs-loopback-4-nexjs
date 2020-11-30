import {
    makeStyles
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles((theme) => ({

}));

export default ({ onChangePagination = () => { }, numberAllPage = 1 }) => {
    const classes = useStyles();
    return (
        <div>
            <Pagination count={numberAllPage} showFirstButton showLastButton onChange={onChangePagination} />
        </div>
    );
}