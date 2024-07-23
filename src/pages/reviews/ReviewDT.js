import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Paper,Autocomplete } from "@mui/material";
import logoImage from '../images/reviews.webp';
import {  LanguageAPI, MovieAPI, ReviewAPI } from '../API';
// import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"; 
import dayjs from "dayjs";

export default function ReviewDT() {
  // const [columnVisibilityModel, setColumnVisibilityModel] = useState({
  //   // lan_id: false,
  // });
  // const getRowClassName = (params) => {
  //   const rowIndex = params.indexRelativeToCurrentPage;
  //   return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  // };
const [rows,setRows]=useState([])
const [languageData,setLanguageData]=useState([])
  const [storeMovieID,setStoreMovieID]=useState('')
  const [storeLanID,setStoreLanID]=useState('')
  const [reviews,setReviews]=useState('')
  useEffect(() => {
    fetchlandata();
  }, []);

  const fetchdata = async (value) => {
    try {
      const response = await MovieAPI.Movie().FetchById(value);
      setRows(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchlandata = async () => {
    try {
      const response = await LanguageAPI.Language().FetchAll();
      setLanguageData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFiledChange = async (fieldName, value) => {
    if (fieldName === 'movie_id' && value !== "") {
      setStoreMovieID(value)
    } else if (fieldName === 'movie_id' && value === "") {
      setStoreMovieID("")
    }

    if (fieldName === 'lan_id' && value !== "") {
      fetchdata(value)
      setStoreLanID(value)
    } else if (fieldName === 'lan_id' && value === "") {
      setStoreLanID("")
    }

    if (fieldName === 'review' && value !== "") {
      setReviews(value)
    } else if (fieldName === 'review' && value === "") {
      setReviews("")
    }
  }

  const handleSave = async () => {
    try {
      const newRecord = {
        reviews: reviews,
        movie_id: storeMovieID,
        review_date: dayjs().format('YYYY-MM-DD'), 
      };
      console.log(newRecord);
      const res = await ReviewAPI.Review().Create(newRecord);
      setStoreMovieID('');
      setReviews('');
      setStoreLanID('')
      Swal.fire("Review Submitted Successfully", "", "success");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        Swal.fire("Error", "Failed to save movie: Internal Server Error", "error"); // Show server error alert
      } else {
        Swal.fire("Error", "Failed to save movie", "error"); // Show generic error alert
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${logoImage})`,
        backgroundSize: 'cover',
        filter: 'blur(-0px)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      />
      <Box sx={{ zIndex: 1, width: '100%', maxWidth: '600px', padding: '20px' }}>
        <Paper elevation={3} sx={{ width: "100%", marginTop: 10 }}>
          <Grid
            container
            spacing={2}
            marginTop={3}
            sx={{ padding: "20px", paddingTop: "1px" }}
          >
            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "0" }}>
              <Typography variant="h5">SHARE YOUR REVIEWS</Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Autocomplete
                disablePortal
                options={languageData}
                id="combo-box-demo"
                size="small"
                // sx={autoCompleteStyle}
                getOptionLabel={(option) => option.lan_name}
                value={
                  languageData.find(
                    (option) =>
                      option.lan_id === storeLanID
                  ) || null
                }
                onChange={(event, value) =>
                  handleFiledChange(
                    "lan_id",
                    value ? value.lan_id : ""
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Select Language"
                  // error={Boolean(errors.activeStatus)}
                  // helperText={errors.activeStatus}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Autocomplete
                disablePortal
                options={rows}
                id="combo-box-demo"
                size="small"
                // sx={autoCompleteStyle}
                getOptionLabel={(option) => option.movie_name}
                value={
                  rows.find(
                    (option) =>
                      option.movie_id === storeMovieID
                  ) || null
                }
                onChange={(event, value) =>
                  handleFiledChange(
                    "movie_id",
                    value ? value.movie_id : ""
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Select Movie"
                  // error={Boolean(errors.activeStatus)}
                  // helperText={errors.activeStatus}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
                  id="outlined-basic"
                  label="Share Reviews"
                  variant="outlined"
                  size="small"
                  name="statusName"
                  required
                  value={reviews}
                  // sx={textFiledStyle}
                  fullWidth
                  onChange={(e) =>
                    handleFiledChange("review", e.target.value.toUpperCase())
                  }
                  multiline
                  rows={5}
                  // error={Boolean(errors.terms)}
                  // helperText={errors.terms}
                />
</Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} sx={{ marginLeft: 5 }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'green', marginLeft: '100px' }}
                  size="small"
                  onClick={handleSave}
                >
                  SAVE
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Grid xs={12} sm={12} md={12} lg={12}>
          {/* <Box sx={{ height: 300, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={movieData}
              columns={columns}
              getRowId={(row) => row.movie_id.toString()}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
              pageSizeOptions={[10, 20]}
              disableRowSelectionOnClick
              getRowHeight={() => 35}
              getRowClassName={getRowClassName}
              componentsProps={{
                noRowsOverlay: {
                  style: {
                    backgroundColor: 'white', // Set background color to white
                  },
                },
              }}
            />

          </Box> */}
        </Grid>
      </Box>
    </Box>
  )
}
