import { Layout, Card, Table, Tag } from "antd";
import Sidebar from "../../components/Sidebar";
import bookings from "../../utills/EmployeeBooking";

const { Content } = Layout;

const getDuration = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMin = diffMs / 1000 / 60;
    return diffMin;
};

function EmployeeDashboard() {
    const menuItems = [
        { key: "dashboard", label: "Dashboard", path: "/employee" },
        { key: "myBookings", label: "My Bookings", path: "/employee/bookings" },
    ];

    const today = new Date().toDateString();

    const todaysData = bookings.filter(
        (b) => new Date(b.date).toDateString() === today
    );

    const columns = [
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (_: any, b: any) => `${b.date} • ${b.start}`,
        },
        {
            title: "Customer",
            dataIndex: "customer",
        },
        {
            title: "Service",
            dataIndex: "services",
            render: (s: string[]) => s.join(", "),
        },
        {
            title: "Duration",
            render: (_: any, b: any) => {
                const mins = getDuration(b.start, b.end);
                if (mins >= 60) {
                    const h = Math.floor(mins / 60);
                    const m = mins % 60;
                    return m ? `${h}h ${m}m` : `${h}h`;
                }
                return `${mins}m`;
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (p: number) => `$${p}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (s: string) => (
                <Tag
                    color={
                        s === "Completed"
                            ? "default"
                            : s === "Pending"
                                ? "gold"
                                : "green"
                    }
                >
                    {s}
                </Tag>
            ),
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
                <h1 className="text-xl md:text-2xl font-semibold mb-6">
                    Employee Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        {
                            label: "Total Bookings",
                            value: bookings.length,
                        },
                        {
                            label: "Today's Bookings",
                            value: todaysData.length,
                        },
                        {
                            label: "Pending",
                            value: bookings.filter(
                                (b) => b.status === "Pending"
                            ).length,
                        },
                        {
                            label: "Confirmed",
                            value: bookings.filter(
                                (b) => b.status === "Confirmed"
                            ).length,
                        },
                    ].map((item, idx) => (
                        <Card
                            key={idx}
                            className="rounded-xl shadow-md"
                        >
                            <p className="text-gray-500 text-sm">
                                {item.label}
                            </p>
                            <p className="text-xl md:text-2xl font-semibold mt-1">
                                {item.value}
                            </p>
                        </Card>
                    ))}
                </div>

                <Card className="rounded-xl shadow-md">
                    <h2 className="text-lg font-medium mb-4">
                        Today's Schedule
                    </h2>

                    {todaysData.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            No appointments scheduled for today
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={todaysData}
                            rowKey="id"
                            pagination={false}
                            scroll={{ x: 900 }}
                        />
                    )}
                </Card>
            </Content>
        </Layout>
    );
}

export default EmployeeDashboard;
