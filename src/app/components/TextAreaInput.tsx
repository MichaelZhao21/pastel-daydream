import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    className?: string;
    password?: boolean;
}

// Underlined text input with label of the field right below
export default function TextAreaInput(props: TextAreaInputProps) {
    return (
        <div className={twMerge("flex flex-col grow", props.className)}>
            <textarea
                className="border-b-2 border-blue text-lg focus:border-purple duration-400 focus:outline-none bg-transparent placeholder:text-purpleLight"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.placeholder}
            />
            <label className="text-sm text-blue">{props.label}</label>
        </div>
    );
}
