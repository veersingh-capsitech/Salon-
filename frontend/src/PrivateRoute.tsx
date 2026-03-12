import { Navigate, Outlet } from "react-router-dom";
import type { ReactElement } from "react";

interface Props {
    allowedRoles?: string[];
    children?: ReactElement;
}

type User = { role?: string } | null;

export default function PrivateRoute({ allowedRoles, children }: Props): ReactElement {
    const token = localStorage.getItem("token");

    const userString = localStorage.getItem("user");
    let user: User = null;
    if (userString) {
        try {
            user = JSON.parse(userString) as User;
        } catch {
            user = null;
        }
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const roleIsString = !!user && typeof user.role === "string";

    if (children) {
        if (!allowedRoles) return children;
        const isAuthorized = roleIsString && allowedRoles!.includes(user!.role as string);
        return isAuthorized ? children : <Navigate to="/unauthorized" replace />;
    }

  
    if (!allowedRoles) return <Outlet />;
    const isAuthorized = roleIsString && allowedRoles.includes(user!.role as string);
    return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}