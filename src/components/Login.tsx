'use client';

import React, { useState, type ReactNode } from 'react';
import Background from './Background';
import Button from './Button';
import Rail from './Rail';

const inset = 'px-6 md:px-10 lg:px-12';

const modeClasses: Record<
	'light' | 'dark',
	{
		page: string;
		title: string;
		subtitle: string;
		card: string;
		legal: string;
		legalLink: string;
		checkbox: string;
	}
> = {
	light: {
		page: 'bg-white',
		title: 'text-[#0d0d0b]',
		subtitle: 'text-[#5c5a55]',
		card: 'border border-[#e5e5e5] bg-white',
		legal: 'text-[#5c5a55]',
		legalLink:
			'text-[#0d0d0b] underline underline-offset-4 decoration-[#c8c6c1] hover:decoration-[#0d0d0b]',
		checkbox: 'mt-1 size-4 shrink-0 rounded border-[#c8c6c1] accent-[#0d0d0b] focus:outline-none focus:ring-2 focus:ring-[#0d0d0b]/25'
	},
	dark: {
		page: 'bg-[#0d0d0b]',
		title: 'text-white',
		subtitle: 'text-[#c8c6c1]',
		card: 'border border-[#2a2a28] bg-[#141412]',
		legal: 'text-[#a8a69f]',
		legalLink:
			'text-white underline underline-offset-4 decoration-[#5c5a55] hover:decoration-white',
		checkbox:
			'mt-1 size-4 shrink-0 rounded border-[#5c5a55] accent-white focus:outline-none focus:ring-2 focus:ring-white/30'
	}
};

export type LoginLegalLinks = {
	termsHref: string;
	termsLabel?: string;
	privacyHref: string;
	privacyLabel?: string;
	cookiesHref: string;
	cookiesLabel?: string;
};

const DEFAULT_LEGAL: LoginLegalLinks = {
	termsHref: 'https://cephie.app/legal/terms',
	termsLabel: 'Terms of Service',
	privacyHref: 'https://cephie.app/legal/privacy',
	privacyLabel: 'Privacy Policy',
	cookiesHref: 'https://cephie.app/legal/cookies',
	cookiesLabel: 'Cookie Policy'
};

export type LoginProps = {
	mode?: 'light' | 'dark';
	title: string;
	subtitle: string;
	onSignIn: () => void;
	icon?: ReactNode;
	children?: ReactNode;
	className?: string;
	legal?: Partial<LoginLegalLinks>;
	backgroundImageSrc?: string;
	backgroundImageAlt?: string;
	backgroundImageClassName?: string;
	backgroundBlurClassName?: string;
	backgroundOverlayClassName?: string | null;
};

export default function Login({
	mode = 'light',
	title,
	subtitle,
	onSignIn,
	icon,
	children,
	className = '',
	legal: legalProp,
	backgroundImageSrc,
	backgroundImageAlt = '',
	backgroundImageClassName,
	backgroundBlurClassName = '',
	backgroundOverlayClassName
}: LoginProps) {
	const [accepted, setAccepted] = useState(false);
	const c = modeClasses[mode];
	const legal = { ...DEFAULT_LEGAL, ...legalProp };

	const resolvedOverlay =
		backgroundOverlayClassName !== undefined && backgroundOverlayClassName !== null
			? backgroundOverlayClassName || undefined
			: backgroundImageSrc
				? 'bg-white/60'
				: undefined;

	return (
		<section
			className={`relative isolate min-h-screen overflow-hidden ${c.page} ${className}`.trim()}
		>
			<Background
				mode={mode}
				imageSrc={backgroundImageSrc}
				imageAlt={backgroundImageAlt}
				imageClassName={backgroundImageClassName}
				blurClassName={backgroundBlurClassName}
				overlayClassName={resolvedOverlay}
			/>

			{children}

			<div className="relative z-10 flex min-h-screen flex-col">
				<Rail
					variant={mode === 'dark' ? 'dark' : 'light'}
					className={`flex flex-1 items-center justify-center !border-t-0 sm:!border-t-0 ${inset} py-24 md:py-32`}
				>
					<div
						className={`w-full max-w-xl p-8 text-center md:p-10 ${c.card}`}
					>
						<h1
							className={`text-3xl font-medium tracking-tight md:text-[1.75rem] ${c.title}`}
						>
							{title}
						</h1>
						<p className={`mt-4 text-[15px] leading-relaxed ${c.subtitle}`}>
							{subtitle}
						</p>

						<label
							className={`mt-8 flex cursor-pointer items-start gap-3 text-left font-medium ${c.legal}`}
						>
							<input
								type="checkbox"
								checked={accepted}
								onChange={(e) => setAccepted(e.target.checked)}
								className={c.checkbox}
							/>
							<span className="text-[13px] leading-snug">
								I have read and agree to the{' '}
								<a
									href={legal.termsHref}
									target="_blank"
									rel="noopener noreferrer"
									className={c.legalLink}
								>
									{legal.termsLabel}
								</a>
								, the{' '}
								<a
									href={legal.privacyHref}
									target="_blank"
									rel="noopener noreferrer"
									className={c.legalLink}
								>
									{legal.privacyLabel}
								</a>
								, and the{' '}
								<a
									href={legal.cookiesHref}
									target="_blank"
									rel="noopener noreferrer"
									className={c.legalLink}
								>
									{legal.cookiesLabel}
								</a>
								.
							</span>
						</label>

						<div className="mt-8 flex justify-center">
							<Button
								type="button"
								variant="dark"
								disabled={!accepted}
								onClick={onSignIn}
								className="min-w-56 justify-center disabled:cursor-not-allowed disabled:opacity-45"
							>
								{icon}
								<span>Continue with Discord</span>
							</Button>
						</div>
					</div>
				</Rail>
			</div>
		</section>
	);
}
