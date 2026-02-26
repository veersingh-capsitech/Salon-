import { Layout, Table, Tag, Button, Modal } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const { Content } = Layout;

type TabType = "all" | "upcoming" | "completed" | "cancelled";
type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Booking = {
  id: string;
  salon: string;
  service: string;
  date: string;
  start: string;
  status: BookingStatus;
};

type EnrichedBooking = Booking & {
  datetime: Date;
};

const bookingsData: Booking[] = [
  {
    id: "1",
    salon: "Elite Salon",
    service: "Hair Cut",
    date: "2026-02-02",
    start: "10:30",
    status: "Confirmed",
  },
  {
    id: "2",
    salon: "Urban Look",
    service: "Facial",
    date: "2026-01-15",
    start: "14:00",
    status: "Completed",
  },
  {
    id: "3",
    salon: "Style Hub",
    service: "Hair Spa",
    date: "2026-01-10",
    start: "11:00",
    status: "Cancelled",
  },
];

function CustomerBooking() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [data, setData] = useState<Booking[]>(bookingsData);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [viewData, setViewData] = useState<EnrichedBooking | null>(null);

  const menuItems = [
    { key: "CustomerDashboard", label: "Dashboard", path: "/customer" },
    { key: "myBookings", label: "My Bookings", path: "/customer/bookings" },
  ];

  const now = new Date();

  const enriched: EnrichedBooking[] = data.map(b => ({
    ...b,
    datetime: new Date(`${b.date}T${b.start}`),
  }));

  const upcoming = enriched.filter(
    b =>
      b.status !== "Cancelled" &&
      b.status !== "Completed" &&
      b.datetime > now
  );

  const completed = enriched.filter(b => b.status === "Completed");
  const cancelled = enriched.filter(b => b.status === "Cancelled");

  let filtered: EnrichedBooking[] = enriched;
  if (activeTab === "upcoming") filtered = upcoming;
  if (activeTab === "completed") filtered = completed;
  if (activeTab === "cancelled") filtered = cancelled;

  const formatCode = (id: string) => `BK${id.padStart(3, "0")}`;

  const getStatusColor = (status: BookingStatus) => {
    if (status === "Confirmed") return "blue";
    if (status === "Completed") return "green";
    if (status === "Cancelled") return "red";
    return "gold";
  };

  const handleCancelConfirm = () => {
    setData(prev =>
      prev.map(b =>
        b.id === cancelId ? { ...b, status: "Cancelled" } : b
      )
    );
    setCancelId(null);
    setViewData(null);
  };

  const columns = [
    { title: "Salon", dataIndex: "salon" },
    { title: "Service", dataIndex: "service" },
    {
      title: "Date & Time",
      render: (_: any, record: EnrichedBooking) =>
        `${record.date} • ${record.start}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: BookingStatus) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      render: (_: any, record: EnrichedBooking) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => setViewData(record)} rootClassName="!bg-blue-500 !text-white border !border-blue-700">
            View
          </Button>
          <Button
            danger
            size="small"
            disabled={
              record.status === "Cancelled" ||
              record.status === "Completed" ||
              record.datetime <= now
            }
            onClick={() => setCancelId(record.id)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout rootClassName="min-h-screen !bg-slate-100">
      <Sidebar items={menuItems} userName="User" userRole="Customer" />

      <Content className="p-4 md:p-6 md:ml-64">
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            My Bookings
          </h1>
          <p className="text-gray-600">
            View and manage your salon appointments
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-4">
          {(["all", "upcoming", "completed", "cancelled"] as TabType[]).map(
            tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm border transition
                  ${activeTab === tab
                    ? "border-gray-400 bg-white"
                    : "border-transparent text-gray-500"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          rowClassName={(record: EnrichedBooking) =>
            record.status === "Cancelled" ? "opacity-50" : ""
          }
        />

        <Modal
          open={!!cancelId}
          onOk={handleCancelConfirm}
          onCancel={() => setCancelId(null)}
          okText="Yes, Cancel"
          okButtonProps={{ danger: true }}
          title="Cancel Booking"
        >
          Are you sure you want to cancel this booking?
        </Modal>

        <Modal
          open={!!viewData}
          onCancel={() => setViewData(null)}
          footer={null}
        >
          {viewData && (
            <div>
              <h1 className="text-xl font-semibold mb-3">
                {viewData.salon}
              </h1>

              <div className="flex justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm
                    ${viewData.status === "Confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : viewData.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  <CheckCircleOutlined className="mr-2" />
                  {viewData.status}
                </span>

                <span className="text-gray-500">
                  {formatCode(viewData.id)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <CalendarOutlined /> {viewData.date}
                </div>
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined /> {viewData.start}
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <EnvironmentOutlined /> 123 Main St, New York
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <UserOutlined /> Sarah J.
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">Service</div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {viewData.service}
                </span>
              </div>

              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <PhoneOutlined /> +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-2">
                  <MailOutlined /> contact@salon.com
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
}

export default CustomerBooking;
