/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  // const { isAuthenticated, isLoading } = useUser();
  const isAuth = localStorage.getItem("isAuthenticated");
  console.log(isAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuth === "true" ? true : false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
