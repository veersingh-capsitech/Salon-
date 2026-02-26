import SalonAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard"
import CompaniesDetails from "./pages/SuperAdmin/companiesDetails"
import UserDetails from "./pages/SuperAdmin/userDetails"
import NewRequests from "./pages/SuperAdmin/newRequests"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CompanyProfile from "./pages/Admin/CompanyProfile"
import Employees from "./pages/Admin/Employees"
import SalonServices from "./pages/Admin/SalonServices"
import SalonBooking from "./pages/Admin/SalonBooking"
import EmployeeBooking from "./pages/Employee/EmployeeBooking"
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard"
import CustomerDashboard from "./pages/Customer/CustomerDashboard"
import CustomerBooking from "./pages/Customer/CustomerBooking"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Home from "./pages/Home"
import PrivateRoute from "./PrivateRoute"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/superAdmin" element={<PrivateRoute><SalonAdminDashboard /></PrivateRoute>} />
      <Route path="/superAdmin/companies" element={<PrivateRoute><CompaniesDetails /></PrivateRoute>} />
      <Route path="/superAdmin/users" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
      <Route path="/superAdmin/Requests" element={<PrivateRoute><NewRequests /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/company-profile" element={<PrivateRoute><CompanyProfile /></PrivateRoute>} />
      <Route path="/admin/employees" element={<PrivateRoute><Employees /></PrivateRoute>} />
      <Route path="/admin/services" element={<PrivateRoute><SalonServices /></PrivateRoute>} />
      <Route path="/admin/bookings" element={<PrivateRoute><SalonBooking /></PrivateRoute>} />
      <Route path="/employee/bookings" element={<PrivateRoute><EmployeeBooking /></PrivateRoute>} />
      <Route path="/employee" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
      <Route path="/customer" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
      <Route path="/customer/bookings" element={<PrivateRoute><CustomerBooking /></PrivateRoute>} />

    </Routes>
  )
}

export default App
