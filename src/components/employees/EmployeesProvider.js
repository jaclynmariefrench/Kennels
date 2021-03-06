import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const EmployeeContext = createContext()

// This component establishes what data can be used.
export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("http://kennel-api-react.herokuapp.com/employees?_expand=location")
        .then(res => res.json())
        .then(setEmployees)
    }

    const addEmployee = employeeObj => {
        return fetch("http://kennel-api-react.herokuapp.com/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
        .then(getEmployees)
    }

    const updateEmployee = employee => {
        return fetch(`http://kennel-api-react.herokuapp.com/employees/${employee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
          .then(getEmployees)
      }

      const getEmployeeById = (employeeId) => {
        return fetch(`http://kennel-api-react.herokuapp.com/employees/${employeeId}`)
        .then(res => res.json())
      }

    /*
        You return a context provider which has the
        `Employees` state, `getEmployees` function,
        and the `addEmployee` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, addEmployee, updateEmployee, getEmployeeById, setEmployees
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}