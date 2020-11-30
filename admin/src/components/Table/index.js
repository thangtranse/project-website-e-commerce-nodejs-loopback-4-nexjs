
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import React from 'react';
import { useDispatch } from 'react-redux';
import { SETTING } from 'src/constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 0,
        margin: 0,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        minHeight: 330,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    MuiTableCss: {
        width: '100%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export default function Table({
    dataTable = [], // dữ liệu để table hiển thị
    dataCountAll = 0, // count tất cả dữ liệu để phân trang
    columns = () => { }, // Fnc trả về một [] để hiển thị tiêu đề và nội dung của table
    fetchItem = () => { }, // xử lý sự kiện fetch data
    deleteItem = () => { }, // xử lý sự kiện xóa data khi có option select 
}) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [tableSelect, setTableSelect] = React.useState([]); // mảng lưu trữ dữ liệu table khi thực hiện OPTION lựa chọn

    const changePage = (page, { order, where, fields }) => {
        const dataFetch = {}
        dataFetch.limit = SETTING.LIST_ITEM_PER_PAGE
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

    return (
        <>
            <Paper className={classes.paper}>
                <MUIDataTable
                    className={classes.MuiTableCss}
                    data={dataTable}
                    columns={columns}
                    options={{
                        filter: true,
                        filterType: 'dropdown',
                        responsive: 'vertical',
                        onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
                        onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
                        onChangePage: currentPage => console.log('currentPage: ', currentPage),
                        serverSide: true,
                        count: dataCountAll,
                        rowsPerPage: SETTING.LIST_ITEM_PER_PAGE,
                        rowsPerPageOptions: [],
                        onTableChange: (action, tableState) => {
                            let filterObject = {}
                            // console.log("thangtran.action", action)
                            // console.log("thangtran.tableState", tableState)
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
                                case 'rowSelectionChange': // select lựa chọn phần tử
                                    // NOTE:: tableState.previousSelectedRow.dataIndex -> giá trị khi thực hiện thao tác select trên table (chỉ 1 giá trị duy nhất)
                                    const dataSelectMore = tableState.selectedRows.data.map(data => data.dataIndex) 
                                    setTableSelect(dataSelectMore)
                                    break;
                                case 'rowDelete': // xóa nhiều kết quả
                                    let dataDelete = []
                                    for (let i = 0; i < tableSelect.length; i++) {
                                        dataDelete.push(dataTable[tableSelect[i]])
                                    }
                                    setTableSelect([])
                                    deleteItem(dataDelete)
                                    break;
                                default:
                                    console.log('muitable action not handled.');
                            }
                        }
                    }}
                />
            </Paper>
        </>
    )
}

Table.propTypes = {};