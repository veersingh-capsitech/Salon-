export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface Booking {
  id: string;
  customer: string;
  date: string;
  start: string;
  end: string;
  services: string[];
  price: number;
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: "BK001",
    customer: "Emma Wilson",
    date: "2026-01-30",
    start: "10:00",
    end: "10:45",
    services: ["Haircut", "Styling"],
    price: 45,
    status: "Confirmed",
  },
  {
    id: "BK002",
    customer: "James Brown",
    date: "2026-01-29",
    start: "13:30",
    end: "14:15",
    services: ["Beard Trim"],
    price: 25,
    status: "Confirmed",
  },
  {
    id: "BK003",
    customer: "Sophia Miller",
    date: "2026-01-20",
    start: "15:00",
    end: "15:45",
    services: ["Facial"],
    price: 60,
    status: "Pending",
  },
  {
    id: "BK004",
    customer: "Oliver Smith",
    date: "2026-01-15",
    start: "11:00",
    end: "11:30",
    services: ["Haircut"],
    price: 20,
    status: "Completed",
  },
  {
    id: "BK005",
    customer: "Ava Johnson",
    date: "2026-01-18",
    start: "09:30",
    end: "10:15",
    services: ["Manicure", "Pedicure"],
    price: 70,
    status: "Cancelled",
  },
  {
    id: "BK006",
    customer: "Liam Davis",
    date: "2026-01-28",
    start: "14:00",
    end: "14:45",
    services: ["Hair Color"],
    price: 80,
    status: "Confirmed",
  },
  {
    id: "BK007",
    customer: "Isabella Garcia",
    date: "2026-02-03",
    start: "12:00",
    end: "12:45",
    services: ["Spa Treatment"],
    price: 90,
    status: "Pending",
  },
];

export default bookings;
