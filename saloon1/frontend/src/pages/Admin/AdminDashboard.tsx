import { Layout, Table, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {
    AppstoreOutlined,
    CalendarOutlined,
    ScissorOutlined,
    TeamOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import { useEffect, useState } from "react";
import {bookings} from "../../utills/data";
const { Content } = Layout;

function AdminDashboard() {
    const statusColors: Record<string, string> = {
        confirmed: "green",
        inprogress: "blue",
        pending: "orange",
        cancelled: "red",
    };

    const columns = [
        { title: "Booking ID", dataIndex: "bookingId", key: "bookingId" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Service", dataIndex: "service", key: "service" },
        { title: "Employee", dataIndex: "employee", key: "employee" },
        { title: "Time", dataIndex: "time", key: "time" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={statusColors[status]} className="capitalize">
                    {status}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Button type="text" icon={<EyeOutlined />} />
            ),
        },
    ];

    const menuItems = [
        { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard", path: "/admin" },
        { key: "bookings", icon: <CalendarOutlined />, label: "Bookings", path: "/admin/bookings" },
        { key: "services", icon: <ScissorOutlined />, label: "Services", path: "/admin/services" },
        { key: "employees", icon: <TeamOutlined />, label: "Employees", path: "/admin/employees" },
        {
            key: "companyProfile",
            icon: <ApartmentOutlined />,
            label: "Company Profile",
            path: "/admin/company-profile",
        },
    ];
    const [salonId, setSalonId] = useState<string>("");
    const [booking, setBookings] = useState<any[]>(bookings);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role === "Admin" && user.salonId) {
            setSalonId(user.salonId);
        }

    })

    const loadalldata =async () =>{
        const serviceRes = fetch("http://localhost:3500/api/auth/services", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const employeeRes = fetch("http://localhost:3500/api/auth/employees", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        // const bookingRes = fetch("http://localhost:3500/api/auth/bookings");
        // const Booking = await bookingRes.then(res => res.json());
        const Service = await serviceRes.then(res => res.json());
        const Employee = await employeeRes.then(res => res.json());
        // setBookings(Booking.filter((b: any) => b.salonId === salonId));
        setServices(Service.filter((s: any) => s.salonId === salonId));
        setEmployees(Employee.filter((e: any) => e.salonId === salonId));

    }
    useEffect(()=>{
        if(salonId){
            loadalldata();
        }
    },[salonId])
     console.log(services,employees)





    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar
                items={menuItems}
                userName="Admin User"
                userRole="Admin"
            />

            <Content className="p-4 md:p-6 md:ml-64">
                <header className="mb-6">
                    <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
                        Good morning, Admin!
                    </h1>
                    <p className="text-gray-500">
                        Here's what's happening at your salon today
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Bookings"
                        value="342"
                        change="+12% this month"
                        icon={<CalendarOutlined />}
                    />
                    <StatCard
                        title="Total Services"
                        value={services.length}
                        change="+2 this month"
                        icon={<ScissorOutlined />}
                    />
                    <StatCard
                        title="Total Employees"
                        value={employees.length}
                        change="+1 this month"
                        icon={<TeamOutlined />}
                    />
                    <StatCard
                        title="Total Revenue"
                        value="$24,560"
                        change="+8% this month"
                        icon={<ApartmentOutlined />}
                    />
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                        <div>
                            <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
                                Today's Bookings
                            </h2>
                            <p className="text-gray-500">
                                Manage and track all appointments
                            </p>
                        </div>
                        <Button type="link" className="text-blue-600">
                            View All →
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={booking}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 900 }}
                    />
                </div>
            </Content>
        </Layout>
    );
}

export default AdminDashboard;
