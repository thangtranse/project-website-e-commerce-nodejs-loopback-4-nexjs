import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { API } from '../../constants';
import { fetchGet } from '../../libs/apiApp';

const ItemDetail = ({ }) => {

    const dispatch = useDispatch();

    const { id } = useParams()

    const [productDetail, setProductDetail] = React.useState({})

    // Lấy thông tin
    useEffect(() => {
        try {
            fetchGet({
                url: API.news + "/slug/" + id
            }).then(data => {
                if (data && data.length > 0) {
                    setProductDetail({
                        ...data[0]
                    })
                }
            }).catch(error => {
                console.log("error", error)
            })
        } catch (error) {
            console.log("error index")
        }
        return () => {

        }
    }, [id])

    return (
        <Container maxWidth="md">
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <h2>{(productDetail && productDetail.title) ? productDetail.title : ""}</h2>
                    <br />
                    {
                        (productDetail && productDetail.description && productDetail.description.indexOf('</') !== -1) ? (
                            <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: productDetail.description.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                        ) : (
                                <Typography variant="body2" color="textSecondary" component="h2">{(productDetail && productDetail.description) ? productDetail : ""}</Typography>
                            )
                    }
                </Grid>
            </Grid>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item wrap="nowrap" xs>
                    <br />
                    {
                        (productDetail && productDetail.details && productDetail.details.indexOf('</') !== -1) ?
                            (
                                <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: productDetail.details.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                            ) : (
                                <Typography variant="body2" color="textSecondary" component="h2">{(productDetail && productDetail.details) ? productDetail.details : ""}</Typography>
                            )
                    }
                </Grid>
            </Grid>
        </Container>
    )
}


export default ItemDetail
