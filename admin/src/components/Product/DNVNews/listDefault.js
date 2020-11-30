
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import News from './index';

const useStyles = makeStyles((theme) => ({

}));


export default function DNVProduct({ pathRoot = "/blog", unitPrice = "VND", DataProduct = [] }) {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={1}>
                {
                    DataProduct.map((pData, index) => {
                        return (
                            <Grid item xs={12} sm={3} md={3}>
                                <News
                                    pathRoot={pathRoot}
                                    title={pData.title}
                                    description={pData.description}
                                    type={pData.type}
                                    slug={pData.slug}
                                    image={pData.image}
                                ></News>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

DNVProduct.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};