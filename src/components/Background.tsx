import React from 'react';

export default function Background({
	className = '',
	style = {}
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<div
			aria-hidden="true"
			className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center blur-3xl ${className}`}
		>
			<div
				className="absolute left-1/2 top-0 -translate-x-1/2 rotate-20 opacity-30"
				style={{
					width: '60rem',
					aspectRatio: '1200/700',
					background:
						'linear-gradient(to top right, #38bdf8, #1e40af)',
					clipPath:
						'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					...style
				}}
			/>
		</div>
	);
}
