import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { userService } from "@/services";

const Users: NextPage = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    userService
      .getAll()
      .then((data: any) => setUsers(data))
      .catch((e) => setUsers([]));
  }, []);

  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Users List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /users</p>
      <ul>
        {users.map((user: any, index: any) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </Layout>
  );
};

export default Users;
