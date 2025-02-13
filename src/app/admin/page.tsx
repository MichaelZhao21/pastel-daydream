"use client";

import { useEffect, useState } from "react";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Cookies from "js-cookie";
import AdminEntry from "../components/AdminEntry";
import { User } from "../components/User";
import { jua } from "../components/fonts";

export default function Admin() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pass, setPass] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [exp, setExp] = useState<boolean[]>([]);
    const [badUsers, setBadUsers] = useState<User[]>([]);

    useEffect(() => {
        // Check if logged in
        async function getData() {
            const res = await fetch("/api/admin/login/check", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                await getUsers();
                setLoggedIn(true);
            }
            setLoading(false);
        }

        getData();
    }, []);

    const login = async () => {
        setLoading(true);

        Cookies.set("adminpass", pass);

        const res = await fetch("/api/admin/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: pass }),
        });

        if (res.ok) {
            await getUsers();
            setLoggedIn(true);
        } else {
            Cookies.remove("adminpass");
        }

        setLoading(false);
    };

    const logout = () => {
        Cookies.remove("adminpass");
        setUsers([]);
        setExp([]);
        setLoggedIn(false);
    };

    const getUsers = async () => {
        const res = await fetch("/api/admin/data", {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            const data = (await res.json()) as User[];
            const bad = data.filter((user) => !user.name || user.name === "");
            const good = data.filter((user) => user.name && user.name !== "");

            setUsers(good);
            setExp(good.map(() => false));
            setBadUsers(bad);
        }
    };

    if (loading) {
        return (
            <div className="my-4 bg-white h-screen">
                <div className="flex justify-center items-center h-32 my-16">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple"></div>
                </div>
            </div>
        );
    }

    if (!loading && !loggedIn) {
        return (
            <div className="my-4 bg-white h-screen text-purple pt-8">
                <div className="flex flex-col justify-center items-center h-32">
                    <Title>Admin Login</Title>
                    <TextInput
                        label="Admin Password"
                        password
                        value={pass}
                        onChange={(value) => setPass(value)}
                        className="md:w-[400px] w-full p-4"
                    />
                    <Button onClick={login} className="mt-4">
                        Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${jua.className} my-4 bg-white h-screen text-purple pt-8 px-4 lg:px-[30%]`}>
            <div className="flex flex-col justify-center items-center h-32">
                <Title>Admin</Title>
                <Button
                    onClick={() => {
                        Cookies.remove("adminpass");
                        setLoggedIn(false);
                    }}
                    className="mt-4"
                >
                    Logout
                </Button>
            </div>

            <div className="flex flex-col items-start">
                <Title>Total People: {users.length}</Title>
                <div className="flex flex-row justify-between items-start text-left text-xl w-full underline">
                    <h2 className="grow pr-2">Name</h2>
                    <p className="mr-4">Paid</p>
                    <p className="">R</p>
                </div>
                {users.map((user, i) => (
                    <AdminEntry
                        key={user.email}
                        user={user}
                        expanded={exp[i]}
                        setExpanded={() => {
                            const newExp = [...exp];
                            newExp[i] = !newExp[i];
                            setExp(newExp);
                        }}
                    />
                ))}
            </div>
            
            <Title className="mt-4">Didn't fill out form</Title>
            <ul className="list-disc ml-4">
                {badUsers.map((user) => (
                    <li>{user.email}</li>
                ))}
            </ul>
        </div>
    );
}
