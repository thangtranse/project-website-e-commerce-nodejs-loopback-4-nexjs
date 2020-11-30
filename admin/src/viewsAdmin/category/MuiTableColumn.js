import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import GetStringHtmlTag from 'src/utils/getStringHtmlTag';


export default ({ handleTableOnlick }) => {
    return [
        {
            name: "title",
            label: "Category",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Mô tả",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return GetStringHtmlTag(value)
                }
            }
        },
        {
            name: "Xóa",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <IconButton aria-label="delete" onClick={handleTableOnlick({ type: 'delete', dataIndex })}>
                            <DeleteIcon />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: "Chỉnh sửa",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <IconButton aria-label="edit" onClick={handleTableOnlick({ type: 'edit', dataIndex, rowIndex })}>
                            <EditIcon />
                        </IconButton>
                    );
                }
            }
        }
    ];
}