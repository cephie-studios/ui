'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type NavbarLink = {
	href: string;
	label: string;
	newTab?: boolean;
	className?: string;
};

export type NavbarBrand = {
	name: string;
	href?: string;
	logoSrc: string;
	logoAlt?: string;
	logoWidth?: number;
	logoHeight?: number;
};

export type NavbarProps = {
	brand: NavbarBrand;
	links?: NavbarLink[];
	actions?: ReactNode;
	mobileActions?: ReactNode;
	variant?: 'light' | 'dark';
	scrollThreshold?: number;
	className?: string;
	containerClassName?: string;
};

const defaultLogoSize = {
	width: 44,
	height: 44
};

export default function Navbar({
	brand,
	links = [],
	actions,
	mobileActions,
	variant = 'light',
	scrollThreshold = 20,
	className = '',
	containerClassName = ''
}: NavbarProps) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > scrollThreshold);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollThreshold]);

	const navClasses =
		variant === 'dark'
			? scrolled
				? 'bg-zinc-950 backdrop-blur-md border-b border-zinc-800 py-0'
				: 'bg-transparent border-b border-transparent py-2'
			: scrolled
				? 'bg-white backdrop-blur-md border-b border-zinc-200 py-0'
				: 'bg-transparent border-b border-transparent py-2';

	const brandTextClasses =
		variant === 'dark' ? 'text-zinc-50' : 'text-zinc-900';

	const linkClasses =
		variant === 'dark'
			? 'text-zinc-400 hover:text-zinc-50'
			: 'text-zinc-600 hover:text-zinc-900';

	const logoWidth = brand.logoWidth ?? defaultLogoSize.width;
	const logoHeight = brand.logoHeight ?? defaultLogoSize.height;

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses} ${className}`}
		>
			<div
				className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
			>
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
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
								className={`text-xl font-bold font-montserrat tracking-tight ${brandTextClasses}`}
							>
								{brand.name}
							</a>
						) : (
							<span
								className={`text-xl font-bold font-montserrat tracking-tight ${brandTextClasses}`}
							>
								{brand.name}
							</span>
						)}
					</div>
					<div className="hidden md:flex items-center space-x-8">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={`text-sm font-medium transition-colors ${linkClasses} ${link.className ?? ''}`}
								target={link.newTab ? '_blank' : undefined}
								rel={
									link.newTab
										? 'noopener noreferrer'
										: undefined
								}
							>
								{link.label}
							</a>
						))}
						{actions && <div className="flex gap-2">{actions}</div>}
					</div>
					<div className="md:hidden flex items-center">
						{mobileActions ?? actions}
					</div>
				</div>
			</div>
		</nav>
	);
}
