import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationsProvider"
import { EmployeeContext } from "../employees/EmployeesProvider"
import "./employees.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    

    //for edit, hold on to state of Employee in this view
    const [employee, setEmployees] = useState({name: "", locationId: 0})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {employeeId} = useParams();
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newEmployee = { ...employee }
      //Employee is an object with properties.
      //set the property to the new value
      newEmployee[event.target.name] = event.target.value
      //update state
      setEmployees(newEmployee)
    }

    const handleSaveEmployee = () => {
      if (parseInt(employee.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (employeeId){
          //PUT - update
          updateEmployee({
              id: employee.id,
              name: employee.name,
              locationId: parseInt(employee.locationId),
          })
          .then(() => history.push(`/employees/detail/${employee.id}`))
        }else {
          //POST - add
          addEmployee({
              name: employee.name,
              locationId: parseInt(employee.locationId),
          })
          .then(() => history.push("/employees"))
        }
      }
    }

    // Get customers and locations. If EmployeeId is in the URL, getEmployeeById
    useEffect(() => {
      getLocations().then(() => {
        if (employeeId){
          getEmployeeById(parseInt(employeeId))
          .then(employee => {
              setEmployees(employee)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="employeeForm">
        <h2 className="employeeForm__title">Hire Employee</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="EmployeeName">Employee name: </label>
            <input type="text" id="EmployeeName" name="name" required autoFocus className="form-control"
            placeholder="Employee name"
            onChange={handleControlledInputChange}
            defaultValue={employee.name}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="location">Assign to location: </label>
            <select value={employee.locationId} name="locationId" id="EmployeeLocation" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a location</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
  
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveEmployee()
          }}>
        {employeeId ? <>Save Employee</> : <>Add Employee</>}</button>
      </form>
    )
}














// import React, { useContext, useEffect, useState } from "react"
// import { LocationContext } from "../locations/LocationsProvider"
// import "./employees.css"
// import { useHistory } from 'react-router-dom';
// import { EmployeeContext } from "./EmployeesProvider"

// export const EmployeeForm = () => {
//     const { addEmployee } = useContext(EmployeeContext)
//     const { locations, getLocations } = useContext(LocationContext) 
  

//   /*
//   With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

//   Define the intial state of the form inputs with useState()
//   */

//   const [employee, setEmployees] = useState({
//     name: "",
//     locationId: 0
//   });

//   const history = useHistory();

//   useEffect(() => {
//     getLocations()
//   }, [])

//   //when a field changes, update state. The return will re-render and display based on the values in state
//   //Controlled component
//   const handleControlledInputChange = (event) => {
//     /* When changing a state object or array,
//     always create a copy, make changes, and then set state.*/
//     const newEmployee = { ...employee }
//     /* Employee is an object with properties.
//     Set the property to the new value
//     using object bracket notation. */
//     newEmployee[event.target.id] = event.target.value
//     // update state
//     setEmployees(newEmployee)
//   }

//   const handleClickSaveEmployee = (event) => {
//     event.preventDefault() //Prevents the browser from submitting the form

//     const locationId = parseInt(employee.locationId)

//     if (locationId === 0) {
//       window.alert("Please select a location and a customer")
//     } else {
//       //Invoke addEmployee passing the new Employee object as an argument
//       //Once complete, change the url and display the Employee list

//       const newEmployee = {
//         name: employee.name,
//         locationId: locationId,
//       }
//       addEmployee(newEmployee)
//         .then(() => history.push("/employees"))
//     }
//   }

//   return (
//     <form className="employeeForm">
//       <h2 className="employeeForm__title">New Employee</h2>
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="name">Employee name:</label>
//           <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" value={employee.name} onChange={handleControlledInputChange} />
//         </div>
//       </fieldset>
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="location">Assign to location: </label>
//           <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
//             <option value="0">Select a location</option>
//             {locations.map(l => (
//               <option key={l.id} value={l.id}>
//                 {l.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </fieldset>
//       <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
//         Save Employee
//           </button>
//     </form>
//   )
// }