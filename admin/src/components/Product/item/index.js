
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 0,
        margin: 0,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        minHeight: 330,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    BestSeller: {
        position: 'absolute',
        background: 'red',
        padding: '5px 10px',
        color: '#fff',
        marginTop: '5px',
        boxShadow: '1px 2px 2px 1px #423434'
    },
    media: {
        height: 0,
        paddingTop: '80.25%', // 16:9
    },
    footerCard: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));


export default function Product({
    pathRoot = "/product",
    unitPrice = "VND",
    bestSelling,
    title,
    description,
    priceSales,
    price,
    slug,
    image,
    bestSellingContent = "Tour bán chạy"
}) {
    const classes = useStyles();
    if (title)
        return (
            <>
                <Paper className={classes.paper}>
                    {
                        bestSelling ? (
                            <div className={classes.BestSeller}><b>{bestSellingContent}</b></div>
                        ) : ""
                    }
                    <CardMedia
                        className={classes.media}
                        image={image ? image : "/images/grid-list/breakfast.jpg"}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="subtitle2" gutterBottom>{title}</Typography>
                        {
                            description.indexOf('</') !== -1 ? (
                                <div dangerouslySetInnerHTML={{ __html: description.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                            ) : (
                                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                                )
                        }
                    </CardContent>
                    <CardActions disableSpacing>
                        <div className={classes.footerCard}>
                            <Typography variant="caption" >
                                {priceSales && priceSales > 0 ? (<del>{price}{` `} {unitPrice}</del>) : <><b style={{ color: 'red' }}>{price}</b>{` `} <b style={{ color: 'red' }}>{unitPrice}</b></>}<br />
                                {priceSales && priceSales > 0 ? (<><b style={{ color: 'red' }}>{priceSales}</b> {` `} <b style={{ color: 'red' }}>{unitPrice}</b></>) : ''}
                            </Typography>
                            <Typography variant="caption">
                                <Link
                                    key={slug}
                                    href={`${pathRoot}/${slug}`}>Xem thêm >></Link>
                            </Typography>
                        </div>
                    </CardActions>
                </Paper>
            </>
        )
    else return <></>
}

Product.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};