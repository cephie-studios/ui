import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
	label?: string;
	icon?: React.ReactNode;
	options: { label: string; value: string }[];
	value?: string;
	onChange?: (e: { target: { name: string; value: string } }) => void;
	name?: string;
	id?: string;
	className?: string;
	required?: boolean;
	mode?: 'light' | 'dark';
}

export default function Dropdown({
	label,
	icon,
	options,
	value,
	onChange,
	name = '',
	id = '',
	className = '',
	required = false,
	mode = 'dark'
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find(
		(opt) => String(opt.value).trim() === String(value).trim()
	);
	const displayLabel = selectedOption
		? selectedOption.label
		: value
			? String(value).length > 20
				? `${String(value).substring(0, 8)}...${String(value).substring(String(value).length - 4)}`
				: String(value)
			: 'Select an option...';

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (optionValue: string) => {
		if (onChange) {
			onChange({
				target: {
					name,
					value: optionValue
				}
			});
		}
		setIsOpen(false);
	};

	return (
		<div className={`space-y-1.5 ${className}`} ref={dropdownRef}>
			{label && (
				<label
					htmlFor={id || name}
					className="flex items-center text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1"
				>
					{icon && (
						<span
							className={`mr-2 ${mode === 'light' ? 'text-blue-500' : 'text-zinc-400'}`}
						>
							{icon}
						</span>
					)}
					{label}
				</label>
			)}
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`w-full px-4 py-3 border rounded-xl outline-none transition-colors cursor-pointer flex items-center justify-between text-left text-sm ${
						mode === 'light'
							? 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:bg-white'
							: 'bg-zinc-900 border-zinc-800 text-zinc-50 focus:bg-zinc-900'
					}`}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
				>
					<span className="truncate">{displayLabel}</span>
					<div
						className={`transition-transform duration-200 ${mode === 'light' ? 'text-zinc-400' : 'text-zinc-500'} ${isOpen ? 'rotate-180' : ''}`}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</button>

				{isOpen && (
					<div
						className={`absolute z-50 w-full mt-2 border rounded-2xl overflow-hidden ${
							mode === 'light'
								? 'bg-white border-zinc-200 shadow-xl'
								: 'bg-zinc-900 border-zinc-800 shadow-2xl backdrop-blur-xl'
						}`}
					>
						<div
							role="listbox"
							className="py-1.5 px-1.5 max-h-60 overflow-y-auto"
						>
							{options.map((option) => {
								const isSelected =
									String(option.value) === String(value);
								return (
									<button
										key={option.value}
										type="button"
										onClick={() =>
											handleSelect(option.value)
										}
										className={`w-full px-4 py-2.5 rounded-xl text-left transition-colors flex items-center justify-between text-sm border-0 cursor-pointer ${
											isSelected
												? mode === 'light'
													? 'text-blue-600 bg-blue-50/50'
													: 'text-zinc-50 bg-zinc-800'
												: mode === 'light'
													? 'text-zinc-700 hover:bg-zinc-200'
													: 'text-zinc-400 hover:bg-zinc-800'
										}`}
										role="option"
										aria-selected={isSelected}
									>
										{option.label}
										{isSelected && (
											<svg
												className="w-3.5 h-3.5 shrink-0"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</button>
								);
							})}
						</div>
					</div>
				)}
				<input
					type="hidden"
					name={name}
					value={value}
					required={required}
				/>
			</div>
		</div>
	);
}
