import React, { useState, useEffect, useContext } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Icon, Fill, Text } from "ol/style";
import XYZ from "ol/source/XYZ";
import { jestrContext } from "../../App";
import LocationListTable from "./LocationListTable";
import { transform } from "ol/proj";
import mapIcon from "./mapIcon.png";
import ol from "../../components/openLayers/ol.js";

import "./Map.css";

const LocationList = () => {
  const { options, setOptions } = useContext(jestrContext);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);

  const [popupContent, setPopupContent] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    fetch(options.threatsUrl)
      .then((results) => results.json())
      .then((data) => setLocations(data.d.results));
  }, []);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
      ],
      view: new View({
        projection: "EPSG:3857",
        center: fromLonLat([-146.44166473513687, 64.31714411488758]),
        zoom: 8,
        maxZoom: 18,
      }),
      controls: [],
    });
    setMap(map);

    return () => {
      map.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (map) {
      const source = new VectorSource();
      selectedLocations.map((values) => {
        if (isNaN(values.Lon_x0020_DD) || isNaN(values.Lat_x0020_DD)) {
          return;
        }
        const feature = new Feature({
          geometry: new Point(
            fromLonLat([values.Lon_x0020_DD, values.Lat_x0020_DD])
          ),
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: `${mapIcon}`,
              scale: 0.1,
            }),
            text: new Text({
              font: "16px sans-serif",
              textAlign: "left",
              justify: "left",
              padding: [5, 5, 5, 5],
              offsetX: 75,
              text: `${values.Equipment}`,
              fill: new Fill({
                color: [0, 0, 0, 1],
              }),
              backgroundFill: new Fill({
                color:
                  values.Status === "GREEN"
                    ? "#00ff00"
                    : values.Status === "AMBER"
                    ? "#ffff00"
                    : values.Status === "RED"
                    ? "#ff0000"
                    : values.Status === "NA"
                    ? "#0000ff"
                    : [25, 118, 210, 0.6],
              }),
            }),
          })
        );

        feature.set("data", values);
        source.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source: source,
      });

      map.addLayer(vectorLayer);
      if (source.getFeatures().length > 0) {
        map.getView().fit(source.getExtent(), {
          padding: [10, 10, 10, 10],
        });
      }

      const element = document.getElementById("popup");

      const popup = new Overlay({
        element: element,
        positioning: "bottom-center",
        stopEvent: false,
      });
      map.addOverlay(popup);

      let popover;
      function disposePopover() {
        if (popover) {
          popover.dispose();
          popover = undefined;
        }
      }

      // Create a new overlay for the popup
      const popupOverlay = new Overlay({
        element: document.getElementById("popup-container"),
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -15],
      });
      map.addOverlay(popupOverlay);

      // Add a click event listener to the map view
      map.on("click", (event) => {
        // Get the feature at the clicked location
        const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);

        if (feature) {
          const values = feature.get("data");
          // Display popup content for the clicked feature

          feature.setStyle(
            new Style({
              image: new Icon({
                src: `${mapIcon}`,
                scale: 0.1,
              }),
            })
          );

          const text = feature.get("data").Equip_x002f_Threat;
          setPopupContent(text);
          // Move the popup overlay to the clicked location
          popupOverlay.setPosition(
            transform(event.coordinate, "EPSG:3857", "EPSG:4326")
          );
          // Show the popup
          setPopupVisible(true);
        } else {
          // Hide the popup if no feature was clicked
          setPopupVisible(false);
        }
      });

      return () => {
        map.removeLayer(vectorLayer);
      };
    }
  }, [selectedLocations, map]);

  // const [selectedRows, setSelectedRows] = React.useState([]);

  const handleUpdateSelectedRows = (selectedRows) => {
    setSelectedLocations(selectedRows);
  };

  return (
    <div>
      {/* Render the popup container */}
      {popupVisible && (
        <div id="popup-container" className="popup">
          {popupContent}
        </div>
      )}
      {/* <ol selectedLocations={selectedLocations} /> */}
      <div id="map" style={{ height: "500px", width: "100vw" }} />
      <div>
        <LocationListTable
          data={locations}
          onUpdateSelectedRows={handleUpdateSelectedRows}
        />
        {/* <p>Selected rows: {selectedRows.length}</p> */}
      </div>
    </div>
  );
};

export default LocationList;
