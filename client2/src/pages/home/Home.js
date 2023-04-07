import React, { Component } from "react";
//import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import InfoIcon from "@mui/icons-material/Info";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArchitectureIcon from "@mui/icons-material/Architecture";

import { Link } from "react-router-dom";
// import GeoCoordinatesParser from './geoCoordinatesParser/GeoCoordinatesParser.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <CardLayout />
    </Box>
  );
}

function CardLayout() {
  const cardLinks = [
    {
      to: "/Schedule",
      name: "Schedule",
      icon: <EventAvailableIcon />,
    },
    {
      to: "/LocationList",
      name: "LocationList",
      icon: <MapIcon />,
    },
    {
      to: "/GeoLocationConverter",
      name: "GeoLocationConverter",
      icon: <MapIcon />,
    },
  ];

  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2}>
        {cardLinks.map((link) => (
          <Grid item xs={4} key={link}>
            <Link to={link.to}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign="center"
                    >
                      {link.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign="center"
                    >
                      {link.icon}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
