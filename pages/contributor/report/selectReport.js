import { Card, CardContent, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const REPORTERS = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

export default function selectReport({ checked, setChecked }) {

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Card sx={{
            width: "100vw"
        }}>
            <CardContent >
                <List dense sx={{ width: '100%', maxWidth: 360}}>
                    {
                        REPORTERS.map((reporter, index) => {
                            return (
                                <ListItem key={index} 
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            checked={checked.indexOf(reporter) !== -1}
                                            onChange={handleToggle(reporter)}
                                        />
                                    }
                                    disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar />
                                        <ListItemText primary={`Reporter ${reporter}`} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card>
    )   
}