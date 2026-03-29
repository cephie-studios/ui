import { createContext, useContext, type ReactNode } from 'react';
import Rail from './Rail';

const inset = 'px-6 md:px-10 lg:px-12';

const modeClasses: Record<
	'light' | 'dark',
	{
		page: string;
		railSurface: string;
		railBorderTop: string;
		heading: string;
		textMuted: string;
		link: string;
		sectionLabel: string;
		gridLine: string;
	}
> = {
	light: {
		page: 'bg-white text-[#0d0d0b]',
		railSurface: 'bg-white',
		railBorderTop: 'border-t border-[#d8d8d6]',
		heading: 'text-[#0d0d0b]',
		textMuted: 'text-[#a8a69f]',
		link: 'text-[#5c5a55] transition-colors hover:text-[#0d0d0b]',
		sectionLabel:
			'mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5c5a55]',
		gridLine: 'border-[#e5e5e5] bg-[#e5e5e5]'
	},
	dark: {
		page: 'bg-[#0d0d0b] text-white',
		railSurface: 'bg-[#0d0d0b]',
		railBorderTop: 'border-t border-[#2a2a28]',
		heading: 'text-white',
		textMuted: 'text-[#a8a69f]',
		link: 'text-[#c8c6c1] transition-colors hover:text-white',
		sectionLabel:
			'mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a8a69f]',
		gridLine: 'border-[#2a2a28] bg-[#2a2a28]'
	}
};

const defaultIcons = {
	light: 'https://cephie.app/assets/icons/cephie-clean.avif',
	dark: 'https://dash.cephie.app/assets/icons/cephie-clean-dark.avif'
};

type FooterContextValue = {
	mode: 'light' | 'dark';
	classes: (typeof modeClasses)['light'];
};

const FooterContext = createContext<FooterContextValue>({
	mode: 'light',
	classes: modeClasses.light
});

type FooterProps = {
	mode?: 'light' | 'dark';
	title?: string;
	subtitle?: string;
	homeHref?: string;
	iconLight?: string;
	iconDark?: string;
	iconAlt?: string;
	iconSize?: number;
	children?: ReactNode;
	bottomRight?: ReactNode;
	copyright?: string;
	className?: string;
};

export default function Footer({
	mode = 'light',
	title = 'Cephie Studios',
	subtitle = 'Building tools that empower aviation communities.',
	homeHref = '/',
	iconLight = defaultIcons.light,
	iconDark = defaultIcons.dark,
	iconAlt = 'Icon',
	iconSize = 32,
	children,
	bottomRight,
	copyright,
	className = ''
}: FooterProps) {
	const classes = modeClasses[mode];
	const iconSrc = mode === 'dark' ? iconDark : iconLight;
	const year = new Date().getFullYear();
	const footerBottomRight =
		bottomRight ?? `Designed and built by Cephie Studios.`;
	const footerCopyright =
		copyright ?? `© ${year} ${title}. All rights reserved.`;

	return (
		<FooterContext.Provider value={{ mode, classes }}>
			<footer className={`${classes.page} ${className}`}>
				<Rail
					variant={mode === 'dark' ? 'dark' : 'light'}
					className={`${classes.railBorderTop} ${classes.railSurface}`}
				>
					<div className={`${inset} py-14 md:py-16`}>
						<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
							<div className="max-w-md shrink-0 lg:max-w-sm">
								<a
									href={homeHref}
									aria-label={`${title} home`}
									className={`group inline-flex items-center gap-3 ${classes.heading}`}
								>
									<img
										src={iconSrc}
										alt={iconAlt}
										width={iconSize}
										height={iconSize}
										className="h-8 w-8 object-contain transition-opacity group-hover:opacity-70"
									/>
									<span className="text-[clamp(1.05rem,2vw,1.2rem)] font-medium tracking-tight">
										{title}
									</span>
								</a>
								<p
									className={`mt-4 text-[14px] leading-relaxed ${classes.textMuted}`}
								>
									{subtitle}
								</p>
							</div>

							<div className="min-w-0 flex-1">{children}</div>
						</div>
					</div>

					<div className={`${classes.railBorderTop} ${classes.railSurface}`}>
						<div
							className={`flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between ${inset}`}
						>
							<p className={`text-[12px] ${classes.link}`}>
								{footerCopyright}
							</p>
							<p className={`text-[12px] ${classes.link}`}>
								{footerBottomRight}
							</p>
						</div>
					</div>
				</Rail>
			</footer>
		</FooterContext.Provider>
	);
}

type FooterColumnsProps = {
	children?: ReactNode;
	className?: string;
};

export function FooterColumns({
	children,
	className = ''
}: FooterColumnsProps) {
	const { classes } = useContext(FooterContext);

	return (
		<div
			className={`grid grid-cols-1 gap-px border-l sm:grid-cols-2 lg:grid-cols-3 ${classes.gridLine} ${className}`}
		>
			{children}
		</div>
	);
}

type FooterColumnProps = {
	children?: ReactNode;
	className?: string;
};

export function FooterColumn({ children, className = '' }: FooterColumnProps) {
	const { classes } = useContext(FooterContext);

	return (
		<div
			className={`${classes.railSurface} px-5 py-6 md:px-6 md:py-7 ${className}`}
		>
			{children}
		</div>
	);
}

type FooterLinkHeaderProps = {
	title: string;
	children?: ReactNode;
	className?: string;
};

export function FooterLinkHeader({
	title,
	children,
	className = ''
}: FooterLinkHeaderProps) {
	const { classes } = useContext(FooterContext);

	return (
		<div className={className}>
			<p className={classes.sectionLabel}>{title}</p>
			<ul className="space-y-3 text-[14px] leading-snug">{children}</ul>
		</div>
	);
}

type FooterLinkProps = {
	href: string;
	children: ReactNode;
	newTab?: boolean;
	className?: string;
};

export function FooterLink({
	href,
	children,
	newTab = false,
	className = ''
}: FooterLinkProps) {
	const { classes } = useContext(FooterContext);

	return (
		<li>
			<a
				href={href}
				target={newTab ? '_blank' : '_self'}
				rel={newTab ? 'noopener noreferrer' : undefined}
				className={`block font-medium ${classes.link} ${className}`}
			>
				{children}
			</a>
		</li>
	);
}
