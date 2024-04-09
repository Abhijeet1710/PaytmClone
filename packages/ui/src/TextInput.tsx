"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label,
    inputType
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    inputType: string;
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} type={inputType} id="first_name" className="border bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-inset focus:ring-blue-600 block w-full p-2.5" placeholder={placeholder} />
    </div>
}