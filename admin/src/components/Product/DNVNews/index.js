
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { ClearHTMLTag } from '../../../libs/Functions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: 330,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
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
    },
    textLinkHover: {
        textDecoration: "none !important"
    },
    cardFooter: {
        textAlign: 'right',
        paddingBottom: 10,
        paddingRight: 5,
        color: 'rgb(31, 119, 186)'
    }
}));

export const Product = React.memo(function MusicCard({
    pathRoot = "",
    title,
    description,
    slug,
    image
}) {
    const classes = useStyles();
    let linkImage = image ? image : '';
    let content = ClearHTMLTag(description)
    content = content.length > 20 ? content.slice(0, content.indexOf(" ", 100)) + "..." : content
    if (title)
        return (
            <Link className={classes.textLinkHover} href={`${pathRoot}/${slug}`}>
                <Paper className={classes.paper}>
                    <CardMedia
                        className={classes.media}
                        image={linkImage}
                        title={title}
                    />
                    <CardContent style={{textAlign: 'left'}}>
                        <Typography variant="subtitle2" gutterBottom>{title}</Typography>
                        {
                            <Typography variant="body2" color="textSecondary" component="p">{content}</Typography>
                        }
                    </CardContent>
                    <div className={classes.cardFooter}>
                        <Typography variant="body2" component="p">Read more...</Typography>
                    </div>
                </Paper>
            </Link>
        )
    else return <></>
})

Product.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

export default Product
