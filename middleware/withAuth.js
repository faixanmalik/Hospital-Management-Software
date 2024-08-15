import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check if JWT token is in localStorage
      const myUser = localStorage.getItem("myUser");

      if (myUser) {
        setIsAuthenticated(true);
      } else {
        router.push("/panel");
      }

      setIsLoading(false); // Authentication check is complete
    }, [router]);

    if (isLoading) {
      // Optionally, you can show a loading spinner or placeholder
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // Prevent rendering the component if not authenticated
      return null;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
