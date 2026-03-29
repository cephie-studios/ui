type SectionDividerProps = {
	className?: string;
	variant?: 'light' | 'dark';
};

export default function SectionDivider({
	className = '',
	variant = 'light'
}: SectionDividerProps) {
	return (
		<div className={className.trim()} aria-hidden>
			<div
				className={`relative left-1/2 h-px w-screen max-w-none -translate-x-1/2 ${
					variant === 'dark' ? 'bg-[#2a2a28]' : 'bg-[#d8d8d6]'
				}`}
			/>
		</div>
	);
}
