import * as React from "react"
import {
    FormControl,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    Box,
    Paper,
    TextField,
    Button,
    Avatar,
    Typography,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function SignInSide() {
    const [org, setorg] = React.useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get("email"),
            password: data.get("password"),
            org: org,
        })
    }

    const handleChange = (event) => {
        setorg(event.target.value)
    }

    return (
        <Grid
            container
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Securely Opt-in Reporter List
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="name"
                            id="name"
                            autoComplete="name"
                        />
                        <FormControl>
                            <InputLabel id="demo-simple-select-autowidth-label">org</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={org}
                                onChange={handleChange}
                                autoWidth
                                label="org"
                                defaultValue={0}
                            >
                                <MenuItem value={0}>I don't have org</MenuItem>
                                <MenuItem value={1}>The New York Times</MenuItem>
                                <MenuItem value={2}>CoinDesk</MenuItem>
                                <MenuItem value={3}>ChainFeeds</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Opt in
                        </Button>
                    </Box>
                </Box>
            </Grid>
            {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <h1>Already opt-in? Connect Wallet Now!</h1>
            </Grid> */}
        </Grid>
    )
}
