import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser, IUserContextProps } from "@/interfaces";
import { useRouter } from "next/router";

const UserContext = createContext<IUserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    const { user_id, user_name, user_email } = router.query;

    if (!user_id || !user_email || !user_name) return;

    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uchatId: user_id,
          name: user_name,
          email: user_email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [router.query]);

  return (
    <UserContext.Provider
      value={{ user, setUser, refetch: fetchUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
