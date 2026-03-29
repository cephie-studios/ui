'use client';

import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export type DropdownOption = {
	value: string;
	label: string;
};

export type DropdownProps = {
	id: string;
	options: readonly DropdownOption[];
	value: string;
	onChange: (value: string) => void;
	triggerClassName: string;
	listClassName?: string;
};

export default function Dropdown({
	id,
	options,
	value,
	onChange,
	triggerClassName,
	listClassName = ''
}: DropdownProps) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const displayLabel =
		options.find((o) => o.value === value)?.label ?? value;

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (e: MouseEvent | TouchEvent) => {
			const el = rootRef.current;
			const target = e.target as Node | null;
			if (!el || !target) return;
			if (!el.contains(target)) setOpen(false);
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};

		document.addEventListener('mousedown', onPointerDown);
		document.addEventListener('touchstart', onPointerDown);
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('mousedown', onPointerDown);
			document.removeEventListener('touchstart', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				id={id}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className={triggerClassName}
			>
				<span className="truncate">{displayLabel}</span>
				<MdKeyboardArrowDown
					className={`h-4 w-4 shrink-0 text-[#5c5a55] transition-transform duration-200 ${
						open ? 'rotate-180' : 'rotate-0'
					}`}
					aria-hidden
				/>
			</button>

			{open && (
				<div
					role="listbox"
					aria-labelledby={id}
					className={`absolute left-0 right-0 z-10 mt-2 max-h-60 overflow-auto rounded border border-[#e5e5e5] bg-white shadow ${listClassName}`.trim()}
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							role="option"
							aria-selected={value === option.value}
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
							className={`w-full px-4 py-2 text-left text-[13px] text-[#0d0d0b] transition-colors hover:bg-[#f4f4f4] ${
								value === option.value
									? 'bg-[#f4f4f4]'
									: 'bg-white'
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
