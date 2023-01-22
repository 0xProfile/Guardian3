import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your Profile
            </Typography>
            <Typography variant="h5" component="div">
                Name: Dewey Swearengin 
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Org: The New York Times
            </Typography>
            <Typography variant="body2">Professional Field: Crypto, Finance, Digital Life, etc</Typography>
        </CardContent>
    </React.Fragment>
)

export default function OutlinedCard() {
    return (
        <Box sx={{                        display: "flex",
        flexDirection: "column",
        alignItems: "center", }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}
