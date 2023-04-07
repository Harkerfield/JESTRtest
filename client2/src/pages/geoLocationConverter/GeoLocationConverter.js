import React, { useState } from "react";
import {TextInput} from "flowbite-react";
function GeoLocationConverter() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const convertToDMS = (coordinate) => {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutes = (absolute - degrees) * 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;

    const direction = coordinate >= 0 ? "N" : "S";

    return `${degrees}° ${Math.floor(minutes)}' ${Math.floor(seconds)}" ${direction}`;
  };

  const convertToDM = (coordinate) => {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutes = (absolute - degrees) * 60;

    const direction = coordinate >= 0 ? "N" : "S";

    return `${degrees}° ${Math.floor(minutes)}' ${direction}`;
  };

  return (
    <div>
      <label htmlFor="latitude-input">Latitude:</label>
      <TextInput
        id="latitude-input"
        type="text"
        value={latitude}
        onChange={handleLatitudeChange}
      />

      <br />

      <label htmlFor="longitude-input">Longitude:</label>
      <TextInput
        id="longitude-input"
        type="text"
        value={longitude}
        onChange={handleLongitudeChange}
      />

      <br />

      {latitude && longitude && (
        <div>
          <p>Decimal degrees: {latitude}, {longitude}</p>
          <p>Degrees minutes seconds: {convertToDMS(latitude)}, {convertToDMS(longitude)}</p>
          <p>Degrees minutes: {convertToDM(latitude)}, {convertToDM(longitude)}</p>
        </div>
      )}
    </div>
  );
}

export default GeoLocationConverter;
