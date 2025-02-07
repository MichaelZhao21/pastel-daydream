"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { jua } from "./components/fonts";
import Title from "./components/Title";
import Text from "./components/Text";
import { twMerge } from "tailwind-merge";
import Head from "next/head";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Cookies from "js-cookie";
import Radio from "./components/Radio";
import TextAreaInput from "./components/TextAreaInput";

const Pink = (props: React.PropsWithChildren) => {
    return <span className="text-pink">{props.children}</span>;
};

interface Attendee {
    name: string;
    rsvp: "yes" | "no" | "maybe";
}

interface FormFields {
    email: string;
    password: string;
    name: string;
    phone: string;
    rsvp: string;
    paid: string;
    relation: string;
    bringing: string;
    music: string;
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [form, setForm] = useState<FormFields>({
        email: "",
        password: "",
        name: "",
        phone: "",
        rsvp: "",
        paid: "",
        relation: "",
        bringing: "",
        music: "",
    });
    const [attendees, setAttendees] = useState<Attendee[]>([]);

    useEffect(() => {
        async function loadData() {
            // Check if logged in
            const response = await fetch("/api/login/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
            });

            if (response.ok) {
                // Parse and save data
                const data = await response.json();
                setForm({
                    email: data.email,
                    password: "",
                    name: data.name,
                    phone: data.phone,
                    rsvp: data.rsvp,
                    paid: data.paid,
                    relation: data.relation,
                    bringing: data.bringing,
                    music: data.music,
                });

                await getAttendees();

                setLoggedIn(true);
            }

            setLoading(false);
        }

        loadData();
    }, []);

    const getAttendees = async () => {
        // Get the attendees
        const attendeesResponse = await fetch("/api/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
        });
        if (!attendeesResponse.ok) {
            alert(
                "Error loading attendees, please ask michael why his site is FUCKED"
            );
            return;
        }
        const na = await attendeesResponse.json();
        const fna = na.filter((a: { rsvp: string }) => a.rsvp && a.rsvp !== "");
        setAttendees(fna);
    };

    const logIn = async () => {
        // Log in
        setLoading(true);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            // Get token
            const data = await response.json();

            // Set cookie
            Cookies.set("token", data.token);

            delete data._id;
            const fd = data as FormFields;

            if (data.email) {
                setForm({ ...fd, password: "" });
            } else {
                setForm({ ...form, password: "" });
            }

            await getAttendees();

            setLoggedIn(true);
        } else {
            alert("Invalid email or password");
        }

        setLoading(false);
    };

    const save = async () => {
        // Save data
        const response = await fetch("/api/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            alert("Saved!");
        } else {
            alert("Error saving data");
        }
    };

    const logOut = async () => {
        Cookies.remove("token");
        setLoggedIn(false);
    };

    return (
        <div
            className={twMerge(
                "bg-[url(/images/clouds.webp)] bg-no-repeat bg-fixed bg-cover bg-center min-h-screen h-max w-full text-purple p-6 lg:p-12 ",
                jua.className
            )}
        >
            <Head>
                <title>Pastel Daydream Party!</title>
                <meta
                    name="description"
                    content="I'm throwing a pastel daydream-themed party! Please RSVP here and read through the details :D"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Card */}
            <div className="flex flex-col justify-center h-full w-full bg-white/25 rounded-lg backdrop-blur-md drop-shadow-md">
                {/* Header section (descr + image) */}
                <div className="flex lg:flex-row flex-col-reverse w-full">
                    <div className="flex flex-col basis-1/2 grow lg:pl-6 px-4">
                        <Title className="text-6xl mt-6 text-center hidden lg:block">
                            Pastel Daydream Party!
                        </Title>
                        <Text>
                            Hi guys :D I’m throwing a back-to-school party! Want
                            to try out a different format, so I’m using this
                            website to track RSVPs. Hopefully will make planning
                            a lil easier :3
                        </Text>
                        <Text>
                            Party will be happening on&nbsp;
                            <Pink>2/22 (Saturday)</Pink>, starting at&nbsp;
                            <Pink>9pm</Pink>! The theme is&nbsp;
                            <Pink>“pastel daydream”</Pink>. Feel free to
                            interpret that however you like, but the poster has
                            a couple of concepts you can use.
                        </Text>
                        <Text>
                            I’m asking everyone to pay me <Pink>$5</Pink> for
                            the drinks unless you’re bringing your own. Feel
                            free to bring whatever drinks or snacks you want!
                        </Text>
                        <Text>
                            We ask you to follow these <Pink>house rules</Pink>:
                            <ul className="list-disc ml-6">
                                <li>No smoking of any kinda indoors</li>
                                <li>Please take off your shoes at the front</li>
                                <li>Don’t go through cabinets/drawers</li>
                            </ul>
                        </Text>
                        <Text>
                            Please fill in your info below to RSVP -- this is
                            helpful for me to know how many people to prepare
                            for. <Pink>+1s are okay</Pink>, but please have them
                            fill out this form.
                        </Text>
                        <Text>
                            For any questions, feel free to text me at&nbsp;
                            <Pink>(469) 569 - 174</Pink>!
                        </Text>
                    </div>
                    <div className="flex flex-col items-center lg:basis-1/2 grow lg:p-6 lg:pt-6 p-4 pt-0">
                        <Image
                            alt="party graphic"
                            src="/images/graphic.webp"
                            width={800}
                            height={800}
                            className="drop-shadow-md md:w-1/2 lg:w-full"
                        />
                    </div>
                    <Title className="text-4xl mt-4 text-center block lg:hidden px-2">
                        Pastel Daydream Party!
                    </Title>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="my-4">
                        <div className="flex justify-center items-center h-32 my-16">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple"></div>
                        </div>
                    </div>
                )}

                {/* Log In */}
                {!loading && !loggedIn && (
                    <div className="mx-6 lg:mb-8 mb-6">
                        <Title>Sign Up/Log In</Title>
                        <div className="flex lg:flex-row flex-col w-full mb-4">
                            <TextInput
                                label="Email"
                                value={form.email}
                                placeholder="Full email"
                                onChange={(value) =>
                                    setForm({ ...form, email: value })
                                }
                                className="lg:mr-8"
                            />
                            <TextInput
                                label="Password"
                                value={form.password}
                                placeholder="Password"
                                onChange={(value) =>
                                    setForm({ ...form, password: value })
                                }
                                password
                                className="lg:ml-8"
                            />
                        </div>
                        <Button onClick={logIn}>Submit</Button>
                    </div>
                )}

                {/* Info */}
                {!loading && loggedIn && (
                    <div className="mx-6 lg:mb-8 mb-6">
                        <Title>Your Info</Title>
                        <Text>
                            Fill out your info pls! Feel free to save at any
                            time and come back to edit :3
                        </Text>
                        <div className="flex lg:flex-row flex-col w-full">
                            <TextInput
                                label="Email"
                                value={form.email}
                                placeholder="Full email"
                                onChange={(value) =>
                                    setForm({ ...form, email: value })
                                }
                                className="lg:mr-8 mb-4"
                            />
                            <TextInput
                                label="Password"
                                value={form.password}
                                placeholder="(unchanged)"
                                onChange={(value) =>
                                    setForm({ ...form, password: value })
                                }
                                password
                                className="lg:ml-8 mb-4"
                            />
                        </div>
                        <Radio
                            label="RSVP Status"
                            value={form.rsvp}
                            options={["yes", "no", "maybe"]}
                            optionLabels={[
                                "Yes!",
                                "No :(",
                                "Maybe (change as soon as you know!)",
                            ]}
                            onChange={(value) =>
                                setForm({ ...form, rsvp: value })
                            }
                            className="mb-4"
                        />
                        <div className="flex lg:flex-row flex-col w-full">
                            <TextInput
                                label="Full Name"
                                value={form.name}
                                placeholder="Full name"
                                onChange={(value) =>
                                    setForm({ ...form, name: value })
                                }
                                className="lg:mr-8 mb-4"
                            />
                            <TextInput
                                label="Phone Number"
                                value={form.phone}
                                placeholder="Phone number"
                                onChange={(value) =>
                                    setForm({ ...form, phone: value })
                                }
                                className="lg:ml-8 mb-4"
                            />
                        </div>
                        <div className="flex lg:flex-row flex-col w-full lg:mb-4">
                            <Radio
                                label="Paid $5? (Zelle 4695690174, Venmo @mikeyz314)"
                                value={form.paid}
                                options={["yes", "no", "bringing"]}
                                optionLabels={[
                                    "Yes!",
                                    "Not Yet",
                                    "Bringing Drinks (notate below)",
                                ]}
                                onChange={(value) =>
                                    setForm({ ...form, paid: value })
                                }
                                className="mb-4 lg:mb-0 lg:basis-1/2"
                            />
                            <TextInput
                                label="Relationship to Michael/roommates"
                                value={form.relation}
                                placeholder="Friend, friend of friend, etc."
                                onChange={(value) =>
                                    setForm({ ...form, relation: value })
                                }
                                className="grow lg:ml-8 mb-4"
                            />
                        </div>
                        <div className="flex lg:flex-row flex-col w-full">
                            <TextAreaInput
                                label="Whatcha bringing? (if you don’t know that’s fine)"
                                value={form.bringing}
                                placeholder="Leave blank if paying"
                                onChange={(value) =>
                                    setForm({ ...form, bringing: value })
                                }
                                className="lg:mr-8 mb-4"
                            />
                            <TextAreaInput
                                label="Music recs (spotify links if possible)"
                                value={form.music}
                                placeholder="Optional but appreciated :D"
                                onChange={(value) =>
                                    setForm({ ...form, music: value })
                                }
                                className="lg:ml-8 mb-4"
                            />
                        </div>
                        <div className="flex lg:flex-row flex-col w-full justify-between">
                            <Button onClick={save}>Save</Button>
                            <Button
                                onClick={logOut}
                                className="mt-4 lg:mt-0 text-red-800 border-red-800 bg-red-400/50"
                            >
                                Log Out
                            </Button>
                        </div>
                    </div>
                )}

                {/* Attendees */}
                {!loading && loggedIn && (
                    <div className="mx-6 lg:mb-8 mb-6">
                        <div className="hidden text-yes text-maybe text-no">
                            DUMMY TO LOAD COLORS
                        </div>
                        <Title>Attendees</Title>
                        <Text>
                            Here is a list of people that are coming with their
                            RSVP status :)
                        </Text>
                        <div className="flex flex-row flex-wrap w-full gap-x-16">
                            {attendees.map((attendee, index) => (
                                <Text key={index} className="flex flex-col">
                                    <span className="text-xl lg:text-3xl">
                                        {attendee.name}
                                    </span>
                                    <span
                                        className={`text-${attendee.rsvp} lg:mt-0 mt-[-0.5rem]`}
                                    >
                                        {attendee.rsvp}
                                    </span>
                                </Text>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
