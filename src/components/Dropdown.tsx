import React, { useState, useRef, useEffect } from 'react';
import { injectStyles } from '../inject';

injectStyles();

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
		<div className={`cephie-dd-wrapper ${className}`} ref={dropdownRef}>
			{label && (
				<label htmlFor={id || name} className="cephie-dd-label">
					{icon && (
						<span
							className={`cephie-dd-label-icon cephie-dd-label-icon--${mode}`}
						>
							{icon}
						</span>
					)}
					{label}
				</label>
			)}
			<div className="cephie-dd-relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`cephie-dd-trigger cephie-dd-trigger--${mode}`}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
				>
					<span className="cephie-dd-trigger-text">
						{displayLabel}
					</span>
					<div
						className={`cephie-dd-chevron cephie-dd-chevron--${mode}${isOpen ? ' cephie-dd-chevron--open' : ''}`}
					>
						<svg
							style={{ width: '1rem', height: '1rem' }}
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
					<div className={`cephie-dd-list cephie-dd-list--${mode}`}>
						<div role="listbox" className="cephie-dd-options">
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
										className={`cephie-dd-option cephie-dd-option--${mode}${isSelected ? ` cephie-dd-option--${mode}-selected` : ''}`}
										role="option"
										aria-selected={isSelected}
									>
										{option.label}
										{isSelected && (
											<svg
												className="cephie-dd-check"
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
