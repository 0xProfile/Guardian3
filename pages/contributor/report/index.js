import { Button, Grid, Step, StepLabel, Stepper, Typography, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SelectReport from "./selectReport";
import SelectFile from "./selectFile";
import SendReport from "./sendReport";

const steps = [
    "Select reporter",
    "Prepare report",
    "Send report",
]

export default function index() {
    const [activeStep, setActiveStep] = React.useState(0);
    
    const [files, setFiles] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [formData, setFormData] = React.useState({
        accessCount: 1,
        duration: 1,
        encryption: "AES"
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
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
                            activeStep === steps.length - 1 ? () => console.log("Submit") : handleNext
                        }> {activeStep === steps.length - 1 ? "Submit" : "Next"} </Button>
                    </Box>
                </>
            </Grid>
        </Grid>
    )
}
