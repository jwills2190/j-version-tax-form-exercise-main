import React, { ComponentProps } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, useField, ErrorMessage } from "formik";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { selectClaimedListingById } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";
import { Submission } from "../lib/applicationTypes";
import { requestExtension } from "../lib/api";
import { useDispatch } from "react-redux";
import { addSubmission } from "../redux/submissions";

type AppFieldProps = {
  label: string;
  name: string;
  // This line allows you to pass any styling options to the MaterialUI text
  // field that are allowed by TextField.
  sx?: ComponentProps<typeof TextField>["sx"];
}
// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
const AppField: React.FC<AppFieldProps> = ({
  label,
  name,
  sx,
}) => {
  const [field] = useField(name);
  const value = field.value || "";
  const errorText = "";
  return (
    <TextField
      fullWidth
      variant="outlined"
      id={name}
      label={label}
      sx={sx}
      {...field}
    />
  );
};
export default function Listing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = null } = useParams();
  // Used chatGPT to help write line 45.
  const listing = useAppSelector((state) => selectClaimedListingById(state, id))


  if (!listing) {
    return (
      <Box>Listing was not found!</Box>
    );
  }
  
  const initialValues: Submission = {
    listing,
    reason: ""
  };


 
  const validate = (values: Submission) => {
    const errors: Record<string, string> = {};
    if (values.reason === "" || !values.reason) {
      errors.reason= "Please state a reason for requesting an extension.";
      console.log(errors)
    } 
    
    return errors; 
  }

  // Used chatGPT to help write this function.
  const handleClaimListing = (listing) => {
    dispatch(addSubmission(listing));
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Request An Extension For {listing.name}
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validate} 
          onSubmit={(value) => {
            requestExtension(value)
            .then((submittedData) => {
              handleClaimListing(submittedData)
              navigate('/submissions');

              console.log(submittedData);
            })
            .catch((error) => { 
              console.log(error)
            })
            console.log(value)
          }}
        >
          <Form>
            <AppField label="Name" name="listing.name" />
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Mailing Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.mailingAddress.address1"/>
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.mailingAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.mailingAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.mailingAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.mailingAddress.zip"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Physical Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.physicalAddress.address1"
                  />
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.physicalAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.physicalAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.physicalAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.physicalAddress.zip"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppField
                    label="Reason for Extension Request"
                    name="reason"
                    />
                  <ErrorMessage name="reason" />

                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" type="submit">
                Submit Request
              </Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
}
