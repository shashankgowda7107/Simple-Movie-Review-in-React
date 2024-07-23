import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Paper } from "@mui/material";
import logoImage from '../images/images.jpg';
import { LanguageAPI } from '../API';
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"; 

export default function LanDT() {
  const [language, setLanguage] = useState('');
  const [rows, setRows] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    lan_id: false,
  });

  const handleSave = async () => {
    try {
      const newRecord = {
        lan_name: language,
      };
      const res = await LanguageAPI.Language().Create(newRecord);
      console.log(res);
      setLanguage('');
      Swal.fire("Language Saved Successfully", "", "success");
      fetchdata()
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        Swal.fire("Error", "Failed to save language: Internal Server Error", "error"); // Show server error alert
      } else {
        Swal.fire("Error", "Failed to save language", "error"); // Show generic error alert
      }
    }
  }


  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };

  const columns = [
    {
      field: "lan_name",
      headerName: "Movie Languages",
      width: 200,
    },
  ];

  const handleChange = (event) => {
    setLanguage(event.target.value.toUpperCase());
  }

  const fetchdata = async () => {
    try {
      const response = await LanguageAPI.Language().FetchAll();
      setRows(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

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
        <Paper elevation={3} sx={{ width: "100%", marginTop: 20 }}>
          <Grid
            container
            spacing={2}
            marginTop={3}
            sx={{ padding: "20px", paddingTop: "1px" }}
          >
            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "0" }}>
              <Typography variant="h5">ADD MOVIE LANGUAGES</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="outlined-basic"
                label="Movie Name"
                variant="outlined"
                size="small"
                value={language}
                fullWidth
                name="supply"
                inputProps={{ maxLength: 30 }}
                onChange={handleChange}
                required
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
          <Box sx={{ height: 300, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.lan_id.toString()}
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

          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
