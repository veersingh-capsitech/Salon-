import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactElement } from "react";

interface Props {
    allowedRoles: string[];
    children: ReactElement;
}

export default function RoleGuard({ allowedRoles, children }: Props) {

    const { user } = useAuth();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role || "")) {
        return <Navigate to="/" replace />;
    }

    return children;
}