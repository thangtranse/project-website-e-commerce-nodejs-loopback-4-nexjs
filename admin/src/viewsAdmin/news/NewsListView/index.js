import {
  Box,
  Container,
  // Grid,
  makeStyles
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import { SETTING } from 'src/constants';
import {
  deleteNews as deleteItem,
  fetchNews as fetchItem
} from 'src/saga/action';
import {
  newsSelector as SelectorlistItem,
  newsCountSelector as SelectorCount,
  newsDeleteStatus as SelectorDeleteStatus,
} from 'src/saga/redux-selector';
import MuiTableColumn from './MuiTableColumn';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  MuiTableCss: {
    width: '100%'
  }
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

const SettingFn = {
  directTo: "/news/edit/", // Chuyển hướng đến trang EDIT
  ItemID: "NewsId", // ID của Item
  ItemTitle: "title", // title của Item
}

const NewsListView = () => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(initDialog);

  const dataResult = useSelector(state => SelectorlistItem(state));
  const statusDelete = useSelector(state => SelectorDeleteStatus(state));
  const dataCount = useSelector(state => SelectorCount(state));

  useEffect(() => {
    dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
  }, [])

  useEffect(() => {
    dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
  }, [statusDelete])

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
      case "delete":
        setOpen({
          ...open,
          status: true,
          title: "Bạn có muốn xóa?",
          content: dataResult[dataIndex][SettingFn.ItemTitle],
          rejectFn: () => { setOpen(initDialog) },
          confirmFn: () => {
            dispatch(deleteItem({ id: dataResult[dataIndex][SettingFn.ItemID] }))
            setOpen(initDialog)
          }
        })
        break;
      case "edit":
        setOpen({
          ...open,
          status: true,
          title: "Bạn có muốn thay đổi?",
          content: dataResult[dataIndex][SettingFn.ItemTitle],
          rejectFn: () => { setOpen(initDialog) },
          redirectTo: SettingFn.directTo + dataResult[dataIndex][SettingFn.ItemID],
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
      title="News"
    >
      <Container maxWidth={false}>
        <Toolbar pathRedirect={'/news/create'} />
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <MUIDataTable
            className={classes.MuiTableCss}
            data={dataResult}
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

export default NewsListView

