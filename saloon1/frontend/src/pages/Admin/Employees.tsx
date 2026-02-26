import Sidebar from "../../components/Sidebar";
import {
    Layout,
    Input,
    Button,
    Modal,
    Form,
    Checkbox,
    Switch,
    Tag,
    Card,
    Avatar,
    Popconfirm,
    message,
    Spin
} from "antd";
import {
    SearchOutlined,
    EditOutlined,
    PlusOutlined,
    UserOutlined,
    DeleteOutlined,
    AppstoreOutlined,
    CalendarOutlined,
    ScissorOutlined,
    TeamOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Content } = Layout;

interface Employee {
    id: string;
    name: string;
    email: string;
    services: string[];
    status: "Active" | "Inactive";
    salonId: string;
}

interface Service {
    _id: string;
    name: string;
}

function Employees() {

    const [salonId, setSalonId] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    /* ================= SALON ID ================= */

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser.role === "Admin" && storedUser.salonId) {
            setSalonId(storedUser.salonId);
        }
    }, []);


    const loadServices = async () => {
        try {
            const res = await fetch("http://localhost:3500/api/auth/services", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();

            if (Array.isArray(data)) {
                const filtered = salonId
                    ? data.filter((s: any) => s.salonId === salonId)
                    : data;

                setServicesData(filtered);
            }
        } catch {
            message.error("Failed to load services");
        }
    };

    /* ================= LOAD EMPLOYEES ================= */

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3500/api/auth/employees", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();

            if (Array.isArray(data)) {
                const filtered = salonId
                    ? data.filter((emp: any) => emp.salonId === salonId)
                    : data;

                setEmployees(
                    filtered.map((emp: any) => ({
                        id: emp._id,
                        name: emp.fullName,
                        email: emp.email,
                        services: emp.Services || [],
                        status: emp.isActive ? "Active" : "Inactive",
                        salonId: emp.salonId
                    }))
                );
            } else {
                setEmployees([]);
            }
        } catch {
            message.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (salonId) {
            loadEmployees();
            loadServices();
        }
    }, [salonId]);

    /* ================= SAVE ================= */

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const payload = {
                fullName: values.fullName,
                email: values.email,
                Services: values.services || [],
                isActive: values.activeStatus,
                salonId
            };

            if (editingEmployee) {
                await fetch(
                    `http://localhost:3500/api/auth/employees/${editingEmployee.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" ,
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(payload),
                    }
                );
                message.success("Employee updated");
            } else {
                await fetch("http://localhost:3500/api/auth/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                     },

                    body: JSON.stringify(payload),
                });
                message.success("Employee added");
            }

            setIsModalVisible(false);
            setEditingEmployee(null);
            form.resetFields();
            loadEmployees();

        } catch {
            message.error("Operation failed");
        }
    };

    /* ================= DELETE ================= */

    const handleDeleteEmployee = async (id: string) => {
        try {
            await fetch(`http://localhost:3500/api/auth/employees/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            message.success("Employee deleted");
            loadEmployees();
        } catch {
            message.error("Delete failed");
        }
    };


    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const servicesOptions = servicesData.map(s => ({
        label: s.name,
        value: s._id
    }));


    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar
                items={[
                    { key: "dashboard", icon: <AppstoreOutlined />, label: "Dashboard", path: "/admin" },
                    { key: "bookings", icon: <CalendarOutlined />, label: "Bookings", path: "/admin/bookings" },
                    { key: "services", icon: <ScissorOutlined />, label: "Services", path: "/admin/services" },
                    { key: "employees", icon: <TeamOutlined />, label: "Employees", path: "/admin/employees" },
                    { key: "companyProfile", icon: <ApartmentOutlined />, label: "Company Profile", path: "/admin/company-profile" },
                ]}
                userName="Admin User"
                userRole="Admin"
            />

            <Content className="p-4 md:p-6 md:ml-64">

                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold">Employees</h1>
                        <p className="text-gray-500">Manage your team members</p>
                    </div>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setEditingEmployee(null);
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        Add Employee
                    </Button>
                </header>

                <Input
                    placeholder="Search employees..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="w-full sm:w-96 mb-6"
                />

                {loading ? (
                    <Spin />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredEmployees.map(employee => (
                            <Card key={employee.id} className="rounded-xl shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar icon={<UserOutlined />} size={48} />
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {employee.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                {employee.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Tag color={employee.status === "Active" ? "green" : "red"}>
                                        {employee.status}
                                    </Tag>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-semibold mb-2">Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {employee.services.map(serviceId => {
                                            const serviceName =
                                                servicesData.find(s => s._id === serviceId)?.name;
                                            return <Tag key={serviceId}>{serviceName}</Tag>;
                                        })}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        block
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setEditingEmployee(employee);
                                            form.setFieldsValue({
                                                fullName: employee.name,
                                                email: employee.email,
                                                services: employee.services,
                                                activeStatus: employee.status === "Active"
                                            });
                                            setIsModalVisible(true);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Popconfirm
                                        title="Delete Employee?"
                                        onConfirm={() => handleDeleteEmployee(employee.id)}
                                    >
                                        <Button block danger icon={<DeleteOutlined />}>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <Modal
                    title={editingEmployee ? "Edit Employee" : "Add Employee"}
                    open={isModalVisible}
                    onOk={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                    okText="Save"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Assigned Services" name="services">
                            <Checkbox.Group options={servicesOptions} />
                        </Form.Item>

                        <Form.Item label="Active Status" name="activeStatus" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Form>
                </Modal>

            </Content>
        </Layout>
    );
}

export default Employees;