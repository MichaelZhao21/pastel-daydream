interface RadioProps {
    label: string;
    value: string;
    options: string[];
    optionLabels: string[];
    onChange: (value: string) => void;
    className?: string;
}

// Horizontal radio buttons with labels
export default function Radio(props: RadioProps) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <span className="text-blue">{props.label}</span>
            <div className="flex lg:flex-row flex-col gap-x-4">
                {props.options.map((option, i) => (
                    <div key={option} className="flex items-center mr-2">
                        <input
                            type="radio"
                            id={option + props.label}
                            name={props.label}
                            value={option}
                            checked={props.value === option}
                            onChange={() => props.onChange(option)}
                            className="appearance-none border-2 border-blueLight rounded-full w-4 h-4 checked:bg-blueLight/75 cursor-pointer"
                        />
                        <label htmlFor={option + props.label} className="ml-1 cursor-pointer text-blueLight">
                            {props.optionLabels[i]}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
