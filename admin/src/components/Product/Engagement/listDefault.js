
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Product from './';
import { ClearHTMLTag, FormatMoney } from '../../../libs/functions';

export const SolidGameCardDemo = React.memo(function SolidGameCard({ items, pathParams = '' }) {
    return (
        <>
            <Grid container spacing={1}>
                {
                    items && items.length > 0 ? items.map((data, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3}>
                                <Product
                                    productImage={`${process.env.REACT_APP_URL_FILE_IMAGE}${data.image}`}
                                    productTitle={data.title}
                                    productDescription={ClearHTMLTag(data.description)}
                                    productPrice={FormatMoney(data.price)}
                                    productIsSelling={data.priceSales && data.priceSales > 0 ? FormatMoney(data.priceSales) : 0}
                                    productSlug={pathParams + data.slug}
                                />
                            </Grid>
                        )
                    }) : ""
                }
            </Grid>
        </>
    );
});
export default SolidGameCardDemo