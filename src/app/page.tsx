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

const Pink = (props: React.PropsWithChildren) => {
    return <span className="text-pink">{props.children}</span>;
};

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        async function loadData() {
            setLoading(false);
        }

        loadData();
    });

    const logIn = async () => {
        // Log in
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            setLoggedIn(true);
        } else {
            alert("Invalid email or password");
        }
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
            </div>
        </div>
    );
}
