import {

    Button,
    Container,

    Grid,

    makeStyles,
    Paper,

    TextField, Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { API, SETTING } from 'src/constants';
import EmojisBasic from 'src/libs/Emojis/basic';
import {
    actionUploadFile,
    fetchPageUpdate,

    getDetailItem,
    setDefaulGetPage
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import { fetchPost, UploadFile } from '../../../libs/apiApp';
import AddConditional from './addConditional';
import AddItemDialog from './addItem';
import { PopularListItem } from './PopularListItem';

const KEY_FILTER = "image_main"
const typeReducer = "Page"

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    title: {
        width: '100%'
    },
    paper: {
        padding: '10px 30px 30px 30px'
    },
    rowSpaceEvenly: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    EditorLayout: {
        minHeight: '60vh'
    }
}));

const initValues = {
    title: '',
    key: '',
    url: '',
    content: '',
    element: [],
    setting: {}
};

const initDialog = {
    status: false,
    title: '',
    content: '',
    redirectTo: '',
    rejectFn: () => { },
    confirmFn: () => { }
};

const CURDPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const detailItem = useSelector((state) => SELECTOR.pageDetial(state));

    const [values, setValues] = React.useState({ ...initValues });
    const [valuesElementProduct, setValuesElementProduct] = React.useState([]);
    const [open, setOpen] = React.useState(initDialog);
    const [disSubmitButton, setDisSubmitButton] = React.useState(false);

    const [openEditHome, setOpenEditHome] = React.useState(false);
    const [openEditContent, setOpenEditContent] = React.useState(false);

    const [openDialogAddItem, setopenDialogAddItem] = React.useState(false);
    const [openDialogAddConditional, setopenDialogAddConditional] = React.useState(false);

    const [editContent, setEditContent] = React.useState(EditorState.createEmpty())

    // IMAGE UPLOAD
    const [openDropzoneDialog, setOpenDropzoneDialog] = React.useState(false);

    /**
     * handle upload file open popup
     * @param {*} event 
     */
    const handleOpenDropzoneDialog = (event) => {
        setOpenDropzoneDialog(!openDropzoneDialog)
    }
    /**
     * Handle when submit file
     * @param {*} files 
     */
    const handleSaveDropzoneDialog = async (files) => {
        dispatch(actionUploadFile(files))
        setOpenDropzoneDialog(false)
        valuesElementProduct.unshift({
            title: "Hình ảnh đại diện",
            description: "Hình ảnh đại diện",
            image: files[0].path,
            productId: Math.random().toString(36).substring(7)
        })
        values.element.unshift({
            type: KEY_FILTER,
            object: files[0].path
        })
    }

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getDetailItem({ idItem: id, typeReducer }));
        }
        return () => {
            dispatch(setDefaulGetPage({ status: undefined }))
        }
    }, [id]);

    useEffect(() => {
        if (detailItem) {
            switch (detailItem.key) {
                case "home":
                    updateElement(detailItem)
                    setOpenEditHome(true)
                    break;
                case "write-to-us":
                case "testimonial":
                case "unique-experience":
                case "agent-hub":
                case "about-us":
                    if (detailItem.setting) {
                        const contentDescriptionBlock = detailItem.setting.contentMain ? htmlToDraft(detailItem.setting.contentMain) : "";
                        if (contentDescriptionBlock) {
                            const contentDescriptionState = ContentState.createFromBlockArray(contentDescriptionBlock.contentBlocks);
                            const editorDescriptionState = EditorState.createWithContent(contentDescriptionState);
                            setEditContent(editorDescriptionState)
                        }
                    }
                    setValues({
                        title: detailItem.title ? detailItem.title : initValues.title,
                        key: detailItem.key ? detailItem.key : initValues.key,
                        url: detailItem.url ? detailItem.url : initValues.url,
                        content: detailItem.content ? detailItem.content : initValues.content,
                        element: detailItem.element ? detailItem.element : initValues.element,
                        setting: detailItem.setting ? detailItem.setting : initValues.setting,
                    });
                    setOpenEditContent(true)
                    break;
                default:
                    break;
            }
        } else {
            setValues({ ...initValues });
        }
    }, [detailItem]);

    /**
     * 
     * @param {*} detailItem List id Product or News
     */
    const updateElement = async (detailItem) => {
        const detailItemElement = detailItem.element ? detailItem.element : initValues.element;
        if (detailItemElement && detailItemElement.length > 0) {
            let dataProduct = detailItemElement.filter(fil => { if (fil.type === "product") return fil })
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
                console.log("thangtran.error", error)
                toast.error("Có lỗi trong quá trình lấy dữ liệu từ Server!")
            })
        }
        setValues({
            title: detailItem.title ? detailItem.title : initValues.title,
            key: detailItem.key ? detailItem.key : initValues.key,
            url: detailItem.url ? detailItem.url : initValues.url,
            content: detailItem.content ? detailItem.content : initValues.content,
            element: detailItemElement,
            setting: detailItem.setting ? detailItem.setting : initValues.setting,
        });
    }

    /**
       * Change content with type input
       * @param {*} prop: key work
       * @param {*} event:
       */
    const handleChange = (prop) => (event) => {
        const dataSave = event.target.value;
        setValues({ ...values, [prop]: dataSave });
    };

    /**
     * handle when press submit && save to server
     * @param {*} event
     */
    const handleSubmit = (event) => {
        const dataSend = values;
        if (dataSend.title === '' || dataSend.title.length <= 0) {
            toast.warn('Tiêu đề không được bỏ trống');
            return;
        }
        if (dataSend.content === '' || dataSend.content.length <= 0) {
            toast.warn('Nội dung không được bỏ trống');
            return;
        }

        switch (detailItem.key) {
            case "home":
                setDisSubmitButton(true);
                dataSend.title = dataSend.title.trim();
                dataSend.content = dataSend.content.trim();
                if (dataSend.element) {
                    dataSend.element = dataSend.element.filter(fil => fil.object && fil.type && fil.object.length > 0 && fil.type.length > 0)
                }
                break;
            case "agent-hub":
            case "write-to-us":
            case "about-us":
                const description = draftToHtml(convertToRaw(editContent.getCurrentContent()))
                const valuesTemp = values
                valuesTemp.setting.contentMain = description
                break;
            default:
                return;
        }

        dispatch(fetchPageUpdate({ data: { ...dataSend }, _id: dataSend.key }));
        setDisSubmitButton(false);
    };

    /**
     * Handle close popup "add item product"
     * @param {*} dataCB callback
     */
    const handleCloseAddItemProduct = (dataCB) => {
        let data = values
        for (let i = 0; i < dataCB.length; i++) {
            data.element.push({
                type: 'product',
                object: dataCB[i].productId
            })
        }
        updateElement(values)
        setopenDialogAddItem(false);
    };

    const handleClosesetAddConditional = (dataCB) => {
        setopenDialogAddConditional(false);
    };

    /**
     * Change content wysiwyg
     * @param {*} data: key work
     * @param {*} editorState: 
     */
    const onEditorStateChange = data => (editorState) => {
        setEditContent(editorState);
    };

    return (
        <Page
            className={classes.root}
            title="Products"
        >
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Paper className={classes.paper}>
                            <br />
                            <TextField
                                className={classes.title}
                                label="Tiêu đề"
                                color="secondary"
                                value={values.title}
                                defaultValue={detailItem.title}
                                onChange={handleChange('title')}
                            />
                            <br />
                            <br />
                            <TextField
                                className={classes.title}
                                label="Mô tả"
                                color="secondary"
                                value={values.content}
                                defaultValue={detailItem.content}
                                onChange={handleChange('content')}
                            />
                        </Paper>
                        <br />
                        {
                            openEditHome ? (
                                <Paper className={classes.paper}>
                                    {
                                        valuesElementProduct && valuesElementProduct.length > 0 ? (
                                            valuesElementProduct.map((data, index) => {
                                                let time = new Date(data.createAt)
                                                return (
                                                    <div className={classes.rowBetween} key={"dev-" + index}>
                                                        <PopularListItem
                                                            title={data.title}
                                                            description={data.description}
                                                            image={data.image}
                                                            updateAt={time.toLocaleString()}
                                                        />
                                                        <Tooltip title="Xóa nội dung khỏi trang chính">
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="Xóa"
                                                                onClick={() => {
                                                                    let dataDelete = valuesElementProduct
                                                                    dataDelete = dataDelete.filter(fil => {
                                                                        if (fil.productId !== data.productId) {
                                                                            return fil
                                                                        }
                                                                    })
                                                                    setValuesElementProduct(dataDelete)
                                                                    let dataValueDelete = values
                                                                    let elementValue = dataValueDelete.element
                                                                    elementValue = elementValue.filter(fil => {
                                                                        if (fil.object !== data.productId) {
                                                                            return fil
                                                                        }
                                                                    })
                                                                    dataValueDelete.element = elementValue
                                                                    setValues({ ...dataValueDelete })
                                                                }}
                                                            >
                                                                <DeleteSweepIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            })
                                        ) : ""
                                    }
                                    <hr />
                                    <Tooltip title="Thêm nội dung cố định">
                                        <IconButton
                                            color="primary"
                                            aria-label="Thêm mới nội dung"
                                            onClick={() => {
                                                setopenDialogAddItem(true);
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Thêm hình ảnh">
                                        <IconButton
                                            color="primary"
                                            aria-label="Thêm hình ảnh"
                                            onClick={() => {
                                                handleOpenDropzoneDialog(true);
                                            }}
                                        >
                                            <AspectRatioIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Paper>
                            ) : ""
                        }
                        {
                            openEditContent ? (
                                <Paper className={classes.paper}>
                                    <div className={classes.EditorLayout}>
                                        <Editor
                                            wrapperClassName="thangtm13_wrapper"
                                            editorClassName="thangtm13_editor"
                                            onEditorStateChange={onEditorStateChange("content")}
                                            editorState={editContent}
                                            toolbar={{
                                                image: {
                                                    uploadCallback: UploadFile,
                                                    alt: { present: true, mandatory: true },
                                                    previewImage: true,
                                                    inputAccept: SETTING.FILE_UPLOAD_IMAGE.toString(),
                                                },
                                                emoji: {
                                                    emojis: EmojisBasic,
                                                },
                                            }}
                                        />
                                    </div>
                                </Paper>
                            ) : ""
                        }
                    </Grid>
                    {/* --------------------------------------------------------------------------------- */}
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <br />
                            <Typography
                                align="left"
                                color="textPrimary"
                                variant="caption"
                                display="block"
                                gutterBottom
                            >Tùy chọn</Typography>
                            <div className={classes.rowSpaceEvenly}>
                                <Button
                                    style={{ color: 'red', width: '50%' }}
                                    onClick={() => {
                                        setOpen({
                                            ...open,
                                            status: true,
                                            title: 'Xác nhận thao tác',
                                            content: 'Bạn có muốn nhập lại tất cả dữ liệu đã nhập hiện tại?',
                                            confirmFn: () => {
                                                if (id) {
                                                    dispatch(getDetailItem({ idItem: id, typeReducer }));
                                                }
                                                setOpen(initDialog);
                                                setValues({ ...initValues });
                                            },
                                            rejectFn: () => {
                                                setOpen(initDialog);
                                            }
                                        });
                                    }}
                                >Nhập lại</Button>
                                <Button color="secondary" style={{ width: '50%' }} onClick={handleSubmit} disabled={disSubmitButton}>Thay đổi</Button>
                            </div>
                        </Paper>
                    </Grid>
                    {/* --------------------------------------------------------------------------------- */}
                </Grid>
                <DialogDefault open={open} />
            </Container>

            <DropzoneDialog
                open={openDropzoneDialog}
                onSave={handleSaveDropzoneDialog}
                acceptedFiles={SETTING.FILE_UPLOAD_IMAGE}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleOpenDropzoneDialog}
            />


            <AddItemDialog
                statusOpen={openDialogAddItem}
                cbHanldeClose={handleCloseAddItemProduct}
            />
            <AddConditional
                statusOpen={openDialogAddConditional}
                cbHanldeClose={handleClosesetAddConditional}
            />
        </Page>
    );
};

export default CURDPage;
