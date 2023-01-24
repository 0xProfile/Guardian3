import React, { useEffect } from "react"
import styles from "../styles/Inbox.module.css"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"

import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import { reportManageAddr } from '../constants'
import reportMangeABI from '../constants/abis/reportManage.json'
import { useAccount, useContractRead } from "wagmi"

export default function Inbox() {

    const {address} = useAccount()

    const { data } = useContractRead({
        address: reportManageAddr,
        abi: reportMangeABI,
        functionName: "getRecToReport",
        args: [address]
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className={styles.wrapper}>
            <div>
                <h1>INBOX</h1>
            </div>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <ListItemButton alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
                <Divider variant="inset" component="li" />
                <ListItemButton alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
                <Divider variant="inset" component="li" />
                <ListItemButton alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {" — Do you have Paris recommendations? Have you ever…"}
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            </List>
        </div>
    )
}
