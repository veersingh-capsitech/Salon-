import { Layout, Tag, Modal, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import bookingsData from "../../utills/EmployeeBooking";

const { Content } = Layout;

type TabType = "all" | "upcoming" | "completed" | "cancelled";
type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

interface Booking {
    id: string;
    customer: string;
    date: string;
    start: string;
    end: string;
    services: string[];
    price: number;
    status: BookingStatus;
}


function EmployeeBooking() {
    const menuItems = [
        { key: "dashboard", label: "Dashboard", path: "/employee" },
        { key: "myBookings", label: "My Bookings", path: "/employee/bookings" },
    ];

    const [data, setData] = useState<Booking[]>(bookingsData);
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [cancelId, setCancelId] = useState<string | null>(null);
    const [viewData, setViewData] = useState<Booking | null>(null);

    const now = new Date();

    const upcoming = data.filter((b) => {
        const dt = new Date(`${b.date}T${b.start}`);
        return (
            b.status !== "Cancelled" &&
            b.status !== "Completed" &&
            dt > now
        );
    });

    const completed = data.filter((b) => b.status === "Completed");
    const cancelled = data.filter((b) => b.status === "Cancelled");

    let filtered = data;
    if (activeTab === "upcoming") filtered = upcoming;
    if (activeTab === "completed") filtered = completed;
    if (activeTab === "cancelled") filtered = cancelled;

    const handleCancelConfirm = () => {
        setData((prev) =>
            prev.map((b) =>
                b.id === cancelId ? { ...b, status: "Cancelled" } : b
            )
        );
        setCancelId(null);
    };

    const handleConfirm = () => {
        if (!viewData) return;
        setData((prev) =>
            prev.map((b) =>
                b.id === viewData.id ? { ...b, status: "Confirmed" } : b
            )
        );
        setViewData({ ...viewData, status: "Confirmed" });
    };

    const handleComplete = () => {
        if (!viewData) return;
        setData((prev) =>
            prev.map((b) =>
                b.id === viewData.id ? { ...b, status: "Completed" } : b
            )
        );
        setViewData({ ...viewData, status: "Completed" });
    };

    const columns: ColumnsType<Booking> = [
        { title: "Booking ID", dataIndex: "id" },
        { title: "Customer", dataIndex: "customer" },
        {
            title: "Date",
            render: (_, r) => new Date(r.date).toDateString(),
        },
        {
            title: "Time",
            render: (_, r) => `${r.start} - ${r.end}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: BookingStatus) => (
                <Tag
                    color={
                        status === "Pending"
                            ? "gold"
                            : status === "Confirmed"
                                ? "green"
                                : status === "Completed"
                                    ? "blue"
                                    : "red"
                    }
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: "Actions",
            render: (_, record) => {
                const bookingDateTime = new Date(
                    `${record.date}T${record.start}`
                );

                return (
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => setViewData(record)}
                        >
                            View
                        </Button>

                        <Button
                            danger
                            size="small"
                            disabled={
                                record.status === "Cancelled" ||
                                record.status === "Completed" ||
                                bookingDateTime <= now
                            }
                            onClick={() => setCancelId(record.id)}
                        >
                            Cancel
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar
                items={menuItems}
                userName="Employee User"
                userRole="Employee"
            />

            <Content className="p-4 md:p-6 md:ml-64">
                <h1 className="text-3xl font-semibold mb-1">My Bookings</h1>
                <p className="text-gray-500 mb-6">
                    Employee booking confirmation panel
                </p>

                <div className="flex gap-3 mb-6">
                    {(["all", "upcoming", "completed", "cancelled"] as TabType[]).map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-sm ${activeTab === tab
                                        ? "bg-white border"
                                        : "text-gray-500"
                                    }`}
                            >
                                {tab.toUpperCase()}
                            </button>
                        )
                    )}
                </div>

                <Table
                    columns={columns}
                    dataSource={filtered}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </Content>

            <Modal
                open={!!cancelId}
                onCancel={() => setCancelId(null)}
                onOk={handleCancelConfirm}
                okText="Yes, Cancel"
            >
                Are you sure you want to cancel <b>{cancelId}</b>?
            </Modal>

            <Modal
                open={!!viewData}
                title="Booking Details"
                onCancel={() => setViewData(null)}
                footer={[
                    ...(viewData?.status === "Pending"
                        ? [
                            <Button key="c" type="primary" onClick={handleConfirm}>
                                Confirm
                            </Button>,
                        ]
                        : []),
                    ...(viewData?.status === "Confirmed"
                        ? [
                            <Button
                                key="m"
                                rootClassName="!bg-green-600 !text-white"
                                onClick={handleComplete}
                            >
                                Mark Completed
                            </Button>,
                        ]
                        : []),
                    <Button key="x" onClick={() => setViewData(null)}>
                        Close
                    </Button>,
                ]}
            >
                {viewData && (
                    <div className="space-y-2 text-sm">
                        <p><b>ID:</b> {viewData.id}</p>
                        <p><b>Customer:</b> {viewData.customer}</p>
                        <p><b>Status:</b> {viewData.status}</p>
                        <p><b>Date:</b> {new Date(viewData.date).toDateString()}</p>
                        <p><b>Time:</b> {viewData.start} - {viewData.end}</p>
                        <p><b>Price:</b> ₹{viewData.price}</p>
                        <p><b>Services:</b> {viewData.services.join(", ")}</p>
                    </div>
                )}
            </Modal>
        </Layout>
    );
}

export default EmployeeBooking;
