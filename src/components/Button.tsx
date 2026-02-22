import React from 'react';
import { injectStyles } from '../inject';

injectStyles();

const variantClasses: Record<
	'light' | 'dark',
	Record<'primary' | 'secondary' | 'success' | 'danger', string>
> = {
	light: {
		primary:
			'cephie-bg-zinc-950 cephie-text-white hover:cephie-bg-zinc-800 focus-visible:cephie-outline-zinc-900',
		secondary:
			'cephie-bg-zinc-200 cephie-text-zinc-900 hover:cephie-bg-zinc-300 focus-visible:cephie-outline-zinc-400',
		success:
			'cephie-bg-green-600 cephie-text-white hover:cephie-bg-green-700 focus-visible:cephie-outline-green-800',
		danger: 'cephie-bg-red-600 cephie-text-white hover:cephie-bg-red-700 focus-visible:cephie-outline-red-800'
	},
	dark: {
		primary:
			'cephie-bg-zinc-50 cephie-text-zinc-950 hover:cephie-bg-zinc-200 focus-visible:cephie-outline-zinc-50',
		secondary:
			'cephie-bg-zinc-800 cephie-text-zinc-50 hover:cephie-bg-zinc-700 focus-visible:cephie-outline-zinc-700',
		success:
			'cephie-bg-green-600 cephie-text-white hover:cephie-bg-green-700 focus-visible:cephie-outline-green-800',
		danger: 'cephie-bg-red-600 cephie-text-white hover:cephie-bg-red-700 focus-visible:cephie-outline-red-800'
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
			className={`cephie-rounded-2xl cephie-px-6 cephie-py-3 cephie-text-sm cephie-font-semibold cephie-shadow-sm focus-visible:cephie-outline-2 focus-visible:cephie-outline-offset-2 cephie-transition-colors cephie-duration-200 disabled:cephie-opacity-50 disabled:cephie-cursor-not-allowed cephie-border-0 cephie-cursor-pointer ${variantClasses[mode][variant]} ${className}`}
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
