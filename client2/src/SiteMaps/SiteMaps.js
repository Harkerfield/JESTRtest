import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// openlayers
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';

import MapWrapper from '../components/openLayers/OpenLayers.js';

export default function SiteMaps() {
  // set intial state
  const [features, setFeatures] = useState([]);

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
  //  GeoJson API (read from flat .json file in public directory)

  {
    useEffect(() => {
      fetch('/mock-geojson-api.json')
        .then((response) => response.json())
        .then((fetchedFeatures) => {
          // parse fetched geojson into OpenLayers features
          //  use options to convert feature from EPSG:4326 to EPSG:3857
          const wktOptions = {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
          };
          const parsedFeatures = new GeoJSON().readFeatures(
            fetchedFeatures,
            wktOptions
          );

          // set features into state (which will be passed into OpenLayers
          //  map component as props)
          setFeatures(parsedFeatures);
        });
    }, []);
  }

  return (
    <Box className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              className="app-label"
            >
              Map
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <MapWrapper features={features} />
    </Box>
  );
}