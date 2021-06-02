import React from "react";
import { Route } from "react-router-dom";
import { LocationsProvider } from "./locations/LocationsProvider";
import { LocationList } from "./locations/LocationsList";
import { AnimalProvider } from "./animal/AnimalProvider";
import { AnimalList } from "./animal/AnimalList";
import { EmployeeProvider } from "./employees/EmployeesProvider";
import { EmployeeList } from "./employees/EmployeesList";
import { CustomerProvider } from "./Customer/CustomerProvider";
import { CustomerList } from "./Customer/CustomerList";
import { AnimalForm } from "./animal/AnimalForm";
import { EmployeeForm } from "./employees/EmployeeForm";

export const ApplicationViews = () => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <LocationsProvider>
        <Route exact path="/locations">
          <LocationList />
        </Route>
      </LocationsProvider>

      {/* Render the animal list when http://localhost:3000/animals */}
      <AnimalProvider>
          <LocationsProvider>
            <CustomerProvider>
                <Route exact path="/animals">
                    <AnimalList />
                </Route>

                <Route exact path="/animals/create">
                    <AnimalForm />
                </Route>
        
                </CustomerProvider>

            </LocationsProvider>
        </AnimalProvider>

      <EmployeeProvider>
        <LocationsProvider>
        <Route exact path="/employees">
          <EmployeeList />
        </Route>
        <Route exact path="/employees/create">
          <EmployeeForm/>
        </Route>
        </LocationsProvider>
      </EmployeeProvider>
      <CustomerProvider>
        <Route exact path="/customers">
          <CustomerList />
        </Route>
      </CustomerProvider>
    </>
  );
};