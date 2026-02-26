
export interface UserData {
  key: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Employee";
  status: "Active" | "Inactive";
}

export interface CompanyData {
  key: string;
  name: string;
  owner: string;
  email: string;
  bookings: number;
  status: "Active" | "Inactive";
}

export interface BookingPoint {
  day: string;
  value: number;
}

export interface RevenuePoint {
  month: string;
  value: number;
}
interface Booking {
  id: string;
  bookingId: string;
  customer: string;
  services: string[];
  employee: string;
  date: string;
  time: string;
  status: "confirmed" | "completed" | "pending" | "cancelled";
}





// ===================
// DATA
// ===================
export const Data: UserData[] = [
  { key: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { key: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  { key: "3", name: "Mike Johnson", email: "mike@example.com", role: "Employee", status: "Active" },
  { key: "4", name: "Emily Davis", email: "emily@example.com", role: "Employee", status: "Active" },
  { key: "5", name: "William Brown", email: "william@example.com", role: "User", status: "Active" },
  { key: "6", name: "Olivia Wilson", email: "olivia@example.com", role: "User", status: "Active" },
  { key: "7", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { key: "8", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  { key: "9", name: "Mike Johnson", email: "mike@example.com", role: "Employee", status: "Active" },
];

export const CompaniesData: CompanyData[] = [
  { key: "1", name: "Glamour Salon", owner: "Alice Johnson", email: "alice@example.com", bookings: 1200, status: "Active" },
  { key: "2", name: "Style Studio", owner: "Bob Smith", email: "bob@example.com", bookings: 850, status: "Inactive" },
  { key: "3", name: "Elegance Hair", owner: "Catherine Lee", email: "catherine@example.com", bookings: 1500, status: "Active" },
  { key: "4", name: "Urban Cuts", owner: "David Brown", email: "david@example.com", bookings: 600, status: "Active" },
  { key: "5", name: "Chic Salon", owner: "Eva Green", email: "eva@example.com", bookings: 950, status: "Active" },
  { key: "6", name: "Pure Beauty", owner: "Frank Miller", email: "frank@example.com", bookings: 1100, status: "Active" },
  { key: "7", name: "Velvet Touch", owner: "Grace Hall", email: "grace@example.com", bookings: 450, status: "Inactive" },
  { key: "8", name: "Modern Manes", owner: "Henry Ford", email: "henry@example.com", bookings: 1300, status: "Active" },
  { key: "9", name: "Radiant Glow", owner: "Ivy Watson", email: "ivy@example.com", bookings: 720, status: "Active" },
  { key: "10", name: "Silk & Shine", owner: "Jack Ross", email: "jack@example.com", bookings: 980, status: "Inactive" },
  { key: "11", name: "The Parlor", owner: "Kelly King", email: "kelly@example.com", bookings: 1400, status: "Active" },
  { key: "12", name: "Glow Station", owner: "Liam Scott", email: "liam@example.com", bookings: 300, status: "Active" },
  { key: "13", name: "Aura Salon", owner: "Mia Adams", email: "mia@example.com", bookings: 880, status: "Inactive" },
  { key: "14", name: "Prism Hair", owner: "Noah Reed", email: "noah@example.com", bookings: 1250, status: "Active" },
  { key: "15", name: "Luxe Locks", owner: "Olivia Bell", email: "olivia@example.com", bookings: 540, status: "Active" },
  { key: "16", name: "Trend Setters", owner: "Peter White", email: "peter@example.com", bookings: 1020, status: "Active" },
  { key: "17", name: "Bloom Beauty", owner: "Quinn Diaz", email: "quinn@example.com", bookings: 770, status: "Inactive" },
  { key: "18", name: "Zen Studio", owner: "Riley Ward", email: "riley@example.com", bookings: 910, status: "Active" },
  { key: "19", name: "Dapper Cuts", owner: "Sam Turner", email: "sam@example.com", bookings: 1150, status: "Active" },
  { key: "20", name: "Vivid Styles", owner: "Tara Hill", email: "tara@example.com", bookings: 690, status: "Active" }
];

export const BookingsData: BookingPoint[] = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 180 },
  { day: "Wed", value: 240 },
  { day: "Thu", value: 200 },
  { day: "Fri", value: 310 },
  { day: "Sat", value: 420 },
  { day: "Sun", value: 390 },
];

export const RevenueData: RevenuePoint[] = [
  { month: "Jan", value: 5200 },
  { month: "Feb", value: 6100 },
  { month: "Mar", value: 7200 },
  { month: "Apr", value: 6800 },
  { month: "May", value: 8100 },
  { month: "Jun", value: 8945 },
];
export  const bookings: Booking[] = [
    {
      id: "1",
      bookingId: "BK001",
      customer: "Emma Wilson",
      services: ["Haircut", "Styling"],
      employee: "Sarah J.",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: "2",
      bookingId: "BK002",
      customer: "James Brown",
      services: ["Beard Trim"],
      employee: "Mike S.",
      date: "2024-01-15",
      time: "11:30 AM",
      status: "completed"
    },
    {
      id: "3",
      bookingId: "BK003",
      customer: "Sophie Chen",
      services: ["Hair Color", "Treatment"," Manicure"],
      employee: "Anna K.",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "pending"
    },
    {
      id: "4",
      bookingId: "BK004",
      customer: "Oliver Smith",
      services: ["Full Treatment"],
      employee: "Sarah J.",
      date: "2024-01-16",
      time: "9:00 AM",
      status: "confirmed"
    }
  ];