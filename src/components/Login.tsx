import React, { type ReactNode } from 'react';
import Background from './Background';
import Button from './Button';

const modeClasses: Record<
	'light' | 'dark',
	{
		page: string;
		title: string;
		subtitle: string;
		card: string;
		legalText: string;
		legalLink: string;
	}
> = {
	light: {
		page: 'bg-white',
		title: 'text-zinc-900',
		subtitle: 'text-zinc-600',
		card: 'border-zinc-200 bg-white/80',
		legalText: 'text-zinc-500',
		legalLink: 'text-zinc-600 underline underline-offset-4 hover:text-zinc-900'
	},
	dark: {
		page: 'bg-zinc-950',
		title: 'text-zinc-50',
		subtitle: 'text-zinc-400',
		card: 'border-zinc-800 bg-zinc-900/50',
		legalText: 'text-zinc-400',
		legalLink: 'text-zinc-400 underline underline-offset-4 hover:text-zinc-300'
	}
};

const LEGAL_LINKS = [
	{ href: 'https://cephie.app/legal/terms', label: 'Terms of Use' },
	{ href: 'https://cephie.app/legal/privacy', label: 'Privacy Policy' },
	{ href: 'https://cephie.app/legal/cookies', label: 'Cookies Policy' }
] as const;

export default function Login({
	mode = 'light',
	title,
	subtitle,
	onSignIn,
	icon,
	children,
	className = ''
}: {
	mode?: 'light' | 'dark';
	title: string;
	subtitle: string;
	onSignIn: () => void;
	icon?: ReactNode;
	children?: ReactNode;
	className?: string;
}) {
	const c = modeClasses[mode];

	return (
		<div
			className={`flex min-h-screen flex-col items-center justify-center px-6 ${c.page} ${className}`}
		>
			{children}
			<Background mode={mode} />
			<div className={`relative z-10 mb-10 text-center ${c.title}`}>
				<h1 className="font-montserrat text-4xl">{title}</h1>
				<p className={`font-montserrat mt-2 ${c.subtitle}`}>{subtitle}</p>
			</div>

			<div
				className={`relative z-10 w-full max-w-sm rounded-3xl border p-6 backdrop-blur-sm ${c.card}`}
			>
				<Button
					mode={mode}
					onClick={onSignIn}
					className="flex w-full items-center justify-center gap-3 font-montserrat font-semibold"
				>
					{icon}
					<span>Sign in with Discord</span>
				</Button>

				<div className={`mt-8 text-center font-montserrat text-xs ${c.legalText}`}>
					<p>By signing in, you agree to our</p>
					<div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
						{LEGAL_LINKS.map((link, i) => (
							<React.Fragment key={link.href}>
								{i > 0 && <span>•</span>}
								<a
									href={link.href}
									rel="noopener noreferrer"
									target="_blank"
									className={c.legalLink}
								>
									{link.label}
								</a>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
