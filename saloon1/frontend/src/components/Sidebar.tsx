import { Menu, Avatar, Button } from "antd";
import {
    LogoutOutlined,
    UserOutlined,
    MenuOutlined,
    ScissorOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
    title?: string;
    items: {
        key: string;
        label: string;
        path: string;
        icon?: React.ReactNode;
    }[];
    userName?: string;
    userRole?: string;
    onLogout?: () => void;
}

export default function Sidebar({
    title = "SaloonBook",
    items,
    userName = "",
    userRole = "",
    
}: SidebarProps) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
        const onLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const activeKey =
        items.find((item) => item.path === location.pathname)?.key || "";

    return (
        <>
            <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-white shadow sticky top-0 z-30">
                <button
                    onClick={() => setOpen(true)}
                    className="p-2 rounded-md bg-blue-500 text-white"
                >
                    <MenuOutlined />
                </button>
                <span className="font-semibold text-lg">{title}</span>
            </div>

            {/* {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )} */}

            <aside
                className={`
                    fixed top-0 left-0  h-screen overflow-auto w-64 bg-blue-900 z-50
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className=" flex justify-between items-center px-4 py-3 border-b border-blue-600">
                    <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-1">
                                <ScissorOutlined />
                        </div>
                        <span className="text-xl font-semibold text-white">
                            {title}
                        </span>
                    </div>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setOpen(false)}
                    >
                        <CloseOutlined />
                    </button>
                </div>
                <div className="flex flex-col h-[88%] justify-between">

                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        theme="dark"
                        rootClassName="px-3  !bg-transparent"
                        items={items.map((item) => ({
                            key: item.key,
                            icon: item.icon,
                            label: (
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ),
                            className:
                                activeKey === item.key
                                    ? "rounded-xl !bg-blue-500 !text-white"
                                    : "rounded-xl text-slate-100 hover:!bg-blue-400",
                        }))}
                    />

                    <div className=" px-4 py-3   border-t border-blue-600">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar icon={<UserOutlined />} rootClassName="!bg-blue-500" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {userName}
                                </p>
                                <p className="text-xs text-blue-300">
                                    {userRole}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={onLogout}
                            className="w-full bg-blue-500! text-white! border-none! hover:bg-blue-400!"
                        >
                            <LogoutOutlined /> Logout
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
