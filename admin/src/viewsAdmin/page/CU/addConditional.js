import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { API, SETTING } from '../../../constants';
import { fetchGet } from '../../../libs/apiApp';
import { InfiniteScrollItem } from './infiniteScrollComponent';

export default function AddItemDialog({
    statusOpen = false, // status to open or turn off dialog
    cbHanldeClose = (dataCB = []) => { }, // fn callback event on close dialog
}) {

    const [selectItem, setSeletectItem] = React.useState([]);

    // InfiniteScrollItem Config
    const [isLoadMore, setLoadMore] = React.useState(true)
    const [product, setProduct] = React.useState([])
    const [productCount, setProductCount] = React.useState(0)

    useEffect(() => {
        try {
            fetchGet({
                url: API.product,
                dataRequest: {
                    filter: {
                        limit: SETTING.LIST_ITEM_PER_PAGE,
                        order: ["_createAt DESC"]
                    }
                }
            }).then(data => {
                fetchGet({
                    url: API.product + '/count',
                    dataRequest: {}
                }).then(dataCount => {
                    if (dataCount && dataCount.count) {
                        setProductCount(dataCount.count)
                        if (dataCount.count <= data.length) {
                            setLoadMore(false)
                        }
                    }
                    if (data) {
                        setProduct([...product, ...data])
                    }
                }).catch(error => error)
            }).catch(error => error)
        } catch (error) {
            console.log("error index")
        }
    }, []);

    const handleLoadMore = async (page) => {
        const resultProductNew = await fetchGet({
            url: API.product,
            dataRequest: {
                filter: { limit: SETTING.LIST_ITEM_PER_PAGE, skip: product.length, order: ["_createAt DESC"] }
            }
        }).then(data => data).catch(error => error)
        if (resultProductNew) {
            if (product.length + resultProductNew.length >= productCount) {
                setLoadMore(false)
            }
            setProduct([...product, ...resultProductNew])
        }
    }

    const handleItemCheckList = async (data) => {
        setSeletectItem(data)
    }

    /**
     * Event handle close and callback data to function parent
     */
    const handleCloseConfirm = () => {
        let dataResult = []
        product.forEach(dataProduct => {
            let check = selectItem.filter(dataFilter => dataFilter === dataProduct.productId)
            if (check.length === 1) {
                dataResult.push(dataProduct)
            }
        })
        cbHanldeClose(dataResult)
    };

    return (
        <div>
            <Dialog
                open={statusOpen}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Lựa chọn danh mục bạn muốn hiển thị:"}</DialogTitle>
                <DialogContent>
                    <div id="alert-dialog-description">
                        <Typography variant="caption" align={'center'}>
                            Các thông tin danh mục bạn lựa chọn sẽ được hiển thị trên "Trang"
                        </Typography>
                        <br />
                       1231312321
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="primary" autoFocus>Hủy bỏ</Button>
                    <Button onClick={handleCloseConfirm} color="primary">Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}