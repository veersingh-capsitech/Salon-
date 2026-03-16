import { Routes, Route } from "react-router-dom";

import RoleGuard from "../components/RoleGuard";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import SalonAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import CompaniesDetails from "../pages/SuperAdmin/companiesDetails";
import UserDetails from "../pages/SuperAdmin/userDetails";
import NewRequests from "../pages/SuperAdmin/newRequests";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import CompanyProfile from "../pages/Admin/CompanyProfile";
import Employees from "../pages/Admin/Employees";
import SalonServices from "../pages/Admin/SalonServices";
import SalonBooking from "../pages/Admin/SalonBooking";

import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import EmployeeBooking from "../pages/Employee/EmployeeBooking";

import CustomerDashboard from "../pages/Customer/CustomerDashboard";
import CustomerBooking from "../pages/Customer/CustomerBooking";

export default function AppRoutes() {

    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/superAdmin"
                element={
                    <RoleGuard allowedRoles={["superadmin"]}>
                        <SalonAdminDashboard />
                    </RoleGuard>
                }
            />

            <Route path="/superAdmin/companies"
                element={
                    <RoleGuard allowedRoles={["superadmin"]}>
                        <CompaniesDetails />
                    </RoleGuard>
                }
            />

            <Route path="/superAdmin/users"
                element={
                    <RoleGuard allowedRoles={["superadmin"]}>
                        <UserDetails />
                    </RoleGuard>
                }
            />

            <Route path="/superAdmin/requests"
                element={
                    <RoleGuard allowedRoles={["superadmin"]}>
                        <NewRequests />
                    </RoleGuard>
                }
            />

            <Route path="/admin"
                element={
                    <RoleGuard allowedRoles={["Admin"]}>
                        <AdminDashboard />
                    </RoleGuard>
                }
            />

            <Route path="/admin/company-profile"
                element={
                    <RoleGuard allowedRoles={["Admin"]}>
                        <CompanyProfile />
                    </RoleGuard>
                }
            />

            <Route path="/admin/employees"
                element={
                    <RoleGuard allowedRoles={["Admin"]}>
                        <Employees />
                    </RoleGuard>
                }
            />

            <Route path="/admin/services"
                element={
                    <RoleGuard allowedRoles={["Admin"]}>
                        <SalonServices />
                    </RoleGuard>
                }
            />

            <Route path="/admin/bookings"
                element={
                    <RoleGuard allowedRoles={["Admin"]}>
                        <SalonBooking />
                    </RoleGuard>
                }
            />

            <Route path="/employee"
                element={
                    <RoleGuard allowedRoles={["employee"]}>
                        <EmployeeDashboard />
                    </RoleGuard>
                }
            />

            <Route path="/employee/bookings"
                element={
                    <RoleGuard allowedRoles={["employee"]}>
                        <EmployeeBooking />
                    </RoleGuard>
                }
            />

            <Route path="/customer"
                element={
                    <RoleGuard allowedRoles={["customer"]}>
                        <CustomerDashboard />
                    </RoleGuard>
                }
            />

            <Route path="/customer/bookings"
                element={
                    <RoleGuard allowedRoles={["customer"]}>
                        <CustomerBooking />
                    </RoleGuard>
                }
            />

        </Routes>
    );
}