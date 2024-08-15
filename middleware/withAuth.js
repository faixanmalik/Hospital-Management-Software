import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Check if JWT token is in localStorage
      const myUser = localStorage.getItem("myUser");
      const token = myUser.token;

      if (token) {
        setIsAuthenticated(true); // Set authentication state to true if token exists
      } else {
        // If no token is found, redirect to login page
        router.push("/panel");
      }
    }, [router]);

    // If not authenticated, don't render the wrapped component
    if (!isAuthenticated) {
      return null;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;