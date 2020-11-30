import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import ChevronRight from '@material-ui/icons/ChevronRight'
import {
    bindHover,
    bindMenu, usePopupState
} from 'material-ui-popup-state/hooks'
import Menu from 'material-ui-popup-state/HoverMenu'
import * as React from 'react'


const ParentPopupState = React.createContext(null)

const useStyles = makeStyles((theme) => ({
    menu: {
        width: 'auto',
        padding: '5px 10px'
    },
    toolbarLink: {

    },
    menuSub: {
        minWidth: '250px'
    }
}));

const CascadingHoverMenus = ({ menuContent = {} }) => {
    const classes = useStyles();
    const popupState = usePopupState({ popupId: menuContent.url, variant: 'popover' })
    return (
        <div className={classes.menu}>
            <Link
                color={`${menuContent.checked ? '' : 'inherit'}`}
                noWrap
                key={menuContent.title}
                variant="body2"
                href={menuContent.url}
                className={`${classes.toolbarLink}`}
                key={`menu-` + menuContent.url + '-sub'}
                {...bindHover(popupState)}
            >
                {menuContent.title}
            </Link>
            {
                menuContent.child && menuContent.child.length > 0 ? (
                    <ParentPopupState.Provider value={popupState}>
                        <Menu
                            {...bindMenu(popupState)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            getContentAnchorEl={null}
                        >
                            {
                                renderSubMenu(menuContent.child, popupState, classes)
                            }
                        </Menu>
                    </ParentPopupState.Provider>
                ) : ""
            }
        </div>
    )
}

export default CascadingHoverMenus

const renderSubMenu = (child, popupState, classes) => {

    return (
        child.map(data => {
            return (
                <div className={classes.menuSub}>
                    {
                        data.child && data.child.length > 0 ? (
                            <Submenu popupId={data.title} title={data.title}>
                                {renderSubMenu(data.child, popupState)}
                            </Submenu>
                        ) :
                            <MenuItem onClick={() => {
                                popupState.close()
                                window.location.href = data.url
                            }}>{data.title}</MenuItem>
                    }
                </div>
            )
        })
    )
}

const submenuStyles = theme => ({
    menu: {
        marginTop: theme.spacing(-1),
    },
    title: {
        flexGrow: 1,
    },
    moreArrow: {
        marginRight: theme.spacing(-1),
    },
})

const Submenu = withStyles(submenuStyles)(
    React.forwardRef(({ classes, title, popupId, children, ...props }, ref) => {
        const parentPopupState = React.useContext(ParentPopupState)
        const popupState = usePopupState({
            popupId,
            variant: 'popover',
            parentPopupState,
        })
        return (
            <ParentPopupState.Provider value={popupState}>
                <MenuItem
                    {...bindHover(popupState)}
                    selected={popupState.isOpen}
                    ref={ref}
                >
                    <span className={classes.title}>{title}</span>
                    <ChevronRight className={classes.moreArrow} />
                </MenuItem>
                <Menu
                    {...bindMenu(popupState)}
                    classes={{ paper: classes.menu }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    getContentAnchorEl={null}
                    {...props}
                >
                    {children}
                </Menu>
            </ParentPopupState.Provider>
        )
    })
)
