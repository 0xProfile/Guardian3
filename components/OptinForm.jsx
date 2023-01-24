import React, { useEffect } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { usePrepareContractWrite, useAccount, useContractWrite, useSigner } from "wagmi";
import { reporterAddr } from "../constants";
import reporterABI from "../constants/abis/reporter.json"

export default function SignInSide() {

    const { address } = useAccount()
    const [org, setOrg] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [publicKey, setPublicKey] = React.useState("")
    const [id, setId] = React.useState(0)
    const { data: signer } = useSigner();

    useEffect(() => {
        if (!signer) return
        signer.getAddress().then((addr) => {
            setPublicKey(addr)
        })
    }, [signer])

    const {config} = usePrepareContractWrite({
        address: reporterAddr,
        abi: reporterABI,
        functionName: "add",
        args: [address, name, email, org, publicKey, id],
    })

    const { write: addReporter } = useContractWrite(config)

    const handleSubmit = (event) => {
        event.preventDefault()
        addReporter?.()
    }

    const handleChange = (event) => {
        setOrg(event.target.value)
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setName(e.target.value)}
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
                            >
                                <MenuItem value={"I don't have org"}>I don't have org</MenuItem>
                                <MenuItem value={"The New York Times"}>The New York Times</MenuItem>
                                <MenuItem value={"CoinDesk"}>CoinDesk</MenuItem>
                                <MenuItem value={"ChainFeeds"}>ChainFeeds</MenuItem>
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
