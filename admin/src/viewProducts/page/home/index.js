import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import { API, SETTING } from 'src/constants';
import { fetchGet, fetchPost } from '../../../libs/apiApp';
import IMAGE_BACKGROUND from "./background-1.png";
import IMAGE_LOGO from "./Logo.png";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const insideStyles = {
    minWidth: '350px',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: 25,
    fontWeight: 500,
    color: '#fff'
};

const styleParalex = (percentage) => ({
    position: "absolute",
    background: `rgba(0, 0, 0, ${percentage * 1})`,
    left: "50%",
    top: "50%",
    borderRadius: "0%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    height: percentage * 130
})

const initHomeContent = {
    content: "",
    element: [],
    setting: {},
    title: ""
}

const KEY_FILTER = "image_main"

const useStyles = makeStyles((theme) => ({
    titleContent: {
        padding: 30,
        borderRadius: '5px',
        color: '#fff' // color tag "link"
    }
}));

const App = () => {
    const classes = useStyles()

    const [homeContent, setHomeContent] = React.useState({ ...initHomeContent });
    const [valuesElementProduct, setValuesElementProduct] = React.useState([]);

    useEffect(() => {
        fetchGet({
            url: API.page + "/home"
        }).then(data => {
            if (data) {
                if (data.error) {
                    throw ("error")
                } else {
                    updateElement(data)
                }
            }
        }).catch(error => {
            console.log("thangtran.error", error)
        })
    }, []);

    /**
     * 
     * @param {*} detailItem List id Product or News
     */
    const updateElement = async (detailItem) => {
        const detailItemElement = detailItem.element ? detailItem.element : initHomeContent.element;
        if (detailItemElement && detailItemElement.length > 0) {
            let dataProduct = detailItemElement.filter(fil => { if (fil.type === "product") return fil.object })
            dataProduct = dataProduct.map(data => data.object)
            await fetchPost({
                url: API.product + '/listid',
                dataRequest: dataProduct
            }).then(data => {
                if (data && data.error) {
                    throw "Có lỗi trong quá trình lấy dữ liệu từ Server!"
                } else {
                    let dataShow = data
                    let dataProductImage = detailItemElement.filter(fil => { if (fil.type === KEY_FILTER) return fil })
                    dataProductImage = dataProductImage.map(data => data.object)
                    if (dataProductImage && dataProductImage.length > 0) {
                        for (const productImage in dataProductImage) {
                            dataShow.unshift({
                                title: "Hình ảnh đại diện",
                                description: "Hình ảnh đại diện",
                                image: dataProductImage[productImage],
                                productId: Math.random().toString(36).substring(7)
                            })
                        }
                    }
                    setValuesElementProduct(dataShow)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        setHomeContent({
            title: detailItem.title ? detailItem.title : initHomeContent.title,
            key: detailItem.key ? detailItem.key : initHomeContent.key,
            url: detailItem.url ? detailItem.url : initHomeContent.url,
            content: detailItem.content ? detailItem.content : initHomeContent.content,
            element: detailItemElement,
            setting: detailItem.element ? detailItem.setting : initHomeContent.setting,
        });
    }

    return (
        <div style={styles}>
            <Parallax
                bgImage={IMAGE_BACKGROUND}
                strength={500}
                renderLayer={percentage => (
                    <div>
                        <div
                            style={{
                                position: "absolute",
                                background: `url(${IMAGE_LOGO})`,
                                left: "50%",
                                top: "45%",
                                borderRadius: "10%",
                                transform: "translate(-50%,-50%)",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'top',
                                width: percentage * 600,
                                height: percentage * 600
                            }}
                        />
                    </div>
                )}
            >
                <div style={{ height: '80vh' }}>
                    <div style={insideStyles}></div>
                </div>
            </Parallax>
            {
                valuesElementProduct && valuesElementProduct.map((data, index) => {
                    let image = SETTING.URL_IMAGE_PATH_SERVER + '/' + data.image
                    switch (index) {
                        case 0:
                            return (
                                <Parallax bgImage={image} blur={{ min: -1, max: 3 }}
                                    renderLayer={percentage => (
                                        <div>
                                            <div
                                                style={styleParalex(percentage)}
                                            />
                                        </div>
                                    )}
                                >
                                    <div style={{ height: '85vh' }}>
                                        <Link to={"/product/" + data.slug}>
                                            <div style={insideStyles}>
                                                <div className={`${classes.titleContent} noselect`}>{data.title}</div>
                                                <div className={`circle`}></div>
                                            </div>
                                        </Link>
                                    </div>
                                </Parallax>
                            )
                        case 1:
                            return (
                                <Parallax bgImage={image} strength={-100}
                                    renderLayer={percentage => (
                                        <div>
                                            <div
                                                style={styleParalex(percentage)}
                                            />
                                        </div>
                                    )}
                                >
                                    <div style={{ height: '85vh' }}>
                                        <div style={insideStyles}>
                                            <Link to={"/product/" + data.slug}>
                                                <div style={insideStyles}>
                                                    <div className={`${classes.titleContent} noselect`}>{data.title}</div>
                                                    <div className={`circle`}></div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Parallax>
                            )
                        case 2:
                            return (
                                <Parallax bgImage={image} strength={200}
                                    renderLayer={percentage => (
                                        <div>
                                            <div
                                                 style={styleParalex(percentage)}
                                            />
                                        </div>
                                    )}
                                >
                                    <div style={{ height: '85vh' }}>
                                        <div style={insideStyles}>
                                            <Link to={"/product/" + data.slug}>
                                                <div style={insideStyles}>
                                                    <div className={`${classes.titleContent} noselect`}>{data.title}</div>
                                                    <div className={`circle`}></div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Parallax>
                            )
                        default:
                            return (
                                <Parallax bgImage={image} strength={200}
                                    renderLayer={percentage => (
                                        <div>
                                            <div
                                                 style={styleParalex(percentage)}
                                            />
                                        </div>
                                    )}
                                >
                                    <div style={{ height: '80vh' }}>
                                        <div style={insideStyles}>
                                            <Link to={"/product/" + data.slug}>
                                                <div style={insideStyles}>
                                                    <div className={`${classes.titleContent} noselect`}>{data.title}</div>
                                                    <div className={`circle`}></div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Parallax>
                            )
                    }

                })
            }
            <br />
        </div >
    )
};

export default App;