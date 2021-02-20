import {

    Button,
    Container,

    Grid,

    makeStyles,
    Paper,

    TextField, Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SortIcon from '@material-ui/icons/Sort';
import { useRowGutterStyles } from '@mui-treasury/styles/gutter/row';
import arrayMove from 'array-move';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { toast } from "react-toastify";
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import EmojisBasic from 'src/libs/Emojis/basic';
import {
    actionUploadFile,
    fetchPageUpdate,

    getDetailItem,
    setDefaulGetPage
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import { UploadFile } from '../../../libs/apiApp';

const KEY_FILTER = "image_main"
const typeReducer = "Page"

const SortableItem = SortableElement(({ index, value }) => {
    const classes = useStyles();
    return (
        <>
            <Paper style={{
                paddingBottom: 15,
                listStyleType: 'none'
            }} className={classes.paper}>
                <li>
                    <h4>{value.title}</h4>
                </li>
            </Paper>
        </>
    )
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            <Paper>
                {
                    items.map((value, index) => {
                        return (
                            <>
                                <SortableItem
                                    key={`item-${value.id}`}
                                    index={index}
                                    value={value}
                                />
                            </>
                        )
                    })
                }
            </Paper>
        </ul>
    );
});

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
    const styles = useRowGutterStyles({ size: '1rem' });

    const detailItem = useSelector((state) => SELECTOR.pageDetial(state));
    const [values, setValues] = React.useState({ ...initValues });
    const [valuesElementProduct, setValuesElementProduct] = React.useState([]);
    const [open, setOpen] = React.useState(initDialog);
    const [disSubmitButton, setDisSubmitButton] = React.useState(false);

    const [openEditContent, setOpenEditContent] = React.useState(false);
    const [openEditBigContent, setOpenEditBigContent] = React.useState(false);
    const [openSortContent, setOpenSortContent] = React.useState(false);

    const [inputContentTitle, setInputContentTitle] = React.useState("");
    const [inputContent, setInputContent] = React.useState("");

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
       * Change content with type input
       * @param {*} prop: key work
       * @param {*} event:
       */
    const handleChange = (prop) => (event) => {
        const dataSave = event.target.value;
        setValues({ ...values, [prop]: dataSave });
    };

    const handleCloseBigContent = (event) => {
        setOpenEditBigContent(false)
    }
    const handleOpenBigContent = (event) => {
        setOpenEditBigContent(true)
    }
    const handleCloseSortContent = (event) => {
        setOpenSortContent(false)
    }
    const handleOpenSortContent = (event) => {
        setOpenSortContent(true)
    }

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
        dispatch(fetchPageUpdate({ data: { ...dataSend }, _id: dataSend.key }));
        setDisSubmitButton(false);
    };

    /**
     * Change content wysiwyg
     * @param {*} data: key work
     * @param {*} editorState: 
     */
    const onEditorStateChange = data => (editorState) => {
        setInputContent(editorState);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        let swapData = arrayMove(values.element, oldIndex, newIndex)
        setValues({
            ...values,
            element: swapData
        })
    };

    return (
        <Page
            className={classes.root}
            title="Pages"
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
                            values.element.map((data, index) => {
                                return (
                                    <Paper style={{ paddingBottom: '56px' }} className={classes.paper}>
                                        <h3>{data.title}</h3>
                                        <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: data.description }} ></div>
                                        <div style={{ float: 'right' }}>
                                            <Tooltip title={`Xóa nội dung "${data.title}"`} aria-label="add">
                                                <IconButton
                                                    onClick={() => {
                                                        setOpen({
                                                            ...open,
                                                            status: true,
                                                            title: data.title,
                                                            content: 'Bạn có muốn xóa không?',
                                                            confirmFn: () => {
                                                                let data = values.element.splice((index + 1), 1)
                                                                setValues({
                                                                    ...values,
                                                                    element: data
                                                                })
                                                                setOpen(initDialog);
                                                            },
                                                            rejectFn: () => {
                                                                setOpen(initDialog);
                                                            }
                                                        });
                                                    }}
                                                    aria-label="sort"
                                                    className={classes.margin}
                                                    style={{
                                                        color: "red"
                                                    }}
                                                >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Paper>
                                )
                            })
                        }
                        <br />
                        <Paper style={{ paddingBottom: '10px', display: 'flex' }} className={classes.paper}>
                            <div className={styles.parent}>
                                <Tooltip title="Sắp xếp nội dung" aria-label="add">
                                    <IconButton aria-label="sort" className={classes.margin} onClick={handleOpenSortContent}>
                                        <SortIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className={styles.parent}>
                                <Tooltip title="Thêm mới nội dung" aria-label="add">
                                    <IconButton aria-label="add" className={classes.margin} onClick={handleOpenBigContent}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Paper>
                        <br />
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
                                    style={{ color: 'red', width: '60%' }}
                                    onClick={() => {
                                        setOpen({
                                            ...open,
                                            status: true,
                                            title: 'Quay trở lại ban đầu',
                                            content: 'Hủy bỏ các chỉnh sửa của bạn để quay trở về nội dung ban đầu?',
                                            confirmFn: () => {
                                                setValues({
                                                    title: detailItem.title ? detailItem.title : initValues.title,
                                                    key: detailItem.key ? detailItem.key : initValues.key,
                                                    url: detailItem.url ? detailItem.url : initValues.url,
                                                    content: detailItem.content ? detailItem.content : initValues.content,
                                                    element: detailItem.element ? detailItem.element : initValues.element,
                                                    setting: detailItem.setting ? detailItem.setting : initValues.setting,
                                                });
                                                setOpen(initDialog);
                                            },
                                            rejectFn: () => {
                                                setOpen(initDialog);
                                            }
                                        });
                                    }}
                                >Quay trở lại ban đầu</Button>
                                <Button color="secondary" style={{ width: '40%' }} onClick={handleSubmit} disabled={disSubmitButton}>Thay đổi</Button>
                            </div>
                        </Paper>
                    </Grid>
                    {/* --------------------------------------------------------------------------------- */}
                </Grid>
                <DialogDefault open={open} />
            </Container>


            <Dialog open={openEditBigContent} onClose={handleCloseBigContent} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm nội dung</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mỗi nội dung bạn thêm vào sẽ được cập nhật lên trang <b>"About"</b>.<br />
                        <b>"Tiêu đề nội dung"</b> tương ứng với mục lục, bạn có thể sắp xếp lại theo ý muốn.
                    </DialogContentText>
                    <br />
                    <TextField
                        autoFocus
                        className={classes.title}
                        label="Tiêu đề nội dung"
                        color="secondary"
                        value={inputContentTitle}
                        onChange={e => setInputContentTitle(e.target.value)}
                    />
                    <div className={classes.EditorLayout}>
                        <Editor
                            wrapperClassName="thangtm13_wrapper"
                            editorClassName="thangtm13_editor"
                            onEditorStateChange={onEditorStateChange("content")}
                            editorState={inputContent}
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
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: 'red' }}
                        onClick={() => {
                            setInputContent("")
                            setInputContentTitle("")
                        }}
                    >Nhập lại</Button>
                    <Button
                        style={{ color: '#3f51b5' }}
                        onClick={() => {
                            if (inputContent) {
                                let data = values.element ? values.element : []
                                const description = draftToHtml(convertToRaw(inputContent.getCurrentContent()))
                                if (inputContentTitle.trim().length > 0) {
                                    data.push({
                                        id: values.element.length + 1,
                                        title: inputContentTitle.trim(),
                                        description: description
                                    })
                                }
                                setValues({
                                    ...values,
                                    element: data
                                })
                                setInputContent("")
                                setInputContentTitle("")
                            }
                            handleCloseBigContent()
                            toast.warn('Nội dung không tồn tại');
                        }}
                    >Thêm nội dung</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSortContent} onClose={handleCloseSortContent} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sắp xếp nội dung</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nội dung bạn sắp xếp sẽ hiển thị tương ứng lên trang <b>"About"</b>.<br />
                    </DialogContentText>
                    <br />
                    <Paper style={{ padding: '10px' }}>
                        <h4>Sắp xếp nội dung</h4>
                        <br />
                        <SortableList
                            items={values.element}
                            onSortEnd={onSortEnd}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ color: 'red' }}
                        onClick={() => {
                            handleCloseSortContent()
                        }}
                    >Đồng ý</Button>
                </DialogActions>
            </Dialog>

            <DropzoneDialog
                open={openDropzoneDialog}
                onSave={handleSaveDropzoneDialog}
                acceptedFiles={SETTING.FILE_UPLOAD_IMAGE}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleOpenDropzoneDialog}
            />
        </Page>
    );
};

export default CURDPage;
