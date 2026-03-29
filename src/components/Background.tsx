import React, { type CSSProperties, type ReactNode } from 'react';

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
		gradient: 'linear-gradient(to top right, #2563eb, #1e3a8a)'
	}
};

export type BackgroundProps = {
	mode?: 'light' | 'dark';
	imageSrc?: string;
	imageAlt?: string;
	imageClassName?: string;
	blurClassName?: string;
	overlayClassName?: string;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
};

export default function Background({
	mode = 'light',
	imageSrc,
	imageAlt = '',
	imageClassName = 'object-cover object-center',
	blurClassName = '',
	overlayClassName,
	className = '',
	style = {},
	children
}: BackgroundProps) {
	const { opacity, gradient } = modeStyles[mode];

	return (
		<div
			aria-hidden="true"
			className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
			style={style}
		>
			{imageSrc ? (
				<>
					<div className="absolute inset-0">
						<img
							src={imageSrc}
							alt={imageAlt}
							className={`absolute inset-0 h-full w-full ${imageClassName} ${blurClassName}`.trim()}
						/>
					</div>
					{overlayClassName ? (
						<div
							className={`absolute inset-0 ${overlayClassName}`.trim()}
						/>
					) : null}
				</>
			) : (
				<div
					className={`absolute inset-0 z-0 overflow-hidden blur-3xl ${blurClassName}`.trim()}
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
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
						}}
					/>
				</div>
			)}
			{children}
		</div>
	);
}
