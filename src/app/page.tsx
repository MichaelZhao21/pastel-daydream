import { Amatic_SC, Jua } from "next/font/google";
import React from "react";

const jua = Jua({
    weight: "400",
    display: "swap",
    subsets: ["latin"],
});

const amaticSC = Amatic_SC({
    weight: ["400", "700"],
    display: "swap",
    subsets: ["latin"],
});

const Title = ({ children }: { children: React.ReactNode }) => {
    return <h1 className={`${amaticSC.className} font-bold text-4xl text-blue`}>{children}</h1>;
};

export default function Home() {
    return (
        <div
            className={
                "bg-[url(/images/clouds.webp)] bg-no-repeat bg-fixed bg-cover bg-center min-h-screen h-full w-full text-purple " +
                jua.className
            }
        >
            <Title>Pastel Daydream Party!</Title>
        </div>
    );
}
