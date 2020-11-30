import React from 'react';
import cx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const useStyles = makeStyles(() => ({
    root: {
        margin: 'auto',
        borderRadius: 12,
        height: '100%'
    },
    media: {
        borderRadius: 6,
    },
    animationBox: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: `0 6px 12px 0 #333`,
        }
    },

    textLinkHover: {
        textDecoration: "none !important"
    },

    titleBar: {
        textAlign: "center"
    },

    titleBarContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleBarDetail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }

}));

export const Product = React.memo(function MusicCard({
    productImage = '/images/template/category-1.jpg',
    productTitle = 'title',
    productSubTimeFirst = '',
    productSubTimeSecond = '',
    productPrice = '',
    productSlug = '/',
    productIsSelling = 0,

}) {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const textRender = productIsSelling !== 0 ? <><del>{productPrice}</del> {`->`} <b>{productIsSelling}</b></> : productPrice
    return (
        <Link className={styles.textLinkHover} href={productSlug}>
            <Card className={cx(styles.root, shadowStyles.root, styles.animationBox)}>
                <CardMedia
                    className={cx(styles.media, mediaStyles.root)}
                    image={
                        productImage
                    }
                />
                <CardContent>
                    <div className={styles.titleBar}>
                        <Typography variant="h4" gutterBottom>{productTitle}</Typography>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <StyledRating
                                style={{ fontSize: 15 }}
                                name="customized-color"
                                defaultValue={2}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                            />
                        </Box>
                        <div className={styles.titleBarContent}>
                            <div className={styles.titleBarDetail}>
                                <div>
                                    {
                                        productSubTimeFirst !== '' ? (
                                            <Typography variant="body2" gutterBottom>{productSubTimeFirst}</Typography>
                                        ) : ""
                                    }
                                </div>
                                <div>
                                    {
                                        productSubTimeSecond !== '' ? (
                                            <Typography variant="body2" gutterBottom>{productSubTimeSecond}</Typography>
                                        ) : ""
                                    }
                                </div>
                            </div>
                            <div className={styles.titleBarDetail}>
                                <div>
                                    {
                                        textRender !== "0" ? (
                                            <Typography variant="body1" gutterBottom style={{ color: 'red' }}>
                                                {textRender}
                                            </Typography>
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
});
export default Product