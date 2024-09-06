import React from "react";

import { CanceledError } from "../services/api-client";
import useUser from "../hooks/useUser";
import userService from "../services/userService";

export const ProductList = () => {
  const { users, errors, isLoading, setUsers, setErrors } = useUser();
  const deleteUser = async (userId: number) => {
    const originalUsers = [...users];
    setUsers(
      users.filter((u) => {
        return u.id !== userId;
      })
    );
    try {
      await userService.delete(userId);
    } catch (error) {
      if (error instanceof CanceledError) return;
      setErrors((error as Error).message);
      setUsers(originalUsers);
    }
  };

  const updateUser = (userId: number) => {
    const user = users.find((user) => user.id == userId);
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, name: user.name + "!" };
        }
        return user;
      })
    );
    userService.update(user!);
  };

  return (
    <>
      <div>
        {errors && <p className="text-danger">{errors}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <ul className="list-group">
          {users.map((user) => {
            return (
              <>
                <li
                  key={user.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  {user.name}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => updateUser(user.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};
