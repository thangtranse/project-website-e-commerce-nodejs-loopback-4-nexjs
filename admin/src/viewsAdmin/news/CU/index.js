import {
    Box,


    Button,
    Container,






    FormControl,
    FormControlLabel,




    Grid,



    makeStyles,
    Paper,














    TextField, Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StarOutlineIcon from '@material-ui/icons/StarBorder';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import { toast } from "react-toastify";
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import { UploadFile } from 'src/libs/apiApp';
import EmojisBasic from 'src/libs/Emojis/basic';
import {
    actionDeleteFileUpload, actionUploadFile,

    actionUploadFileClearStorage,






    fetchCategory, fetchNewsCreate as fetchCreate,


    fetchNewsUpdate as fetchUpdate,
    getDetailItem as getItem,
    setDefaulCreateNews as setDefaulCreateItem,


    setDefaulGetNews as setDefaulGetItem
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import RemoveAccents from 'src/utils/setUrlPath';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    productCard: {
        height: '100%'
    },
    title: {
        width: '100%'
    },
    paper: {
        padding: '10px 30px'
    },
    paperEditor: {
        minHeight: '60vh'
    },
    rowSpaceEvenly: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rowSpaceBetween: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        margin: "20px 0",
        minHeight: 58,
        justifyContent: 'space-between'
    },

    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    titleImageGrid: {
        color: '#fff',
    },
    titleBarImageGrid: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const initValues = {
    title: '',
    type: [],
    slug: '',
    details: EditorState.createEmpty(),
    description: EditorState.createEmpty(),
    best: "",
    image: "",
    album: []
}

const initDialog = {
    status: false,
    title: '',
    content: '',
    redirectTo: '',
    rejectFn: () => { },
    confirmFn: () => { }
}

/**
 * [EDIT-HERE]:
 * */
const SettingFunction = {
    redirectTo: '/news', // chuyển hướng khi thao tác thành công 
    ItemID: "NewsId", // ID của Item
}
const typeReducer = "News";


const CURDProduct = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();

    /**
     * [EDIT-HERE]: 
     * detailItem: lấy chi tiết nội dung Item cần thay đổi
     * createStatus: lấy trạng thái khi thực hiện lưu Item
     */
    const dataCategory = useSelector(state => SELECTOR.ctgSelector(state));
    const detailItem = useSelector(state => SELECTOR.newsDetial(state));
    const createStatus = useSelector(state => SELECTOR.newsCreateStatus(state));
    const fileUpload = useSelector(state => SELECTOR.ListFileUpload(state));

    const [values, setValues] = React.useState({ ...initValues });
    const [isEditView, setEditView] = React.useState(false);
    const [open, setOpen] = React.useState(initDialog);
    const [disSubmitButton, setDisSubmitButton] = React.useState(false);
    const [openDropzoneDialog, setOpenDropzoneDialog] = useState(false);

    /**
     * [EDIT-HERE]: Load data ITEM lên để Edit
     */
    useEffect(() => {
        if (detailItem && detailItem[SettingFunction.ItemID] && detailItem[SettingFunction.ItemID] === id) {

            let dataTemp = { ...initValues };

            dataTemp.title = detailItem.title
            dataTemp.slug = detailItem.slug
            dataTemp.type = detailItem.type ? detailItem.type : []
            dataTemp.price = detailItem.price
            dataTemp.album = detailItem.album
            dataTemp.image = detailItem.image

            if (detailItem.object && detailItem.object.length > 0) {
                // Object more
            }

            const contentDetailsBlock = htmlToDraft(detailItem.details);
            if (contentDetailsBlock) {
                const contentState = ContentState.createFromBlockArray(contentDetailsBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                dataTemp.details = editorState
            }
            const contentDescriptionBlock = htmlToDraft(detailItem.description);
            if (contentDescriptionBlock) {
                const contentDescriptionState = ContentState.createFromBlockArray(contentDescriptionBlock.contentBlocks);
                const editorDescriptionState = EditorState.createWithContent(contentDescriptionState);
                dataTemp.description = editorDescriptionState
            }
            setValues({ ...dataTemp })
        }
        return () => {
            dispatch(setDefaulGetItem({ status: undefined }))
            dispatch(actionUploadFileClearStorage())
        }
    }, [detailItem])

    useEffect(() => {
        if (id) {
            setEditView(true)
            dispatch(getItem({ idItem: id, typeReducer }))
        } else {
            setValues({ ...initValues })
        }
        dispatch(fetchCategory({ where: { type: 'News' } }))

    }, [id])

    if (typeof createStatus === 'boolean' && createStatus) {
        setValues({ ...initValues })
        dispatch(setDefaulCreateItem({ status: undefined }))
        if (isEditView) {
            setOpen({
                ...open,
                status: true,
                title: 'Thông báo, thực hiện thao tác thành công',
                content: 'Bài viết đã được cập nhật',
                redirectTo: SettingFunction.redirectTo
            })
        } else {
            setOpen({
                ...open,
                status: true,
                title: 'Thông báo, thực hiện thao tác thành công',
                content: 'Bài viết mới đã được đăng tải',
                redirectTo: SettingFunction.redirectTo
            })
        }
    }

    /**
     * Change content wysiwyg
     * @param {*} data: key work
     * @param {*} editorState: 
     */
    const onEditorStateChange = data => (editorState) => {
        setValues({ ...values, [data]: editorState });
    };

    /**
     * Change content with type input
     * @param {*} prop: key work
     * @param {*} event: 
     */
    const handleChange = (prop) => (event) => {
        let slug = values.slug
        let dataSave = event.target.value

        if (prop === 'slug') {
            slug = RemoveAccents(event.target.value)
        }
        if (prop === 'title') {
            slug = RemoveAccents(event.target.value)
        }

        if (prop === 'type') {
            dataSave = values.type
            let dataCheck = dataSave.filter(dataFilter => dataFilter.key === event.target.name)
            if (dataCheck && dataCheck.length !== 0) {
                if (!event.target.checked) {
                    dataSave = dataSave.filter(dataMap => dataMap.key !== event.target.name)
                }
            } else {
                if (event.target.checked) {
                    dataSave.push({
                        key: event.target.name,
                        title: event.target.value
                    })
                }
            }
        }

        setValues({ ...values, [prop]: dataSave, slug });

    };

    /**
     * [EDIT-HERE]: handle when press submit
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        let dataSend = values;
        if (dataSend.title === '' || dataSend.title.length <= 0) {
            toast.warn("Tiêu đề không được bỏ trống");
            return;
        }
        if (dataSend.slug === '' || dataSend.slug.length <= 0) {
            toast.warn("Đường dẫn không được bỏ trống");
            return;
        }
        setDisSubmitButton(true)
        let description = draftToHtml(convertToRaw(values.description.getCurrentContent()))
        let details = draftToHtml(convertToRaw(dataSend.details.getCurrentContent()))
        let alm = values.album ? values.album : initValues.album
        if (fileUpload && fileUpload.length > 0) {
            dataSend.image = fileUpload[0].title
            fileUpload.map(data => alm.push(data.title))
            dataSend.album = alm
        }
        if (isEditView) {
            dispatch(fetchUpdate({ data: { ...dataSend, description, details }, _id: id }))
            return
        }
        dispatch(fetchCreate({ data: { ...dataSend, description, details } }))
        return
    }

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
    }

    return (
        <Page
            className={classes.root}
            title="Products"
        >
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Paper className={classes.paper}>
                            <Box mt={3}>
                                <TextField className={classes.title} label="Tiêu đề" color="secondary" value={values.title} onChange={handleChange('title')} />
                            </Box>
                            <br />
                            <Typography
                                align="left"
                                color="textPrimary"
                                variant="caption" display="block" gutterBottom
                            >Mô tả ngắn</Typography>
                            <Editor
                                toolbarOnFocus
                                toolbarClassName="rdw-storybook-toolbar-absolute"
                                wrapperClassName="rdw-storybook-wrapper-margined"
                                editorClassName="thangtm13_editor"
                                onEditorStateChange={onEditorStateChange("description")}
                                editorState={values.description}
                                toolbar={{
                                    options: ['inline', 'fontSize', 'fontFamily'],
                                    inline: {
                                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                                        bold: { className: 'bordered-option-classname' },
                                        italic: { className: 'bordered-option-classname' },
                                        underline: { className: 'bordered-option-classname' },
                                        strikethrough: { className: 'bordered-option-classname' },
                                        code: { className: 'bordered-option-classname' },
                                    },
                                    blockType: {
                                        className: 'bordered-option-classname',
                                    },
                                    fontSize: {
                                        className: 'bordered-option-classname',
                                    },
                                    fontFamily: {
                                        className: 'bordered-option-classname',
                                    },
                                }}
                            />

                            <Box mt={3} className={classes.paperEditor}>
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="caption" display="block" gutterBottom
                                >
                                    Nội dung chính
                                </Typography>
                                <Editor
                                    wrapperClassName="thangtm13_wrapper"
                                    editorClassName="thangtm13_editor"
                                    onEditorStateChange={onEditorStateChange("details")}
                                    editorState={values.details}
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
                                <br />
                                <hr />
                                <br />
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="caption" display="block" gutterBottom
                                >Thuộc tính sản phẩm (SP)</Typography>

                                <br />

                                <FormControl component="fieldset" className={classes.rowSpaceEvenly} style={{ fontSize: '0.75rem' }}>
                                    <Typography
                                        align="left"
                                        color="textPrimary"
                                        variant="caption" display="block" gutterBottom
                                    >Chủ đề</Typography>
                                    {
                                        dataCategory.map((data, index) => {
                                            const filCheck = (values.type && typeof values.type === 'object') ? values.type.filter(dataValue => dataValue.key === data.slug) : []
                                            let check = filCheck && filCheck.length !== 0 ? true : false
                                            return (
                                                <FormControlLabel
                                                    key={data.key + "_" + index}
                                                    control={
                                                        <Checkbox
                                                            checked={check}
                                                            onChange={handleChange("type")}
                                                            name={data.slug}
                                                            value={data.title}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={data.title}
                                                />
                                            )
                                        })
                                    }
                                </FormControl>
                                <br />
                                <br />
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="caption" display="block" gutterBottom
                                >
                                    Hình đại hiện
                                </Typography>
                                <Button onClick={handleOpenDropzoneDialog}>Thêm hình ảnh</Button>
                                <DropzoneDialog
                                    open={openDropzoneDialog}
                                    onSave={handleSaveDropzoneDialog}
                                    acceptedFiles={SETTING.FILE_UPLOAD_IMAGE}
                                    showPreviews={true}
                                    maxFileSize={5000000}
                                    onClose={handleOpenDropzoneDialog}
                                />
                                <div style={{ marginTop: 10 }}>
                                    <GridList className={classes.gridList} cols={2.5}>
                                        {
                                            fileUpload && fileUpload.length > 0 ? fileUpload.map((tile) => (
                                                <GridListTile key={tile.title}>
                                                    <img src={tile.path} alt={tile.title} />
                                                    <GridListTileBar
                                                        title={tile.title}
                                                        classes={{
                                                            root: classes.titleBarImageGrid,
                                                            title: classes.titleImageGrid,
                                                        }}
                                                        actionIcon={
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <IconButton aria-label={`star ${tile.title}`}>
                                                                    <DeleteOutlineIcon onClick={() => dispatch(actionDeleteFileUpload(tile))} className={classes.titleImageGrid} />
                                                                </IconButton>
                                                                <Tooltip title="Thêm ảnh đại diện" aria-label="add">
                                                                    <IconButton aria-label={`star ${tile.title}`}>
                                                                        <StarOutlineIcon onClick={() => {
                                                                            setValues({ ...values, image: tile.originalname })
                                                                        }} className={classes.titleImageGrid} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        }
                                                    />
                                                </GridListTile>
                                            )) : ""
                                        }
                                        {
                                            values.album && values.album.length > 0 ? values.album.map((tile, index) => (
                                                <GridListTile key={tile.title}>
                                                    <img src={SETTING.URL_IMAGE_PATH_SERVER + "/" + tile} alt={tile.title} />
                                                    <GridListTileBar
                                                        title={tile.title}
                                                        classes={{
                                                            root: classes.titleBarImageGrid,
                                                            title: classes.titleImageGrid,
                                                        }}
                                                        actionIcon={
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <Tooltip title="Xóa ảnh" aria-label="remove">
                                                                    <IconButton aria-label={`star ${tile.title}`}>
                                                                        <DeleteOutlineIcon
                                                                            onClick={() => {
                                                                                let dataImageTemp = values.album
                                                                                dataImageTemp.splice(index, 1)
                                                                                setValues({ ...values, album: dataImageTemp })
                                                                            }}
                                                                            className={classes.titleImageGrid}
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Thêm ảnh đại diện" aria-label="add">
                                                                    <IconButton aria-label={`star ${tile.title}`}>
                                                                        <StarOutlineIcon onClick={() => {
                                                                            setValues({ ...values, image: tile })
                                                                        }} className={classes.titleImageGrid} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        }
                                                    />
                                                </GridListTile>
                                            )) : ""
                                        }
                                    </GridList>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* --------------------------------------------------------------------------------- */}
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Typography
                                align="left"
                                color="textPrimary"
                                variant="caption" display="block" gutterBottom
                            >Tùy chọn</Typography>
                            <Box mt={3}>
                                <TextField className={classes.title} label="Đường dẫn" color="secondary" value={values.slug} onChange={handleChange('slug')} />
                            </Box>
                            <Box mt={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={SETTING.URL_IMAGE_PATH_SERVER + '/' + values.image} alt={values.title} style={{ maxWidth: '150px' }} />
                            </Box>
                            <br />
                            <hr />
                            <br />
                            <div className={classes.rowSpaceEvenly}>
                                <Button style={{ color: 'red', width: '50%' }} onClick={() => {
                                    setOpen({
                                        ...open,
                                        status: true,
                                        title: 'Xác nhận thao tác',
                                        content: 'Bạn có muốn nhập lại tất cả dữ liệu đã nhập hiện tại?',
                                        confirmFn: () => {
                                            setOpen(initDialog)
                                            setValues({ ...initValues })
                                        },
                                        rejectFn: () => {
                                            setOpen(initDialog)
                                        }
                                    })
                                }}>Nhập lại</Button>
                                <Button color="secondary" style={{ width: '50%' }} onClick={handleSubmit} disabled={disSubmitButton}>{isEditView ? "Thay đổi" : "Đăng"}</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <DialogDefault open={open}></DialogDefault>
            </Container>
        </Page>
    );
};

export default CURDProduct

