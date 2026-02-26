import Sidebar from "../../components/Sidebar";
import { Layout, Button, Input, Checkbox, TimePicker, message } from "antd";
import {
    AppstoreOutlined,
    CalendarOutlined,
    ScissorOutlined,
    TeamOutlined,
    ApartmentOutlined,
    EditOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Content } = Layout;

interface CompanyInfo {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
}

interface WorkingHour {
    day: string;
    open: boolean;
    start: string;
    end: string;
}

function CompanyProfile() {
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




    const initialHours: WorkingHour[] = [
        { day: "Monday", open: true, start: "09:00", end: "18:00" },
        { day: "Tuesday", open: true, start: "09:00", end: "18:00" },
        { day: "Wednesday", open: true, start: "09:00", end: "18:00" },
        { day: "Thursday", open: true, start: "09:00", end: "20:00" },
        { day: "Friday", open: true, start: "09:00", end: "20:00" },
        { day: "Saturday", open: true, start: "10:00", end: "17:00" },
        { day: "Sunday", open: false, start: "10:30", end: "16:00" },
    ];
    const [editMode, setEditMode] = useState(false);
    const [info, setInfo] = useState<CompanyInfo | null>(null);
    const [workingHours, setWorkingHours] =
        useState<WorkingHour[]>(initialHours);

    const [salonId, setSalonId] = useState<string>("");
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser.role === "Admin" && storedUser.salonId) {
            setSalonId(storedUser.salonId);
            console.log("Salon ID set from localStorage:", storedUser.salonId);
        }
    }, []);
    useEffect(() => {
        if (salonId) {
            loadCompanyInfo();
        }
    }, [salonId]);


    const loadCompanyInfo = async () => {
        const response = await fetch("http://localhost:3500/api/auth/salon");
        const data = await response.json();
        console.log("Salon data:", data);
        const salon = data.filter((s: any) => s._id === salonId);
        if (salon && salon.length > 0) {
            setInfo({
                name: salon[0].salonName,
                description: salon[0].description,
                address: salon[0].address,
                phone: salon[0].phone,
                email: salon[0].email,
            });
        }
    }

    const handleSave = () => {
        setEditMode(false);
        message.success("Profile updated successfully!");
    };
    const handleCancel = () => {
        setInfo(null);
        setWorkingHours(initialHours);
        setEditMode(false);
        message.info("Changes discarded");
    };
    console.log(info)

    const handleHoursChange = (
        index: number,
        key: keyof WorkingHour,
        value: string | boolean
    ) => {
        setWorkingHours(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };
            return updated;
        });
    };

    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar items={menuItems} userName="Admin User" userRole="Admin" />

            <Content className="p-4 md:p-6 md:ml-64">
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-xl md:text-2xl font-semibold ">
                        Company Profile
                    </h1>

                    {!editMode && (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => setEditMode(true)}
                            rootClassName="!bg-blue-500 !rounded-xl"
                        >
                            Edit Profile
                        </Button>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded-xl p-5">
                        <h2 className="text-lg font-semibold mb-4">
                            Basic Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="font-medium text-sm">
                                    Company Name
                                </label>
                                <Input
                                    disabled={!editMode}
                                    value={info?.name || ""}

                                />
                            </div>

                            <div>
                                <label className="font-medium text-sm">
                                    Description
                                </label>
                                <Input.TextArea
                                    rows={3}
                                    disabled={!editMode}
                                    value={info?.description}

                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-1 font-medium text-sm">
                                        <EnvironmentOutlined /> Address
                                    </label>
                                    <Input
                                        disabled={!editMode}
                                        value={info?.address}

                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1 font-medium text-sm">
                                        <PhoneOutlined /> Phone
                                    </label>
                                    <Input
                                        disabled={!editMode}
                                        value={info?.phone}

                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-1 font-medium text-sm">
                                    <MailOutlined /> Email
                                </label>
                                <Input
                                    disabled={!editMode}
                                    value={info?.email}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-5">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <ClockCircleOutlined /> Working Hours
                        </h2>

                        <div className="space-y-3">
                            {workingHours.map((item, index) => (
                                <div
                                    key={item.day}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 rounded-lg p-3"
                                >
                                    <div className="font-medium">
                                        {item.day}
                                    </div>

                                    <Checkbox
                                        disabled={!editMode}
                                        checked={item.open}
                                        onChange={e =>
                                            handleHoursChange(
                                                index,
                                                "open",
                                                e.target.checked
                                            )
                                        }
                                    >
                                        Open
                                    </Checkbox>

                                    {item.open ? (
                                        <div className="flex items-center gap-2">
                                            <TimePicker
                                                disabled={!editMode}
                                                value={dayjs(
                                                    item.start,
                                                    "HH:mm"
                                                )}
                                                format="hh:mm A"
                                                use12Hours
                                                onChange={t =>
                                                    handleHoursChange(
                                                        index,
                                                        "start",
                                                        t
                                                            ? t.format("HH:mm")
                                                            : item.start
                                                    )
                                                }
                                            />
                                            <span>to</span>
                                            <TimePicker
                                                disabled={!editMode}
                                                value={dayjs(
                                                    item.end,
                                                    "HH:mm"
                                                )}
                                                format="hh:mm A"
                                                use12Hours
                                                onChange={t =>
                                                    handleHoursChange(
                                                        index,
                                                        "end",
                                                        t
                                                            ? t.format("HH:mm")
                                                            : item.end
                                                    )
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-gray-500 italic">
                                            Closed
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {editMode && (
                    <div className="flex gap-3 mt-6">
                        <Button
                            type="primary"
                            rootClassName="!bg-green-600"
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>
                        <Button danger onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}
            </Content>
        </Layout>
    );
}

export default CompanyProfile;
