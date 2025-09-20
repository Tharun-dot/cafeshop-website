import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",   // square width
  height: "400px",  // square height
};

const mapWrapperStyle = {
  display: "flex",
  justifyContent: "flex-end", // push to right
  alignItems: "center",       // center vertically
  height: "100vh",            // full screen height
  paddingRight: "50px",       // space from right edge
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Unable to fetch location. Please enable GPS.");
        }
      );
    }
  }, []);

  // Search for nearby cafes once location is set
  const handleMapLoad = (map) => {
    if (!currentLocation) return;

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      radius: 2000, // within 2 km
      type: ["cafe"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const formatted = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          rating: place.rating,
        }));
        setCafes(formatted);
      }
    });
  };

  return (
    <div style={mapWrapperStyle}>
      <LoadScript googleMapsApiKey="AIzaSyCOgqfHZVgzYQQkZSSZkBbqJiG3OLXLJbo" libraries={["places"]}>
        {currentLocation && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={15}
            onLoad={handleMapLoad}
          >
            {/* User's current location */}
            <Marker
              position={currentLocation}
              icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
            />

            {/* Cafés */}
            {cafes.map((cafe) => (
              <Marker
                key={cafe.id}
                position={cafe.position}
                onClick={() => setSelectedCafe(cafe)}
              />
            ))}

            {/* Info Window */}
            {selectedCafe && (
              <InfoWindow
                position={selectedCafe.position}
                onCloseClick={() => setSelectedCafe(null)}
              >
                <div>
                  <h3>{selectedCafe.name}</h3>
                  <p>Rating: ⭐ {selectedCafe.rating || "N/A"}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
