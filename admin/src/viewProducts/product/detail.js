import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { API, SETTING } from '../../constants'
import { fetchGet } from '../../libs/apiApp'
import { FormatMoney } from '../../libs/Functions'
const unitPrice = 'VND'
const URL_IMAGE = SETTING.URL_IMAGE_PATH_SERVER + "/"

const ItemDetail = ({ }) => {

    const { id } = useParams()

    const [productDetail, setProductDetail] = React.useState({})
    let slider1 = useRef(null);
    let slider2 = useRef(null);
    const [nav1, setNav1] = React.useState(null)
    const [nav2, setNav2] = React.useState(null)

    useEffect(() => {
        setNav2(slider2)
        setNav1(slider1)
    }, [nav1, nav2])

    // Lấy thông tin
    useEffect(() => {
        try {
            fetchGet({
                url: API.product + "/slug/" + id
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

    let slideShow = (productDetail && productDetail.album) ? productDetail.album : []

    if (productDetail && productDetail.image) {
        slideShow.push(productDetail.image)
    }

    if (slideShow.length > 0) {
        slideShow = slideShow.map(data => {
            return (URL_IMAGE + data)
        })
        slideShow = slideShow.filter(function (item, index) {
            return slideShow.indexOf(item) === index;
        });
    }

    return (
        <Container maxWidth="md">
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <div>
                        <Slider
                            asNavFor={nav2}
                            ref={slider => (slider1 = slider)}
                        >
                            {
                                slideShow.map(data => {
                                    return (
                                        <div>
                                            <img
                                                src={data}
                                                onError={(e) => { e.target.src = "image_path_here" }}
                                                width={"100%"}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        {
                            slideShow.length > 1 ? (
                                <>
                                    <hr />
                                </>
                            ) : ""
                        }
                        <Slider
                            asNavFor={nav1}
                            ref={slider => (slider2 = slider)}
                            slidesToShow={2}
                            swipeToSlide={true}
                            focusOnSelect={true}
                        >
                            {
                                slideShow.length > 1 ? slideShow.map(data => {
                                    return (
                                        <div>
                                            <img
                                                src={data}
                                                onError={(e) => { e.target.src = "image_path_here" }}
                                                width={"100%"}
                                            />
                                        </div>
                                    )
                                }) : ""
                            }
                        </Slider>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h2>{(productDetail && productDetail.title) ? productDetail.title : ""}</h2>
                    {
                        (productDetail && productDetail.description && productDetail.description.indexOf('</') !== -1) ? (
                            <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: productDetail.description.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                        ) : (
                                <Typography variant="body2" color="textSecondary" component="h2">{(productDetail && productDetail.description) ? productDetail : ""}</Typography>
                            )
                    }
                    <br />
                    <Typography variant="h4" gutterBottom >
                        {
                            productDetail && productDetail.priceSales && productDetail.priceSales > 0 ?
                                (
                                    <del>
                                        {
                                            (productDetail && productDetail.price) ? FormatMoney(productDetail.price) : ""
                                        }
                                        {` `}
                                        {unitPrice}
                                    </del>
                                ) : productDetail && productDetail.price && productDetail.price ?
                                    <>
                                        <b style={{ color: 'red' }}>
                                            {productDetail.price}
                                        </b>
                                        {` `}
                                        <b style={{ color: 'red' }}>
                                            {unitPrice}
                                        </b>
                                    </>
                                    :
                                    ""
                        }
                        <br />
                        {
                            (productDetail && productDetail.priceSales && productDetail.priceSales > 0) ?
                                (
                                    <>
                                        <b style={{ color: 'red' }}>
                                            {
                                                FormatMoney(productDetail.priceSales)
                                            }
                                        </b>
                                        {` `}
                                        <b style={{ color: 'red' }}>
                                            {
                                                unitPrice
                                            }
                                        </b>
                                    </>
                                )
                                :
                                ''
                        }
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <br />
                        {
                            productDetail && productDetail.object && productDetail.object.length > 0 ?
                                (
                                    productDetail.object[0] && productDetail.object[0].from && productDetail.object[0].from.length > 0 ?
                                        (
                                            <>
                                                <Typography><b>From:</b> {productDetail.object[0].from.toString()} </Typography>
                                            </>
                                        )
                                        :
                                        (
                                            ""
                                        )
                                )
                                :
                                ("")
                        }
                        <br />
                        {
                            productDetail && productDetail.object && productDetail.object.length > 0 ?
                                (
                                    productDetail.object[0] && productDetail.object[0].to && productDetail.object[0].to.length > 0 ?
                                        (
                                            <>
                                                <Typography><b>To:</b> {productDetail.object[0].to.toString()} </Typography>
                                            </>
                                        )
                                        :
                                        (
                                            ""
                                        )
                                )
                                :
                                ("")
                        }
                        <br />
                        {
                            productDetail && productDetail.object && productDetail.object.length > 0 ?
                                (
                                    productDetail.object[0] && productDetail.object[0].transport && productDetail.object[0].transport.length > 0 ?
                                        (
                                            <>
                                                <Typography><b>Transport:</b> {productDetail.object[0].transport.toString()} </Typography>
                                            </>
                                        )
                                        :
                                        (
                                            ""
                                        )
                                )
                                :
                                ("")
                        }
                        {
                            productDetail && productDetail.object && productDetail.object.length > 0 ?
                                (
                                    productDetail.object[0] && productDetail.object[0].timego && productDetail.object[0].timego.length > 0 ?
                                        (
                                            <>
                                                <Typography><b>Duration of Stay:</b> {productDetail.object[0].timego} </Typography>
                                            </>
                                        )
                                        :
                                        (
                                            ""
                                        )
                                )
                                :
                                ("")
                        }
                    </div>
                </Grid>
            </Grid>
            <hr />
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
