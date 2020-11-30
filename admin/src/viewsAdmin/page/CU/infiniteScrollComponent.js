import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ClearHTMLTag } from '../../../libs/Functions';

export const InfiniteScrollItem = React.memo(function PopularListItem({
    product = [], // Danh sách item show
    isLoadMore = true, // 
    cbHandleLoadMore = (page) => { }, // callback event load more 
    cbCheckItemList = (data) => { },
}) {

    // Config Listitem
    const [dense, setDense] = React.useState(false);
    const [checked, setChecked] = React.useState([]);

    const handleLoadMore = async (page) => {
        cbHandleLoadMore(page)
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        cbCheckItemList([...newChecked])
    };

    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={handleLoadMore}
                hasMore={isLoadMore}
                loader={
                    <div className="loader" key={0}>
                        <CircularProgress />
                    </div>
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <List dense={dense}>
                            {
                                product && product.length > 0 ? product.map((data, index) => {
                                    return (
                                        <ListItem key={`ListItem_` + index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.title}
                                                secondary={ClearHTMLTag(data.description)}
                                            />
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(data.productId)}
                                                    checked={checked.indexOf(data.productId) !== -1}
                                                    inputProps={{ 'aria-labelledby': data.title }}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }) : ""
                            }
                        </List>
                    </Grid>
                </Grid>
            </InfiniteScroll>
        </>
    );
});