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
		<div className={`cephie-space-y-1.5 ${className}`} ref={dropdownRef}>
			{label && (
				<label
					htmlFor={id || name}
					className="cephie-flex cephie-items-center cephie-text-xs cephie-font-bold cephie-uppercase cephie-tracking-wider cephie-text-zinc-500 cephie-ml-1"
				>
					{icon && (
						<span
							className={`cephie-mr-2 ${mode === 'light' ? 'cephie-text-blue-500' : 'cephie-text-zinc-400'}`}
						>
							{icon}
						</span>
					)}
					{label}
				</label>
			)}
			<div className="cephie-relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`cephie-w-full cephie-px-4 cephie-py-3 cephie-border cephie-rounded-xl focus:cephie-ring-2 cephie-outline-none cephie-transition-colors cephie-cursor-pointer cephie-flex cephie-items-center cephie-justify-between cephie-text-left cephie-text-sm ${
						mode === 'light'
							? 'cephie-bg-zinc-50 cephie-border-zinc-200 cephie-text-zinc-900 focus:cephie-ring-blue-500/20 focus:cephie-border-blue-500 focus:cephie-bg-white'
							: 'cephie-bg-zinc-900/50 cephie-border-zinc-800 cephie-text-zinc-50 focus:cephie-ring-zinc-700 focus:cephie-border-zinc-600 focus:cephie-bg-zinc-900'
					}`}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
				>
					<span className="cephie-truncate">{displayLabel}</span>
					<div
						className={`cephie-transition-transform cephie-duration-200 ${mode === 'light' ? 'cephie-text-zinc-400' : 'cephie-text-zinc-500'} ${isOpen ? 'cephie-rotate-180' : ''}`}
					>
						<svg
							className="cephie-w-4 cephie-h-4"
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
						className={`cephie-absolute cephie-z-50 cephie-w-full cephie-mt-2 cephie-border cephie-rounded-2xl cephie-overflow-hidden ${
							mode === 'light'
								? 'cephie-bg-white cephie-border-zinc-200 cephie-shadow-xl'
								: 'cephie-bg-zinc-900 cephie-border-zinc-800 cephie-shadow-2xl cephie-backdrop-blur-xl'
						}`}
					>
						<div
							role="listbox"
							className="cephie-py-1.5 cephie-px-1.5 cephie-max-h-60 cephie-overflow-y-auto"
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
										className={`cephie-w-full cephie-px-4 cephie-py-2.5 cephie-rounded-xl cephie-text-left cephie-transition-colors cephie-flex cephie-items-center cephie-justify-between cephie-text-sm cephie-border-0 cephie-cursor-pointer ${
											isSelected
												? mode === 'light'
													? 'cephie-text-blue-600 cephie-bg-blue-50/50'
													: 'cephie-text-zinc-50 cephie-bg-zinc-800'
												: mode === 'light'
													? 'cephie-text-zinc-700 hover:cephie-bg-zinc-50'
													: 'cephie-text-zinc-400 hover:cephie-bg-zinc-800'
										}`}
										role="option"
										aria-selected={isSelected}
									>
										{option.label}
										{isSelected && (
											<svg
												className="cephie-w-3.5 cephie-h-3.5 cephie-shrink-0"
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
