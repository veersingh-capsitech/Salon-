import { Layout, Input, Select, Space, Table, Tag, Modal } from "antd";
import {
    AppstoreOutlined,
    BankOutlined,
    UserOutlined,
    FormOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/Sidebar";
// import { Data } from "../../utills/data";
import { useEffect, useState } from "react";

const { Content } = Layout;

function UserDetails() {

    const menuItems = [
        { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard", path: "/superAdmin" },
        { key: "companies", icon: <BankOutlined />, label: "Companies", path: "/superAdmin/companies" },
        { key: "users", icon: <UserOutlined />, label: "Users", path: "/superAdmin/users" },
        { key: "requests", icon: <FormOutlined />, label: "Requests", path: "/superAdmin/Requests" },
    ];
    const [users, setUsers] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const load = async () => {
        const response = await fetch("http://localhost:3500/api/auth/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();

        const formatted = data.map((user: any) => ({
            key: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role,
            status: user.isActive ? "Active" : "Inactive",
            salonName: user.salonId ? user.salonId.name : "N/A"
        }));
        setUsers(formatted);
    }
    useEffect(() => {
        load();
    }, []);

    const handleView = (user: any) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };
    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => {
                const colorMap: Record<string, string> = {
                    Admin: "blue",
                    customer: "green",
                    Employee: "orange",
                };
                return <Tag color={colorMap[role] || "default"}>{role}</Tag>;
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Active" ? "green" : "volcano"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Space>
                    <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleView(record)}
                    >
                        View
                    </button>
                    <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar
                items={menuItems}
                userName="Super Admin"
                userRole="Superadmin"
            />

            <Content className="p-4 md:p-6 md:ml-64">
                <header className="mb-6">
                    <h1 className="text-xl md:text-2xl font-semibold">
                        User Details
                    </h1>
                </header>

                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-6">
                    <Input.Search
                        placeholder="Search Users"
                        className="w-full sm:w-64!"
                    />
                    <Select defaultValue="all" className="w-full sm:w-48">
                        <Select.Option value="all">All Roles</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="user">User</Select.Option>
                        <Select.Option value="employee">Employee</Select.Option>
                    </Select>

                    <Select defaultValue="all" className="w-full sm:w-48">
                        <Select.Option value="all">All Statuses</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>


                </div>

                <div className="bg-white rounded-md">
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="key"
                        pagination={{ pageSize: 6 }}
                        scroll={{ x: 800 }}
                    />
                </div>
            </Content>
            <Modal
                title="User Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedUser && (
                    <div className="mb-4">
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Salon:</strong> {selectedUser.salonName}</p>
                    </div>
                )}
            </Modal>
        </Layout>
    );
}

export default UserDetails;
// function setSelectedUser(user: any) {
//     throw new Error("Function not implemented.");
// }

