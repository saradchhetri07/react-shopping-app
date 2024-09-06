import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-client";

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { request, cancel } = userService.getAll<User>();
      try {
        const response = await request;
        setUsers(response.data);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setErrors((error as Error).message);
      } finally {
        setLoading(false);
      }

      return () => cancel();
    };

    fetchData();
  }, []);

  return { users, errors, isLoading, setUsers, setErrors, setLoading };
};

export default useUser;
