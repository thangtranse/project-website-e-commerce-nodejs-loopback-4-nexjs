import {
  Box,
  Container,
  // Grid,
  makeStyles
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogDefault from 'src/components/Dialog/default';
import Page from 'src/components/Page';
import Table from 'src/components/Table';
import { SETTING } from 'src/constants';
import {
  deleteListIdProduct as deleteListItemId, deleteProduct,
  fetchProduct as fetchItem,

  setProductDeleteStateDefault as setDeleteStateDefault
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import MuiTableColumn from './MuiTableColumn';
import Toolbar from './Toolbar';

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

const ProductList = () => {

  const dataProduct = useSelector(state => SELECTOR.productSelector(state)); // Lấy danh sách items hiển thị
  const statusProductDelete = useSelector(state => SELECTOR.productDeleteStatus(state)); // trạng thái khi xóa một hoặc nhiều item trong danh sách
  const dataCount = useSelector(state => SELECTOR.productCountSelector(state)); // Tổng số lượng danh sách item

  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(initDialog);

  useEffect(() => {
    dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
  }, [])

  /**
   * Xử lý sự kiện trả kết quả về khi *xóa* thành công
   */
  useEffect(() => {
    if (typeof statusProductDelete !== 'undefined') {
      if (statusProductDelete) { // Khi xóa thành công
        dispatch(setDeleteStateDefault())
        dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
      } else { // Chưa có xóa

      }
    }
  }, [statusProductDelete])

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
            dispatch(deleteProduct({ id: dataProduct[dataIndex].productId }))
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
          rejectFn: () => {
            // dispatch(getProduct({ id }))
            setOpen(initDialog)
          },
          redirectTo: "/products/edit/" + dataProduct[dataIndex].productId,
          confirmFn: () => {
            setOpen(initDialog)
          }
        })
        break;
      default:
        break;
    }
  }

  /**
   * Xử lý sự kiện: Xóa danh sách đã chọn trong table
   * @param {*} data [object]
   */
  const deleteAllList = (data) => {
    if (data && data.length > 0) {
      const list = data.map(data => data.productId)
      if (list && list.length > 0) {
        const listTitle = data.map(data => " " + data.name)
        setOpen({
          ...open,
          status: true,
          title: "Bạn có muốn xóa danh sách Product đã chọn?",
          content: listTitle.toString().trim(),
          rejectFn: () => {
            setOpen(initDialog)
          },
          confirmFn: () => {
            dispatch(deleteListItemId({ list }))
            setOpen(initDialog)
          }
        })
      }
    }
  }

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar pathRedirect={'/products/create'} />
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Table
            dataTable={dataProduct}
            dataCountAll={dataCount}
            columns={columns({ handleTableOnlick })}
            fetchItem={fetchItem}
            deleteItem={deleteAllList}
          ></Table>
        </Box>
      </Container>
      <DialogDefault open={open}></DialogDefault>
    </Page>
  );
};

export default ProductList

