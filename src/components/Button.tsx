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
	size = 'md',
	mode = 'light',
	href,
	navbar = false,
	newTab = false,
	className = '',
	style = {},
	children,
	type = 'button',
	disabled,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'success' | 'danger';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	mode?: 'light' | 'dark';
	href?: string;
	navbar?: boolean;
	newTab?: boolean;
}) {
	const navbarClasses = navbar
		? '!px-4 !py-2 !rounded-xl !text-xs'
		: '';
	const content = (
		<button
			className={`font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer ${
				size === 'xs'
					? 'px-3 py-1.5 text-xs rounded-xl'
					: size === 'sm'
						? 'px-4 py-2.5 text-sm rounded-2xl'
						: size === 'md'
							? 'px-6 py-3 text-sm rounded-2xl'
							: size === 'lg'
								? 'px-8 py-4 text-base rounded-2xl'
								: 'px-10 py-5 text-lg rounded-2xl'
			} ${variantClasses[mode][variant]} ${navbarClasses} ${className}`}
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
				style={{ display: 'contents' }}
			>
				{content}
			</a>
		);
	}

	return content;
}
