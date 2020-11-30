import {
    makeStyles
} from '@material-ui/core';
import React from 'react';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const Account = () => {

    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="CRM"
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
        </Page>
    );
};

export default Account;
