import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationsProvider = (props) => {
    const [locations, setLocations] = useState([])
    

    const getLocations = () => {
        return fetch("http://kennel-api-react.herokuapp.com/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = locationObj => {
        return fetch("http://kennel-api-react.herokuapp.com/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }

    const updateLocation = location => {
        return fetch(`http://kennel-api-react.herokuapp.com/locations/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }

      const getLocationsById = (locationId) => {
        return fetch(`http://kennel-api-react.herokuapp.com/locations/${locationId}`)
        .then(res => res.json())
      }



    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, updateLocation, getLocationsById, 
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}