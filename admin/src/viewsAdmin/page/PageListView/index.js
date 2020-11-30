import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import {
    fetchPage as fetchItem
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import MuiTableColumn from './MuiTableColumn';

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
    MuiTableCss: {
        width: '100%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const columns = MuiTableColumn;

const initDialog = {
    status: false,
    title: '',
    content: '',
    redirectTo: '',
    rejectFn: () => { },
    confirmFn: () => { }
}

const PageListView = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const [open, setOpen] = React.useState(initDialog);

    const dataProduct = useSelector(state => SELECTOR.pageSelector(state));
    const dataCount = useSelector(state => SELECTOR.pageCountSelector(state));

    useEffect(() => {
        dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
    }, [])

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
        dispatch(fetchItem(dataFetch))
    }

    const handleTableOnlick = ({ type, dataIndex, rowIndex }) => (event) => {
        switch (type) {
            case "edit":
                setOpen({
                    ...open,
                    status: true,
                    title: "Bạn có muốn thay đổi?",
                    content: dataProduct[dataIndex].title,
                    rejectFn: () => {
                        setOpen(initDialog)
                    },
                    redirectTo: "/pages/edit/" + dataProduct[dataIndex].key,
                    confirmFn: () => {
                        setOpen(initDialog)
                    }
                })
                break;
            default:
                break;
        }
    }

    return (
        <Page
            className={classes.root}
            title="Products"
        >
            <Container maxWidth={false}>
                <Box
                    mt={3}
                    display="flex"
                    justifyContent="center"
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
                </Box>
            </Container>
            <DialogDefault open={open}></DialogDefault>
        </Page>
    );
};

export default PageListView

