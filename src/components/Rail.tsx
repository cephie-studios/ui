import type { ReactNode } from 'react';

type RailProps = {
	variant?: 'light' | 'dark';
	className?: string;
	children: ReactNode;
};

const railLight = 'mx-auto w-full max-w-7xl border-x border-[#d8d8d6]';

const railDark = 'mx-auto max-w-7xl border-x border-[#2a2a28]';

export default function Rail({
	variant = 'light',
	className = '',
	children
}: RailProps) {
	const base = variant === 'dark' ? railDark : railLight;
	return (
		<div className={className ? `${base} ${className}` : base}>
			{children}
		</div>
	);
}
