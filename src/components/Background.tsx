import React from 'react';

const modeStyles: Record<
	'light' | 'dark',
	{ opacity: number; gradient: string }
> = {
	light: {
		opacity: 0.3,
		gradient: 'linear-gradient(to top right, #38bdf8, #1e40af)'
	},
	dark: {
		opacity: 0.15,
		gradient:
			'linear-gradient(to top right, #2563eb, #1e3a8a)'
	}
};

export default function Background({
	mode = 'light',
	className = '',
	style = {}
}: {
	mode?: 'light' | 'dark';
	className?: string;
	style?: React.CSSProperties;
}) {
	const { opacity, gradient } = modeStyles[mode];

	return (
		<div
			aria-hidden="true"
			className={`absolute inset-0 z-0 pointer-events-none overflow-hidden blur-3xl ${className}`}
		>
			<div
				className="absolute"
				style={{
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%) rotate(20deg)',
					width: '60rem',
					aspectRatio: '1200/700',
					opacity,
					background: gradient,
					clipPath:
						'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					...style
				}}
			/>
		</div>
	);
}
