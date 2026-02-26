import  {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, DatePicker } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

type Service = {
    id: number;
    name: string;
    duration: number;
    price: number;
};

type Employee = {
    id: number;
    name: string;
};

type Props = {
    salonName: string;
    serviceId: number | null;
    onClose: () => void;
};

const services: Service[] = [
    { id: 1, name: "Haircut", duration: 45, price: 500 },
    { id: 2, name: "Hair Coloring", duration: 120, price: 1500 },
    { id: 3, name: "Manicure", duration: 60, price: 800 },
    { id: 4, name: "Facial", duration: 75, price: 1000 },
];

const employees: Employee[] = [
    { id: 1, name: "Jane Smith" },
    { id: 2, name: "Mike Davis" },
];

const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
];

const BookingFlow: React.FC<Props> = ({ salonName, onClose }) => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    const toggleService = (id: number) => {
        setSelectedServiceIds(prev =>
            prev.includes(id)
                ? prev.filter(sid => sid !== id)
                : [...prev, id]
        );
    };

    const selectedServices = services.filter(s =>
        selectedServiceIds.includes(s.id)
    );

    const totalDuration = selectedServices.reduce(
        (sum, s) => sum + s.duration,
        0
    );

    const totalPrice = selectedServices.reduce(
        (sum, s) => sum + s.price,
        0
    );

    const selectedEmployee = employees.find(
        e => e.id === selectedEmployeeId
    );

    const confirmBooking = () => {
        console.log({
            salonName,
            services: selectedServices,
            totalDuration,
            totalPrice,
            selectedDate,
            selectedTime,
            selectedEmployee,
        });

        alert("Booking Confirmed ");
        navigate("/customer/bookings");
        onClose();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div className="md:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                    Book Appointment
                </h2>

                {step === 1 && (
                    <>
                        <h3 className="mb-2 font-medium">
                            Select Services (Multiple)
                        </h3>

                        {services.map(service => {
                            const isSelected = selectedServiceIds.includes(service.id);
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`mb-3 cursor-pointer rounded-lg border-2 p-4 flex items-center gap-4 transition ${isSelected
                                        ? "border-blue-500 bg-white"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div >
                                        {isSelected ? (
                                            <CheckCircleOutlined className="text-blue-500! text-xl" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                        )}
                                    </div>
                                    <div className="">
                                        <h4 className="font-medium text-gray-800">{service.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{service.duration} mins</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-800">₹{service.price}</p>
                                    </div>
                                </div>
                            );
                        })}

                        <Button
                            type="primary"
                            block
                            disabled={selectedServiceIds.length === 0}
                            onClick={() => setStep(2)}
                            className="mt-6 bg-red-500 hover:bg-red-600 border-red-500"
                            size="large"
                        >
                            Continue →
                        </Button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h3 className="mb-2 font-medium">Select Date</h3>
                        <DatePicker
                            onChange={d =>
                                setSelectedDate(
                                    d?.format("YYYY-MM-DD") || null
                                )
                            }
                        />

                        <div className="mt-4 flex gap-2">
                            <Button onClick={() => setStep(1)}>Back</Button>
                            <Button
                                type="primary"
                                disabled={!selectedDate}
                                onClick={() => setStep(3)}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h3 className="mb-2 font-medium">Select Time</h3>

                        <div className="flex flex-wrap gap-2">
                            {timeSlots.map(time => (
                                <Button
                                    key={time}
                                    type={
                                        selectedTime === time
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button onClick={() => setStep(2)}>Back</Button>
                            <Button
                                type="primary"
                                disabled={!selectedTime}
                                onClick={() => setStep(4)}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h3 className="mb-2 font-medium">
                            Select Employee
                        </h3>

                        {employees.map(emp => (
                            <Card
                                key={emp.id}
                                onClick={() =>
                                    setSelectedEmployeeId(emp.id)
                                }
                                className={`mb-2 cursor-pointer ${selectedEmployeeId === emp.id
                                    ? "border-blue-500 bg-blue-50"
                                    : ""
                                    }`}
                            >
                                {emp.name}
                            </Card>
                        ))}

                        <div className="mt-4 flex gap-2">
                            <Button onClick={() => setStep(3)}>Back</Button>
                            
                        </div>
                    </>
                )}
            </div>

            <div className="border-gray-200 border rounded-lg p-4 h-fit sticky top-10 ">
                <h3 className="text-lg font-semibold mb-4">
                    Booking Summary
                </h3>

                <p className="border-b border-gray-200 pb-2"><b>Salon:</b> {salonName}</p>

                {selectedServices.length > 0 && (
                    <div className="space-y-3 py-3 ">
                        {selectedServices.map(s => (
                            <div key={s.id} className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium text-gray-800">{s.name}</h4>
                                    <p className="text-sm text-gray-500">{s.duration} mins</p>
                                </div>
                                <p className="font-semibold text-gray-800">₹{s.price}</p>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 pt-2">
                            <p className="font-semibold text-gray-800">
                                Total: ₹{selectedServices.reduce((sum, s) => sum + s.price, 0)}
                            </p>
                        </div>
                    </div>
                    
                )}

                {selectedDate && (
                    <div className=" py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600"><b>Date:</b> {selectedDate}</p>
                    </div>
                )}

                {selectedTime && (
                    <div className=" py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600"><b>Time:</b> {selectedTime}</p>
                    </div>
                )}

                {selectedEmployee && (
                    <div className=" py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600"><b>Employee:</b> {selectedEmployee.name}</p>
                    </div>
                )}

                {selectedServices.length > 0 && (
                    <Button
                        type="primary"
                        block
                        disabled={!selectedDate || !selectedTime || !selectedEmployeeId}
                        onClick={confirmBooking}
                        size="large"
                    >
                        Confirm Booking
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BookingFlow;
