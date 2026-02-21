import React from 'react';

const variantClasses: Record<
	'light' | 'dark',
	Record<'primary' | 'secondary' | 'success' | 'danger', string>
> = {
	light: {
		primary:
			'bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-900',
		secondary:
			'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus-visible:outline-zinc-400',
		success:
			'bg-green-600 text-white hover:bg-green-700 focus-visible:outline-green-800',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-800'
	},
	dark: {
		primary:
			'bg-zinc-50 text-zinc-950 hover:bg-zinc-200 focus-visible:outline-zinc-50',
		secondary:
			'bg-zinc-800 text-zinc-50 hover:bg-zinc-700 focus-visible:outline-zinc-700',
		success:
			'bg-green-600 text-white hover:bg-green-700 focus-visible:outline-green-800',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-800'
	}
};

export default function Button({
	variant = 'primary',
	mode = 'dark',
	href,
	newTab = false,
	className = '',
	style = {},
	children,
	type = 'button',
	disabled,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'success' | 'danger';
	mode?: 'light' | 'dark';
	href?: string;
	newTab?: boolean;
}) {
	const content = (
		<button
			className={`rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[mode][variant]} ${className}`}
			style={style}
			type={type}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);

	if (href) {
		return (
			<a
				href={href}
				target={newTab ? '_blank' : '_self'}
				rel="noopener noreferrer"
				className="contents"
			>
				{content}
			</a>
		);
	}

	return content;
}
