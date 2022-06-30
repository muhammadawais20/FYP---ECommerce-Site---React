import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const Pages = ["Admin", "Order", "Logout", "{<AddShoppingCartIcon />}"]
    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                {Pages.map((page, index)=> (
                    <ListItemButton key={index}>
                        <ListItemIcon>
                            <ListItemText>{page}</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                ))}
                </List>
            </Drawer>
            <IconButton sx={{color: 'white', marginLeft: 'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerComp
