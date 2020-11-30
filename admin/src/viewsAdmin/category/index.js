import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Add from '@material-ui/icons/Add';
import Inbox from '@material-ui/icons/Inbox';
import LocalOffer from '@material-ui/icons/LocalOffer';
import { Row } from '@mui-treasury/components/flex';
import { GmailTabItem, GmailTabs } from '@mui-treasury/components/tabs/gmail';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import { deleteCategory, fetchCategory, fetchCategoryCreate, setDefaulCreateCategory, setDefaulDeleteCategory, fetchCategoryUpdate } from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import RemoveAccents from 'src/utils/setUrlPath';
import MuiTableColumn from './MuiTableColumn';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const columns = MuiTableColumn;

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    action: {
        backgroundColor: '#fff',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
        },
    },
    dialogCreateElement: {
        width: "250px"
    },
    dialogInput: {
        width: "100%"
    }
}));

const initDialog = {
    status: false,
    title: '',
    content: '',
    redirectTo: '',
    rejectFn: () => { },
    confirmFn: () => { }
}

const initEdit = {
    status: false,
    title: '',
    description: '',
    id: ''
}

const initTableDefault = [
    {
        id: 0,
        title: "Products",
        icon: <Inbox />
    },
    {
        id: 1,
        title: "News",
        icon: <LocalOffer />
    }
]

const Category = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [index, setIndex] = React.useState(0);
    const [open, setOpen] = React.useState(initDialog);
    const [tableDefault, setTableDefault] = React.useState(initTableDefault[0]);
    const [editFromCreate, setEditFromCreate] = React.useState(initEdit);

    const [openNewCategory, setOpenNewCategory] = React.useState(false);

    const dataProduct = useSelector(state => SELECTOR.ctgSelector(state));
    const statusProductDelete = useSelector(state => SELECTOR.ctgDeleteStatus(state));
    const statusCreated = useSelector(state => SELECTOR.ctgCreateStatus(state));
    const dataCount = useSelector(state => SELECTOR.ctgCountSelector(state));

    const handleClickOpen = () => {
        setOpenNewCategory(true);
    };

    const handleClose = () => {
        setOpenNewCategory(false);
    };

    useEffect(() => {
        if (typeof statusCreated !== undefined) {
            if (statusCreated) {
                dispatch(fetchCategory({ limit: SETTING.LIST_ITEM_PER_PAGE, where: { type: tableDefault.title } }))
            }
            dispatch(setDefaulCreateCategory())
        }
        if (typeof statusProductDelete !== undefined) {
            if (statusProductDelete) {
                dispatch(fetchCategory({ limit: SETTING.LIST_ITEM_PER_PAGE, where: { type: tableDefault.title } }))
            }
            dispatch(setDefaulDeleteCategory())
        }
    }, [statusCreated, statusProductDelete])

    useEffect(() => {
        dispatch(fetchCategory({ limit: SETTING.LIST_ITEM_PER_PAGE, where: { type: tableDefault.title } }))
    }, [tableDefault])

    useEffect(() => {
        if (editFromCreate.status) {
            setOpenNewCategory(true);
            setOpen(initDialog)
        }
    }, [editFromCreate])

    // MUI-Datatable
    const handleTableOnlick = ({ type, dataIndex, rowIndex }) => (event) => {
        switch (type) {
            case "delete":
                setOpen({
                    ...open,
                    status: true,
                    title: "Bạn có muốn xóa?",
                    content: dataProduct[dataIndex].title,
                    rejectFn: () => { setOpen(initDialog) },
                    confirmFn: () => {
                        dispatch(deleteCategory({ id: dataProduct[dataIndex].id }))
                        setOpen(initDialog)
                    }
                })
                break;
            case "edit":
                setOpen({
                    ...open,
                    status: true,
                    title: "Bạn có muốn thay đổi?",
                    content: dataProduct[dataIndex].title,
                    rejectFn: () => { setOpen(initDialog) },
                    confirmFn: () => {
                        setEditFromCreate({ title: dataProduct[dataIndex].title, description: dataProduct[dataIndex].description, status: true, id: dataProduct[dataIndex].id })
                        // tiếp tục xử lý sự kiện useState
                    }
                })
                break;
            default:
                break;
        }
    }

    // MUI-Datatable
    const changePage = (page, { order, where, fields }) => {
        const dataFetch = {}
        dataFetch.limit = page * SETTING.LIST_ITEM_PER_PAGE
        dataFetch.skip = page === 1 ? 0 : (page - 1) * SETTING.LIST_ITEM_PER_PAGE
        if (order) {
            dataFetch.order = [`${order.name} ${order.direction}`]
        }
        if (where) {
            dataFetch.where = where
        }
        if (fields) {
            dataFetch.fields = fields
        }
        dispatch(fetchCategory(dataFetch))
    }


    return (
        <Page
            className={classes.root}
            title="Category"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <GmailTabs value={index} onChange={(_, value) => {
                            setTableDefault(initTableDefault[value])
                            setIndex(value)
                        }}>
                            {
                                initTableDefault.map(data => (
                                    <GmailTabItem
                                        icon={data.icon}
                                        label={data.title}
                                    />
                                ))
                            }
                        </GmailTabs>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <Row p={1.5} gap={2} bgcolor={'#f5f5f5'} borderRadius={16}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickOpen}
                                className={classes.button}
                                endIcon={<Add>Thêm</Add>}
                            >Thêm Category cho {tableDefault.title}</Button>
                        </Row>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <MUIDataTable
                            className={classes.MuiTableCss}
                            data={dataProduct}
                            columns={columns({ handleTableOnlick })}
                            options={{
                                filter: true,
                                filterType: 'dropdown',
                                responsive: 'vertical',
                                onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
                                onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
                                onChangePage: currentPage => console.log('currentPage: ', currentPage),
                                serverSide: true,
                                count: dataCount,
                                rowsPerPage: SETTING.LIST_ITEM_PER_PAGE,
                                rowsPerPageOptions: [],
                                onTableChange: (action, tableState) => {
                                    // console.log("thangtran.action", action)
                                    // console.log("thangtran.tableState", tableState)
                                    let filterObject = {}
                                    switch (action) {
                                        case 'changePage':
                                            if (tableState.sortOrder && tableState.sortOrder.length > 0)
                                                filterObject.order = tableState.sortOrder
                                            if (tableState.searchText && tableState.searchText.length > 3)
                                                filterObject.where = { regexp: tableState.searchText }
                                            changePage(tableState.page + 1, filterObject)
                                            break;
                                        case 'filterChange':
                                            break;
                                        case 'search':
                                            if (tableState.sortOrder && tableState.sortOrder.length > 0)
                                                filterObject.order = tableState.sortOrder
                                            if (tableState.searchText && tableState.searchText.length > 3)
                                                filterObject.where = { regexp: tableState.searchText }
                                            changePage(tableState.page + 1, filterObject)
                                            break;
                                        case 'sort':
                                            if (tableState.searchText && tableState.searchText.length > 3)
                                                filterObject.where = { regexp: tableState.searchText }
                                            if (tableState.sortOrder && tableState.sortOrder.length > 0)
                                                filterObject.order = tableState.sortOrder
                                            changePage(tableState.page + 1, filterObject)
                                            break;
                                        default:
                                            console.log('muitable action not handled.');
                                    }
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={openNewCategory}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: editFromCreate.title,
                        description: editFromCreate.description,
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = 'Required';
                        } else if (!(values.title.trim().length > 3)) {
                            errors.title = 'Invalid category name, < 3';
                        }
                        if (!values.description) {
                            errors.description = 'Required';
                        } else if (!(values.description.trim().length > 3)) {
                            errors.description = 'Invalid category name, , < 3';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const data = {
                            slug: RemoveAccents(values.title.trim()),
                            title: values.title.trim(),
                            description: values.description.trim(),
                            type: tableDefault.title
                        }
                        if (editFromCreate.status) {
                            dispatch(fetchCategoryUpdate({ data, _id: editFromCreate.id }))
                        } else {
                            dispatch(fetchCategoryCreate({ data }))
                        }
                        setTimeout(() => {
                            setEditFromCreate(initEdit)
                            setSubmitting(false)
                            handleClose()
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <div>
                            <>
                                <DialogTitle id="alert-dialog-slide-title">{"Thêm Category mới?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <Form
                                            className={classes.dialogCreateElement}
                                        >
                                            <Field
                                                component={TextField}
                                                name="title"
                                                type="title"
                                                label="Category name"
                                                className={classes.dialogInput}
                                            />
                                            <br />
                                            <br />
                                            <Field
                                                component={TextField}
                                                name="description"
                                                type="description"
                                                label="Description"
                                                multiline
                                                className={classes.dialogInput}
                                            />
                                        </Form>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button disabled={isSubmitting} onClick={handleClose} color="secondary">Hủy bỏ</Button>
                                    <Button disabled={isSubmitting} onClick={() => {
                                        submitForm()
                                    }} color="primary">{editFromCreate.status ? "Thay đổi" : "Thêm mới"}</Button>
                                </DialogActions>
                            </>
                        </div>
                    )}
                </Formik>
            </Dialog>
            <DialogDefault open={open}></DialogDefault>
        </Page>
    );
};


const structuredSelector = createStructuredSelector({
    data: state => state.posts
})

const mapDispatchToProps = {}

export default connect(structuredSelector, mapDispatchToProps)(Category)
