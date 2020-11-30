import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useLocation, useNavigate } from "react-router-dom"
import NotFoundElementView from '../../components/Errors/NotFoundElementView'
import EngagementCard from '../../components/Product/Engagement'
import { API, SETTING } from '../../constants'
import { fetchGet } from '../../libs/apiApp'
import { ClearHTMLTag, FormatMoney } from '../../libs/Functions'
import getParamsUrl from '../../utils/getParamsUrl'

const ITEM_FILTER_PAGE = {
    "type.key": "destination"
}

const useStyles = makeStyles((theme) => ({
    animationBox: {
        height: '100%'
    }
}));

const ProductView = ({
    filterPageDefault = ITEM_FILTER_PAGE,
    pathDirectProductDefault = "/",
    categoriesObject = 'DESTINATION',
    ...rest
}) => {
    const classes = useStyles()

    const [product, setProduct] = React.useState([])
    const [productCount, setProductCount] = React.useState(0)
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const [isLoadMore, setLoadMore] = React.useState(true)
    const [pathDirectProduct, setPathDirectProduct] = React.useState(pathDirectProductDefault)
    const [filterPage, setFillterPage] = React.useState({ ...filterPageDefault });

    const navigate = useNavigate();
    const location = useLocation();

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        try {
            const itemFilterConditional = { ...filterPageDefault }
            if (location && location.search && location.search !== "") {
                const category = getParamsUrl(`https://thangtran.se${location.search}`, 'category')
                if (category && category !== '')
                    itemFilterConditional.and = [{ ...itemFilterConditional }, { "type.key": category }]
            }
            setFillterPage({ ...itemFilterConditional })
            fetchGet({
                url: API.product + '/count',
                dataRequest: {
                    where: {
                        ...itemFilterConditional
                    }
                }
            }).then(dataCount => {
                if (dataCount && dataCount.count) {
                    fetchGet({
                        url: API.product,
                        dataRequest: {
                            filter: {
                                limit: SETTING.LIST_ITEM_PER_PAGE,
                                order: ["_createAt DESC"],
                                where: {
                                    ...itemFilterConditional
                                }
                            }
                        }
                    }).then(data => {
                        if (data.length >= dataCount.count) {
                            setLoadMore(false)
                        }
                        setProductCount(dataCount.count)
                        if (data) {
                            setProduct([...product, ...data])
                        }
                    }).catch(error => error)
                } else {
                    setLoadMore(false)
                }
            }).catch(error => error)
        } catch (error) {
            console.log("thangtran.viewProduct.product:", error)
        }
    }, [location]);

    const progressRef = React.useRef(() => { });

    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    useEffect(() => {
        // Hiệu úng cho LinearProgress
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);
        return () => {
            clearInterval(timer);
        };
        // END - Hiệu úng cho LinearProgress
    }, []);

    const handleLoadMore = async (page) => {
        // The first loading
        if (product.length === 0 && productCount === 0) {
            return
        }
        // Check loading full
        if (product.length >= productCount) {
            setLoadMore(false)
        } else {
            const resultProductNew = await fetchGet({
                url: API.product,
                dataRequest: {
                    filter: {
                        limit: SETTING.LIST_ITEM_PER_PAGE,
                        order: ["_createAt DESC"],
                        skip: product.length,
                        where: {
                            ...filterPage
                        }
                    }
                }
            }).then(data => data).catch(error => error)
            if (resultProductNew) {
                setProduct([...product, ...resultProductNew])
            }
        }
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: 95 }}>
            <Grid container spacing={3}>
                <Grid item xs className={"lineTitle lineTitleLeftBlue"}>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>
                        <Typography variant="caption" style={{ color: '#1f77ba', fontSize: 18 }} align={'center'}>
                            <b>{categoriesObject}</b>
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs className={"lineTitle lineTitleRightBlue"}>
                </Grid>
            </Grid>
            <div style={{ minHeight: '80vh' }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleLoadMore}
                    hasMore={isLoadMore}
                    loader={<div className="loader" key={0}><LinearProgress variant="buffer" value={progress} valueBuffer={buffer} /></div>}
                >
                    <Grid container spacing={1}>
                        {
                            product && product.length > 0 ? product.map((data, index) => {
                                return (
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <div className={classes.animationBox}>
                                            <EngagementCard
                                                productImage={`${process.env.REACT_APP_URL_FILE_IMAGE}${data.image}`}
                                                productTitle={data.title}
                                                productSlug={pathDirectProduct + data.slug}
                                                productDescription={ClearHTMLTag(data.description)}
                                                productPrice={FormatMoney(data.price)}
                                            />
                                        </div>
                                    </Grid>
                                )
                            })
                                :
                                (
                                    <NotFoundElementView />
                                )
                        }
                    </Grid>
                </InfiniteScroll>
            </div>
            <br />
            <br />
            <br />
        </Container>
    )
}

export default ProductView
