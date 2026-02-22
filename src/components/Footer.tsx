import { createContext, useContext, type ReactNode } from 'react';

const modeClasses: Record<
	'light' | 'dark',
	{
		footer: string;
		heading: string;
		text: string;
		link: string;
		divider: string;
	}
> = {
	light: {
		footer: 'bg-white border-t border-zinc-200',
		heading: 'text-zinc-900',
		text: 'text-zinc-600',
		link: 'text-zinc-600 hover:text-zinc-900',
		divider: 'border-zinc-200 text-zinc-500'
	},
	dark: {
		footer: 'bg-zinc-950 border-t border-zinc-800',
		heading: 'text-zinc-50',
		text: 'text-zinc-400',
		link: 'text-zinc-400 hover:text-zinc-50',
		divider: 'border-zinc-800 text-zinc-400'
	}
};

const defaultIcons = {
	light: 'https://cephie.app/assets/icons/cephie-clean.avif',
	dark: 'https://dash.cephie.app/assets/icons/cephie-clean-dark.avif'
};

type FooterContextValue = {
	mode: 'light' | 'dark';
	classes: typeof modeClasses.light;
};

const FooterContext = createContext<FooterContextValue>({
	mode: 'light',
	classes: modeClasses.light
});

type FooterProps = {
	mode?: 'light' | 'dark';
	title?: string;
	subtitle?: string;
	iconLight?: string;
	iconDark?: string;
	iconAlt?: string;
	iconSize?: number;
	children?: ReactNode;
	bottomRight?: ReactNode;
	copyright?: string;
};

export default function Footer({
	mode = 'light',
	title = 'Cephie Studios',
	subtitle = 'Building tools that empower aviation communities.',
	iconLight = defaultIcons.light,
	iconDark = defaultIcons.dark,
	iconAlt = 'Icon',
	iconSize = 40,
	children,
	bottomRight,
	copyright
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
			<footer className={classes.footer}>
				<div className="max-w-7xl mx-auto px-6 py-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
						<div>
							<div className="flex items-center mb-4">
								<img
									src={iconSrc}
									alt={iconAlt}
									width={iconSize}
									height={iconSize}
									className="inline-block mr-1"
								/>
								<h3
									className={`font-semibold font-montserrat ${classes.heading}`}
								>
									{title}
								</h3>
							</div>
							<p
								className={`text-sm font-montserrat ${classes.text}`}
							>
								{subtitle}
							</p>
						</div>

						<div />

						{children}
					</div>

					<div
						className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${classes.divider}`}
					>
						<p className="text-xs font-montserrat">
							{footerCopyright}
						</p>
						<div className="text-xs font-montserrat">
							{footerBottomRight}
						</div>
					</div>
				</div>
			</footer>
		</FooterContext.Provider>
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
			<h4
				className={`text-sm font-semibold font-montserrat mb-3 ${classes.heading}`}
			>
				{title}
			</h4>
			<ul className="space-y-2 text-sm">{children}</ul>
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
				className={`font-montserrat ${classes.link} ${className}`}
			>
				{children}
			</a>
		</li>
	);
}
