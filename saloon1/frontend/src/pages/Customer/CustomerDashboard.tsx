import { useState } from "react";
import {
    Layout,
    Input,
    Card,
    Button,
    Tag,
    Modal,
} from "antd";
import {
    EnvironmentOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/Sidebar";
import { salons, type Salon } from "../../utills/Customer";
import BookingFlow from "./BookAppointment";

const { Content } = Layout;
const { Search } = Input;

const CustomerDashboard: React.FC = () => {
    const [searchText, setSearchText] = useState("");
    const [viewSalon, setViewSalon] = useState<Salon | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

    const isSalonOpenNow = (hours?: Record<string, string>) => {
        if (!hours) return false;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = days[now.getDay()];
        const todayHours = hours[today];

        if (!todayHours || todayHours === "Closed") return false;

        const [open, close] = todayHours.split(" - ");
        const [oh, om] = open.split(":").map(Number);
        const [ch, cm] = close.split(":").map(Number);

        const openMin = oh * 60 + om;
        const closeMin = ch * 60 + cm;

        return currentMinutes >= openMin && currentMinutes < closeMin;
    };

    const salonsToRender = salons
        .filter(s =>
            s.name.toLowerCase().includes(searchText.toLowerCase()) ||
            s.address.toLowerCase().includes(searchText.toLowerCase())
        )
        .map(s => ({
            ...s,
            isOpen: isSalonOpenNow(s.hours),
        }));

    return (
        <Layout rootClassName="min-h-screen !bg-slate-100">
            <Sidebar
                items={[
                    { key: "CustomerDashboard", label: "Dashboard", path: "/customer" },
                    { key: "myBookings", label: "My Bookings", path: "/customer/bookings" },
                ]}
                userName="User"
                userRole="Customer"
            />

            <Content className="p-4 md:p-6 md:ml-64">
                <header className="mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Find Your Perfect Salon
                    </h1>
                    <p className="text-gray-600">
                        Discover top-rated salons near you and book instantly
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <h2 className="text-lg md:text-xl font-semibold">
                        {salonsToRender.length} Salons Found
                    </h2>

                    <Search
                        placeholder="Search salons..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {salonsToRender.map((salon) => (
                        <Card
                            key={salon.id}
                            hoverable
                            className="rounded-xl overflow-hidden"
                        >
                            <img
                                src={salon.image}
                                alt={salon.name}
                                className="h-48 w-full object-cover"
                            />

                            <div className="pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold">
                                        {salon.name}
                                    </h3>
                                    <Tag color={salon.isOpen ? "success" : "error"}>
                                        {salon.isOpen ? "Open" : "Closed"}
                                    </Tag>
                                </div>

                                <p className="text-gray-600 line-clamp-2 mb-4">
                                    <EnvironmentOutlined /> {salon.address}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {salon.services?.map(service => (
                                        <Tag
                                            key={service.id}
                                            rootClassName="!bg-blue-50 !text-blue-700"
                                        >
                                            {service.name}
                                        </Tag>
                                    ))}
                                </div>

                                <Button
                                    type="primary"
                                    disabled={!salon.isOpen}
                                    className="w-full"
                                    onClick={() => {
                                        setViewSalon(salon);
                                        setIsBookingOpen(true);
                                    }}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                <Modal
                    open={isBookingOpen}
                    footer={null}
                    width="90%"
                    style={{
                        top: 20,
                        maxWidth: 900,
                    }}
                    onCancel={() => {
                        setIsBookingOpen(false);
                        setSelectedServiceId(null);
                    }}
                >
                    {viewSalon && (
                        <BookingFlow
                            salonName={viewSalon.name}
                            serviceId={selectedServiceId}
                            onClose={() => setIsBookingOpen(false)}
                        />
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default CustomerDashboard;
