import React from 'react'
import CustomerLogin from './View/Customer/CreateCustomer'
import CreateRestaurant from './View/Restaurant/CreateRestaurant'
import CustomerList from './View/Customer/CustomerList'
import RestaurantList from './View/Restaurant/RestaurantList'
import LoginCustomer from './View/Customer/LoginCustomer'
import CreateCustomer from './View/Customer/CreateCustomer'
import LoginRestaurant from './View/Restaurant/LoginRestaurant'
import CreateEmployee from './View/Employeer/CreateEmployee'
import EmployeeList from './View/Employeer/EmployeeList'
import LoginEmployee from './View/Employeer/LoginEmployee'
function App() {
  return (
    <>
      <CreateEmployee/>
      <EmployeeList/>
      <LoginEmployee/>
    </>
  )
}

export default App
