import { Button, Grid, Step, StepLabel, Stepper, Typography, Card, CardContent, CircularProgressWithLabel, CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { use, useEffect } from "react";
import SelectReport from "../../../components/selectReport";
import SelectFile from "../../../components/selectFile";
import SendReport from "../../../components/sendReport";
import { useAccount, usePrepareContractWrite, useSigner,useContractWrite, useContractEvent, useWaitForTransaction } from "wagmi";
import lighthouse from '@lighthouse-web3/sdk';
import { reportManageAddr } from '../../../constants';
import reportMangeABI from '../../../constants/abis/reportManage.json'

const steps = [
    "Select reporter",
    "Prepare report",
    "Send report",
]

export default function index() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showProgress, setShowProgress] = React.useState(false);
    const [progressValue, setProgressValue] = React.useState(0);

    const [called, setCalled] = React.useState(false);

    const [files, setFiles] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [formData, setFormData] = React.useState({
        accessCount: 1,
        duration: 1,
        encryption: "AES"
    });

    const [cid, setCid] = React.useState("Default CID");
    const [title, setTitle] = React.useState("Default Title");
    const {address} = useAccount();

    const { data: signer } = useSigner();

    const encryptionSignature = async() =>{
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
    }

    const {config} = usePrepareContractWrite({
        address: reportManageAddr,
        abi: reportMangeABI,
        functionName: "add",
        args: [cid, title, address, checked]
    })


    const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        setProgressValue(percentageDone);
      };

    const handleUpload = async (path) => {
        path.preventDefault();
    
        let sig = await encryptionSignature();
        setShowProgress(true);
        const response = await lighthouse.uploadEncrypted(path,
            sig.publicKey,
            "8e488fce-749c-47f6-b02d-82aa2ceea7dd",
            sig.signedMessage,
            progressCallback
          );
        const cid = response.data.Hash;
        setCid(cid);
        setTitle(response.data.Name);

        sig = await encryptionSignature();

        const res = await lighthouse.shareFile(
            sig.publicKey,
            checked,
            cid,
            sig.signedMessage
        );
        // setShowProgress(false);
    }

    const { write: addReport, data } = useContractWrite(config)

    const waitForTransaction = useWaitForTransaction({
        hash: data?.hash,
    })

    useEffect(() => {
        if (waitForTransaction?.status === "success") {
            console.log("Success");
            setShowProgress(false);
        }
    }, [waitForTransaction])

    useEffect(() => {
        if (cid !== "Default CID" && title !== "Default Title" && addReport && !called) {
            addReport();
            setCalled(true);
        }
    }, [cid, title, addReport])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
            <Modal open={showProgress}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Uploading...
                    </Typography>
                    <CircularProgress  />
                </Box>
            </Modal>
            <Grid item xs={10}>
                <Stepper activeStep={activeStep}>
                    {
                        steps.map((step, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>
                <>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 && <SelectReport checked={checked} setChecked={setChecked} />}
                        {activeStep === 1 && <SelectFile files={files} setFiles={setFiles} />}
                        {activeStep === 2 && <SendReport formData={formData} setFormData={setFormData} />}
                    </Box>
                </>
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}> Back </Button>
                        <Button variant="contained" onClick={
                            activeStep === steps.length - 1 ? async () => {
                                await handleUpload(files);
                            } : handleNext
                        }> {activeStep === steps.length - 1 ? "Submit" : "Next"} </Button>
                    </Box>
                </>
            </Grid>
        </Grid>
    )
}
