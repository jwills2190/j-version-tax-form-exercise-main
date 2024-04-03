import React from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../lib/useAppSelector";
import { selectSubmissions } from "../redux/submissions";

export default function Submissions() {
  const submissions = useAppSelector(selectSubmissions);

  function formatDateTime(now) {
    const date = new Date(now)
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Pad single digits with leading zeros
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const strHours = hours.toString().padStart(2, '0');
    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');

    return `${month}/${day}/${year} ${strHours}:${strMinutes}:${strSeconds} ${ampm}`;

  }
  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
         <Typography variant="h4" sx={{ m: 1 }}>
          My Submissions
         </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Submitted At</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submissions.map((submission) => {
                const { listing } = submission;
                const createdAt = formatDateTime(submission.createdAt)
                return (
                  <TableRow key={submission.id}>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.physicalAddress.address1}</TableCell>
                    <TableCell>{listing.physicalAddress.city}</TableCell>
                    <TableCell>{listing.physicalAddress.state}</TableCell>
                    <TableCell>{listing.physicalAddress.zip}</TableCell>
                    <TableCell sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textWrap: "nowrap",
                      maxWidth: "200px",
                    }}>
                      {submission.reason}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
