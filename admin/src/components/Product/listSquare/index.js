
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PRODUCT from '../item';
import DATA_TEMPLATE from './data';

const useStyles = makeStyles((theme) => ({

}));


const ListProductSquare = ({ pathRoot = "/product", unitPrice = "VND", DataProduct = DATA_TEMPLATE }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={1}>
                {
                    DataProduct.map((pData, index) => {
                        return (
                            <Grid item xs={12} sm={3} md={3}>
                                <PRODUCT
                                    pathRoot={pathRoot}
                                    unitPrice={unitPrice}
                                    bestSelling={pData.bestSelling}
                                    title={pData.name}
                                    description={pData.description}
                                    priceSales={pData.priceSales}
                                    price={pData.price}
                                    slug={pData.slug}
                                    image={pData.image}
                                ></PRODUCT>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default ListProductSquare