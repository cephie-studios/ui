import type { ReactNode } from 'react';

const ghostBase =
	'inline-flex items-center justify-center gap-2 border px-4 py-2 text-[13px] font-medium';

const ghostDefault = `${ghostBase} border-[#e5e5e5] bg-white text-[#0d0d0b] hover:border-[#0d0d0b]`;
const ghostStrong = `${ghostBase} border-[#0d0d0b] bg-white text-[#0d0d0b] hover:border-[#0d0d0b]`;

const darkBase =
	'inline-flex items-center justify-center gap-2 border border-[#0d0d0b] bg-[#0d0d0b] px-4 py-2 text-[13px] font-medium text-white hover:border-[#2a2a27] hover:bg-[#2a2a27]';

const lightOnDark = `${ghostBase} border-white bg-white text-[#0d0d0b] hover:border-[#e8e8e8] hover:bg-[#f5f5f5]`;

const ghostOnDark = `${ghostBase} border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10`;

export type ButtonProps = {
	children: ReactNode;
	className?: string;
	primary?: boolean;
	variant?: 'ghost' | 'dark' | 'light' | 'ghostOnDark';
	navbar?: boolean;
} & (
	| { href: string; newTab?: boolean; type?: never; onClick?: never; disabled?: never }
	| { href?: never; newTab?: never; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean }
);

const navbarSlot =
	'!flex h-full min-h-0 items-center justify-center rounded-none !border-0 px-2 text-[11px] font-medium uppercase tracking-[0.06em] sm:px-5 sm:text-[13px] md:px-6';

function buildClass(
	variant: ButtonProps['variant'],
	primary: boolean,
	className: string,
	navbar?: boolean
) {
	const nav = navbar ? `${navbarSlot} ` : '';
	const body = (() => {
		if (variant === 'dark') return darkBase;
		if (variant === 'light') return lightOnDark;
		if (variant === 'ghostOnDark') return ghostOnDark;
		return primary ? ghostStrong : ghostDefault;
	})();
	return `${nav}${body} ${className}`.trim();
}

export default function Button({
	children,
	className = '',
	primary = false,
	variant = 'ghost',
	navbar = false,
	...rest
}: ButtonProps) {
	const cls = buildClass(variant, primary, className, navbar);

	if ('href' in rest && rest.href) {
		const { href, newTab } = rest;
		const external = href.startsWith('http');
		if (external) {
			return (
				<a
					href={href}
					className={cls}
					target={newTab ? '_blank' : undefined}
					rel={newTab ? 'noopener noreferrer' : undefined}
				>
					{children}
				</a>
			);
		}
		return (
			<a href={href} className={cls}>
				{children}
			</a>
		);
	}

	const { type = 'button', onClick, disabled } = rest as {
		type?: 'button' | 'submit';
		onClick?: () => void;
		disabled?: boolean;
	};

	return (
		<button
			type={type}
			className={cls}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
