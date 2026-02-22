import React from 'react';
import { injectStyles } from '../inject';

injectStyles();

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
	const variantClass = `cephie-btn--${mode}-${variant}`;

	const content = (
		<button
			className={`cephie-btn ${variantClass} ${className}`}
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
