import { twMerge } from "tailwind-merge";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    className?: string;
    password?: boolean;
}

// Underlined text input with label of the field right below
export default function TextInput(props: TextInputProps) {
    return (
        <div className={twMerge("flex flex-col grow", props.className)}>
            <input
                className="border-b-2 border-blue text-lg focus:border-purple duration-400 focus:outline-none bg-transparent placeholder:text-purpleLight"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.placeholder}
                type={props.password ? "password" : "text"}
            />
            <label className="text-sm text-blue">{props.label}</label>
        </div>
    );
}
