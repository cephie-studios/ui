import type { ReactNode } from 'react';

export type FooterLink = {
	href: string;
	label: string;
	newTab?: boolean;
	className?: string;
};

export type FooterSection = {
	title: string;
	links: FooterLink[];
};

export type FooterBrand = {
	name: string;
	href?: string;
	logoSrc: string;
	logoAlt?: string;
	logoWidth?: number;
	logoHeight?: number;
};

export type FooterProps = {
	brand: FooterBrand;
	description?: string;
	sections?: FooterSection[];
	variant?: 'light' | 'dark';
	includeSpacerColumn?: boolean;
	bottomLeft?: ReactNode;
	bottomRight?: ReactNode;
	className?: string;
	containerClassName?: string;
};

const defaultLogoSize = {
	width: 40,
	height: 40
};

export default function Footer({
	brand,
	description,
	sections = [],
	variant = 'light',
	includeSpacerColumn = false,
	bottomLeft,
	bottomRight,
	className = '',
	containerClassName = ''
}: FooterProps) {
	const isDark = variant === 'dark';
	const textPrimary = isDark ? 'text-zinc-50' : 'text-zinc-900';
	const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-600';
	const borderColor = isDark ? 'border-zinc-800' : 'border-zinc-200';
	const bgColor = isDark ? 'bg-zinc-950' : 'bg-white';

	const columnCount = 1 + (includeSpacerColumn ? 1 : 0) + sections.length;
	const gridCols =
		columnCount >= 5
			? 'lg:grid-cols-5'
			: columnCount === 4
				? 'lg:grid-cols-4'
				: columnCount === 3
					? 'lg:grid-cols-3'
					: 'lg:grid-cols-2';

	const logoWidth = brand.logoWidth ?? defaultLogoSize.width;
	const logoHeight = brand.logoHeight ?? defaultLogoSize.height;
	const year = new Date().getFullYear();

	return (
		<footer className={`${bgColor} border-t ${borderColor} ${className}`}>
			<div
				className={`max-w-7xl mx-auto px-6 py-12 ${containerClassName}`}
			>
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8`}
				>
					<div>
						<div className="flex items-center mb-4">
							<img
								src={brand.logoSrc}
								alt={brand.logoAlt ?? 'Icon'}
								width={logoWidth}
								height={logoHeight}
								className="inline-block mr-1"
							/>
							{brand.href ? (
								<a
									href={brand.href}
									className={`font-semibold font-montserrat ${textPrimary}`}
								>
									{brand.name}
								</a>
							) : (
								<h3
									className={`font-semibold font-montserrat ${textPrimary}`}
								>
									{brand.name}
								</h3>
							)}
						</div>
						{description && (
							<p
								className={`text-sm font-montserrat ${textSecondary}`}
							>
								{description}
							</p>
						)}
					</div>

					{includeSpacerColumn && <div />}

					{sections.map((section) => (
						<div key={section.title}>
							<h4
								className={`text-sm font-semibold font-montserrat mb-3 ${textPrimary}`}
							>
								{section.title}
							</h4>
							<ul className="space-y-2 text-sm">
								{section.links.map((link) => {
									const isExternal =
										link.newTab ||
										/^https?:\/\//.test(link.href);

									return (
										<li key={link.href}>
											<a
												href={link.href}
												className={`font-montserrat ${textSecondary} ${link.className ?? ''}`}
												target={
													isExternal
														? '_blank'
														: undefined
												}
												rel={
													isExternal
														? 'noopener noreferrer'
														: undefined
												}
											>
												{link.label}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>

				<div
					className={`mt-10 pt-6 border-t ${borderColor} flex flex-col sm:flex-row items-center justify-between gap-4`}
				>
					<div className={`text-xs font-montserrat ${textSecondary}`}>
						{bottomLeft ??
							`© ${year} ${brand.name}. All rights reserved.`}
					</div>
					<div className={`text-xs font-montserrat ${textSecondary}`}>
						{bottomRight ?? 'Designed and built by Cephie Studios.'}
					</div>
				</div>
			</div>
		</footer>
	);
}
