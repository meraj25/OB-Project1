import { useGetuserQuery } from "@/lib/api";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
    const { data, isLoading } = useGetuserQuery();

    if (isLoading) return null; 

    if (!data?.user) return <Navigate to="/login" replace />;

    return children;
}