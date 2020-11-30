import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import DialogChildrenContent from 'src/components/Dialog/ChildrenContent';
import DialogDefault from 'src/components/Dialog/default';
import FormAuto from 'src/components/Form/Auto';
import Page from 'src/components/Page';
import Table from 'src/components/Table';
import { API, LocalStorage, SETTING } from 'src/constants';
import {
  deleteListIdUser as deleteListItemId,
  deleteUser as deleteItem,

  fetchUser as fetchItem
} from 'src/saga/action';
import {
  userCountSelector as CountSelector,

  userDeleteStatus as ResponseDeleted,
  userSelector as ListSelector
} from 'src/saga/redux-selector';
import { fetchPost } from '../../../libs/apiApp';
import MuiTableColumn from './MuiTableColumn';
import { schemaCreateUserForm, uiSchemaCreateUserForm } from './schemaForm';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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

const CustomerListView = () => {

  const dispatch = useDispatch();
  const classes = useStyles();

  const dataProduct = useSelector(state => ListSelector(state));
  const dataCount = useSelector(state => CountSelector(state));
  const statusDelete = useSelector(state => ResponseDeleted(state));

  const [open, setOpen] = React.useState(initDialog);
  const [statusPopupNewUser, setStatusPopupNewUser] = React.useState(false);

  useEffect(() => {
    dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
  }, [])

  useEffect(() => {
    if (typeof statusDelete !== undefined) {
      dispatch(fetchItem({ limit: SETTING.LIST_ITEM_PER_PAGE }))
    }
  }, [statusDelete])

  /**
   * Xử lý sự kiện: Callback khi click vào Icon xóa trong table
   * @param {*} {dataIndex}: index của dữ liệu xóa trong mảng truyển vào table 
   */
  const deleteUser = ({ type, dataIndex, rowIndex }) => (event) => {
    const userData = JSON.parse(localStorage.getItem(LocalStorage.STATE_LOADER));
    if (userData && userData.user && userData.user.profile && userData.user.profile.id) {
      if (dataProduct[dataIndex] && dataProduct[dataIndex].id && dataProduct[dataIndex].id === userData.user.profile.id) {
        toast.warn("Bạn không thể xóa chính mình!");
      } else {
        setOpen({
          ...open,
          status: true,
          title: "Bạn có muốn xóa?",
          content: dataProduct[dataIndex].email,
          rejectFn: () => {
            setOpen(initDialog)
          },
          confirmFn: () => {
            dispatch(deleteItem({ id: dataProduct[dataIndex].id }))
            setOpen(initDialog)
          }
        })
      }
    } else {
      toast.warn("Vui lòng đăng nhập lại để thực hiện thao tác!");
    }
  }

  /**
   * Xử lý sự kiện: Xóa danh sách đã chọn trong table
   * @param {*} data [object]
   */
  const deleteAllList = (data) => {
    if (data && data.length > 0) {
      const list = data.map(data => data.id)
      if (list && list.length > 0) {
        const listEmail = data.map(data => " " + data.email)
        setOpen({
          ...open,
          status: true,
          title: "Bạn có muốn xóa danh sách " + listEmail.length + " User đã chọn?",
          content: listEmail.toString().trim(),
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
      title="User manager"
    >
      <Container maxWidth={false}>
        <Toolbar actionClickAddUser={() => { setStatusPopupNewUser(true) }} />
        <Box mt={3}>
          <DialogChildrenContent
            open={{
              status: statusPopupNewUser,
              title: "Tạo mới User",
              rejectFn: () => {
                setStatusPopupNewUser(false)
              }
            }} disableFooter={true}>
            <FormAuto
              schema={schemaCreateUserForm}
              uiSchema={uiSchemaCreateUserForm}
              // formData={
              //   { firstName: "thang" }
              // }
              fnSubmit={(data) => {
                console.log("thangtran.data", data.formData)
                fetchPost({
                  url: API.user,
                  dataRequest: {
                    ...data.formData
                  }
                }).then(dataResponse => {
                  if (dataResponse && dataResponse.error) {
                    throw "Có lỗi trong quá trình lấy dữ liệu từ Server!"
                  } else {
                    toast.info(`Thêm user ${data.formData.lastName} thành công!`);
                    setStatusPopupNewUser(false)
                  }
                }).catch(error => {
                  toast.warn("Có lỗi xảy ra, vui lòng thực hiện lại!");
                })
              }}
              fnReject={() => { setStatusPopupNewUser(false) }}
            ></FormAuto>
          </DialogChildrenContent>
        </Box>
        <Box mt={3}>
          <Table
            dataTable={dataProduct}
            dataCountAll={dataCount}
            columns={MuiTableColumn({
              deleteUser
            })}
            fetchItem={fetchItem}
            deleteItem={deleteAllList}
          ></Table>
        </Box>
      </Container>
      {/* Ask delete */}
      <DialogDefault open={open}></DialogDefault>

    </Page >
  );
};

export default CustomerListView;
