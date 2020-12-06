import {
    Box,


    Button,
    Container,






    FormControl,
    FormControlLabel, FormGroup,




    Grid,



    makeStyles,
    Paper,







    Switch,






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
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import { UploadFile } from 'src/libs/apiApp';
import { ProvinceVN } from 'src/libs/Data/provinceVN';
import EmojisBasic from 'src/libs/Emojis/basic';
import {
    actionDeleteFileUpload,





    actionUploadFile, actionUploadFileClearStorage, fetchCategory,

    fetchProductCreate,


    fetchProductUpdate, getDetailItem,


    setDefaulGetProduct, setProductCreateStateDefault as setDefaultStatusCreate
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import RemoveAccents from 'src/utils/setUrlPath';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const typeReducer = "Product";

const names = ProvinceVN

const transportConstants = [
    { key: 1, value: "Flight" },
    { key: 2, value: "Train" },
    { key: 3, value: "Boat" },
    { key: 4, value: "Motobike" },
    { key: 5, value: "Bicycle" },
    { key: 6, value: "Coach" },
    { key: 7, value: "Private Car" },
    { key: 8, value: "Limousine" },
];

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    rowSpaceEvenlyButton: {
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
    formControl: {
        width: '100%'
    }
}));

let initValues = {
    title: '',
    slug: '',
    type: [],
    details: EditorState.createEmpty(),
    description: EditorState.createEmpty(),
    bestSelling: false,
    priceSales: 0,
    price: 0,
    image: '',
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

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {

    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$ "
        />
    );
}

function PercentFormatCustom(props) {

    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="% "
        />
    );
}

/**
 * Tạo hoặc Thay đổi cho một Item
 * Step:
 * 1.
 */
const CURDProduct = ({ urlRoot }) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const detailProduct = useSelector(state => SELECTOR.productDetial(state)); // chi tiết product (nếu là edit)
    const createStatus = useSelector(state => SELECTOR.productCreateStatus(state)); // trạng thái sau khi tạo (lưu ý phải set lại giá trị mặc định khi sử dụng)
    const fileUpload = useSelector(state => SELECTOR.ListFileUpload(state)); // xử lý file upload
    const dataCategory = useSelector(state => SELECTOR.ctgSelector(state)); // chi tiết category

    const [values, setValues] = React.useState({ ...initValues }); // nội dung product mới (hoặc chỉnh sửa)
    const [isEditView, setEditView] = React.useState(false); // xác định đây là trang edit hay là tạo mới nếu là tạo mới giá trị -> True
    const [open, setOpen] = React.useState(initDialog); // Tùy chọn mở dialog cảnh báo
    const [disSubmitButton, setDisSubmitButton] = React.useState(false); // Trạng thái nút Submit
    const [openDropzoneDialog, setOpenDropzoneDialog] = useState(false); // Tùy chọn mở dialog cảnh báo
    const [isSelling, setIsSelling] = useState(false); // Xử lý sản phẩm BEST SELLING

    const [travelTo, setTravelTo] = React.useState([]); // option thêm của from
    const [travelFrom, setTravelFrom] = React.useState([]); // option thêm của from
    const [transport, setTransport] = React.useState([]); // option thêm của from

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setEditView(true)
            dispatch(getDetailItem({ idItem: id, typeReducer }))
        } else {
            setValues({ ...initValues })
        }
        dispatch(fetchCategory({ where: { type: 'Products' } }))
    }, [id]);

    /**
     * Xử lý sự kiện kết quả tra về khi tạo thành công
     */
    useEffect(() => {
        if (typeof createStatus !== 'undefined') { // trạng thái mặc định là "undefined"
            if (createStatus) { // Khi tạo thành công
                navigate(urlRoot)
            } else { // Khi tạo thất bại

            }
        }
    }, [createStatus]);

    /**
     * Edit content: set conent
     */
    useEffect(() => {
        if (detailProduct && detailProduct.productId && detailProduct.productId === id) {
            let dataTemp = { ...initValues };
            dataTemp.title = detailProduct.title
            dataTemp.slug = detailProduct.slug
            dataTemp.type = detailProduct.type ? detailProduct.type : []
            dataTemp.bestSelling = detailProduct.bestSelling
            dataTemp.price = detailProduct.price
            dataTemp.album = detailProduct.album
            dataTemp.image = detailProduct.image
            if (detailProduct.priceSales) {
                dataTemp.priceSales = detailProduct.priceSales
                setIsSelling(true)
            }
            if (detailProduct.object && detailProduct.object.length > 0) {
                if (detailProduct.object[0].to && detailProduct.object[0].to.length > 0)
                    setTravelTo([...detailProduct.object[0].to])
                if (detailProduct.object[0].from && detailProduct.object[0].from.length > 0)
                    setTravelFrom([...detailProduct.object[0].from])
                if (detailProduct.object[0].transport)
                    setTransport([...detailProduct.object[0].transport])
            }
            if (detailProduct.details) {
                const contentDetailsBlock = htmlToDraft(detailProduct.details);
                if (contentDetailsBlock) {
                    const contentState = ContentState.createFromBlockArray(contentDetailsBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    dataTemp.details = editorState
                }
            }
            if (detailProduct.description) {
                const contentDescriptionBlock = htmlToDraft(detailProduct.description);
                if (contentDescriptionBlock) {
                    const contentDescriptionState = ContentState.createFromBlockArray(contentDescriptionBlock.contentBlocks);
                    const editorDescriptionState = EditorState.createWithContent(contentDescriptionState);
                    dataTemp.description = editorDescriptionState
                }
            }
            setValues({ ...dataTemp })
        }
        return () => {
            dispatch(setDefaulGetProduct({ status: undefined }))
            dispatch(setDefaultStatusCreate())
            dispatch(actionUploadFileClearStorage())
        }
    }, [detailProduct])

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

        if (prop === 'transport') {
            setTransport(event.target.value);
            return
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
        if (prop === 'slug') {
            slug = RemoveAccents(event.target.value)
        }
        if (prop === 'title') {
            slug = RemoveAccents(event.target.value)
        }

        setValues({ ...values, [prop]: dataSave, slug });
    };

    /**
     * Change content with type switch
     * @param {*} prop: key work
     * @param {*} event: 
     */
    const handleChangeSwitch = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.checked });
    };

    /**
     * handle when press submit && save to server
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        let dataSend = values;
        if (dataSend.title === '' || dataSend.title.length <= 0) {
            toast.warn("Tiêu đề không được bỏ trống");
            return;
        } else {
            dataSend.name = dataSend.title.trim()
        }
        if (dataSend.slug === '' || dataSend.slug.length <= 0) {
            toast.warn("Đường dẫn không được bỏ trống");
            return;
        }
        if (travelTo && travelFrom) {
            dataSend.object = [{ to: travelTo, from: travelFrom }]
        }

        if (transport) {
            if (dataSend.object && dataSend.object.length > 0) {
                dataSend.object[0].transport = transport
            } else {
                dataSend.object = [{ transport }]
            }
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
        dataSend.price = typeof dataSend.price !== 'number' ? (parseInt(dataSend.price) ? parseInt(dataSend.price) : 0) : dataSend.price
        if (isSelling) {
            dataSend.priceSales = typeof dataSend.priceSales !== 'number' ? (parseInt(dataSend.priceSales) ? parseInt(dataSend.priceSales) : 0) : dataSend.priceSales
        }
        if (isEditView) {
            dispatch(fetchProductUpdate({ data: { ...dataSend, description, details }, _id: id }))
            return
        }
        dispatch(fetchProductCreate({ data: { ...dataSend, description, details } }))
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
    const handleSaveDropzoneDialog = (files) => {
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
                            <br />
                            <TextField
                                className={classes.title}
                                label="Tiêu đề"
                                color="secondary"
                                value={values.title}
                                defaultValue={detailProduct.title}
                                onChange={handleChange('title')}
                            />
                            <br />
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
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="caption" display="block" gutterBottom
                                >Thuộc tính sản phẩm (SP)</Typography>
                                <br />
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        label="Giá SP"
                                        value={values.price}
                                        onChange={handleChange('price')}
                                        name="numberformat"
                                        id="outlined-adornment-amount"
                                        labelWidth={60}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={<Switch checked={values.bestSelling} onChange={handleChangeSwitch('bestSelling')} name="bestSelling" />}
                                    label={values.bestSelling ? 'Chọn sản phẩm là Best Selling' : 'Bỏ chọn sản phẩm là Best Selling'}
                                    style={{ minWidth: 140 }}
                                />
                                <FormControlLabel
                                    control={<Switch checked={isSelling} onChange={() => { setIsSelling(!isSelling) }} name="bestSelling" />}
                                    label={isSelling ? 'Giảm giá sản phẩm' : 'Không giảm'}
                                    style={{ minWidth: 140 }}
                                />
                                <FormGroup row>
                                    <div className={classes.rowSpaceBetween}>
                                        {
                                            isSelling ? (
                                                <>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField
                                                            label="Giá giảm cho SP"
                                                            value={values.priceSales}
                                                            onChange={handleChange('priceSales')}
                                                            name="numberformat"
                                                            id="price-product-adornment"
                                                            labelWidth={60}
                                                            InputProps={{
                                                                inputComponent: NumberFormatCustom,
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <div>&nbsp;</div>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField
                                                            label="Tỉ lệ giảm của SP"
                                                            value={values.priceSales}
                                                            onChange={handleChange('priceSales')}
                                                            name="numberformat"
                                                            id="percent-product-adornment"
                                                            labelWidth={60}
                                                            InputProps={{
                                                                inputComponent: PercentFormatCustom,
                                                            }}
                                                        />
                                                    </FormControl>
                                                </>
                                            ) : ""
                                        }
                                    </div>
                                </FormGroup>
                                <br />
                                <FormControl component="fieldset" className={classes.rowSpaceEvenly} style={{ fontSize: '0.75rem' }}>
                                    <Typography
                                        align="left"
                                        color="textPrimary"
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >Sản phẩm</Typography>
                                    {
                                        dataCategory.map((data, index) => {
                                            const filCheck = values.type.filter(dataValue => dataValue.key === data.slug)
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
                                    <br />
                                </FormControl>
                                <br />
                                <br />
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="caption" display="block" gutterBottom
                                >
                                    Album Sản phẩm
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
                                                    {

                                                        /(http(s?):)([/|.|\w|\s|-])*/.test(tile) ? <img src={tile} alt={tile} style={{ maxWidth: '150px' }} /> :
                                                            <img src={SETTING.URL_IMAGE_PATH_SERVER + '/' + tile} alt={tile} style={{ maxWidth: '150px' }} />

                                                    }
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
                                {
                                    values.image ? (
                                        /(http(s?):)([/|.|\w|\s|-])*/.test(values.image) ? <img src={values.image} alt={values.title} style={{ maxWidth: '150px' }} /> :
                                            <img src={SETTING.URL_IMAGE_PATH_SERVER + '/' + values.image} alt={values.title} style={{ maxWidth: '150px' }} />
                                    ) : (
                                            <Typography
                                                align="left"
                                                color="textPrimary"
                                                variant="caption" display="block" gutterBottom
                                            >Chưa có hình ảnh đại diện</Typography>
                                        )
                                }
                            </Box>
                            <br />
                            <div className={classes.rowSpaceEvenlyButton}>
                                <Button
                                    style={{ color: 'red', width: '50%' }}
                                    onClick={() => {
                                        setOpen({
                                            ...open, status: true,
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
                {/* --------------------------------------------------------------------------------- */}
                <DialogDefault open={open}></DialogDefault>
            </Container>
        </Page>
    );
};

export default CURDProduct

