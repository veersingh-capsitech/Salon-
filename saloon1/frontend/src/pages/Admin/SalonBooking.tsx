import Sidebar from "../../components/Sidebar";
import {
  Layout,
  Input,
  Button,
  Table,
  Tag,
  DatePicker,
  Select,
  message,
  Spin,
} from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  ScissorOutlined,
  TeamOutlined,
  ApartmentOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Content } = Layout;

interface Booking {
  _id: string;
  bookingId: string;
  customer: string;
  services: string[];
  employee: string;
  date: string;
  time: string;
  status: string;
  salonId: string;
}

function SalonBooking() {
  const [salonId, setSalonId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState("all");


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.role === "Admin" && storedUser.salonId) {
      setSalonId(storedUser.salonId);
    }
  }, []);


  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3500/api/auth/bookings",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        const filtered = salonId
          ? data.filter((b: any) => b.salonId === salonId)
          : data;

        setBookings(filtered);
        setFilteredBookings(filtered);
      }
    } catch {
      message.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (salonId) {
      loadBookings();
    }
  }, [salonId]);


  useEffect(() => {
    let temp = [...bookings];

    if (search) {
      temp = temp.filter(
        b =>
          b.customer.toLowerCase().includes(search.toLowerCase()) ||
          b.bookingId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDate) {
      temp = temp.filter(b =>
        dayjs(b.date).isSame(selectedDate, "day")
      );
    }

    if (selectedStatus !== "all") {
      temp = temp.filter(b => b.status === selectedStatus);
    }

    if (selectedEmployee !== "all") {
      temp = temp.filter(b => b.employee === selectedEmployee);
    }

    setFilteredBookings(temp);
  }, [search, selectedDate, selectedStatus, selectedEmployee, bookings]);


  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(
        `http://localhost:3500/api/auth/bookings/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      message.success("Status updated");
      loadBookings();
    } catch {
      message.error("Failed to update status");
    }
  };


  const statusColors: Record<string, string> = {
    confirmed: "green",
    completed: "green",
    pending: "orange",
    cancelled: "red",
  };


  const columns = [
    { title: "Booking ID", dataIndex: "bookingId" },
    { title: "Customer", dataIndex: "customer" },
    {
      title: "Services",
      dataIndex: "services",
      render: (services: string[]) => (
        <div className="flex flex-wrap gap-1">
          {services.map((service, idx) => (
            <Tag key={idx}>{service}</Tag>
          ))}
        </div>
      ),
    },
    { title: "Employee", dataIndex: "employee" },
    {
      title: "Date & Time",
      render: (record: Booking) => (
        <div>
          <div className="font-medium">{record.date}</div>
          <div className="text-sm text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (record: Booking) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={value => updateStatus(record._id, value)}
          options={[
            { label: "Confirmed", value: "confirmed" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
            { label: "Cancelled", value: "cancelled" },
          ]}
        />
      ),
    },
    {
      title: "View",
      render: () => <Button type="text" icon={<EyeOutlined />} />,
    },
  ];


  const menuItems = [
    { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard", path: "/admin" },
    { key: "bookings", icon: <CalendarOutlined />, label: "Bookings", path: "/admin/bookings" },
    { key: "services", icon: <ScissorOutlined />, label: "Services", path: "/admin/services" },
    { key: "employees", icon: <TeamOutlined />, label: "Employees", path: "/admin/employees" },
    { key: "companyProfile", icon: <ApartmentOutlined />, label: "Company Profile", path: "/admin/company-profile" },
  ];

  return (
    <Layout rootClassName="min-h-screen !bg-slate-100">
      <Sidebar items={menuItems} userName="Admin User" userRole="Admin" />

      <Content className="p-4 md:p-6 md:ml-64">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-gray-500">Manage all salon appointments</p>
        </header>

        <Input
          placeholder="Search by customer, ID..."
          prefix={<SearchOutlined />}
          className="w-full sm:w-96 mb-4"
          onChange={e => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mb-6">
          <DatePicker
            onChange={value => setSelectedDate(value)}
            className="w-44"
          />

          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="w-40"
            options={[
              { label: "All", value: "all" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />

          <Select
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            className="w-40"
            options={[
              { label: "All", value: "all" },
              ...Array.from(new Set(bookings.map(b => b.employee))).map(emp => ({
                label: emp,
                value: emp,
              })),
            ]}
          />
        </div>

        <div className="bg-white rounded-xl shadow">
          {loading ? (
            <Spin className="p-6" />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredBookings}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 900 }}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default SalonBooking;