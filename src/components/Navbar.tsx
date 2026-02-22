'use client';

import {
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
	type ReactNode
} from 'react';
import Button from './Button';

const modeClasses: Record<'light' | 'dark', string> = {
	light: 'bg-white backdrop-blur-md border-b border-zinc-200',
	dark: 'bg-zinc-950 backdrop-blur-md border-b border-zinc-800'
};

const menuClasses: Record<'light' | 'dark', string> = {
	light: 'bg-white border border-zinc-200 text-zinc-700 shadow-xl ring-1 ring-zinc-900/5',
	dark: 'bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-2xl ring-1 ring-zinc-950/40'
};

const defaultIcons = {
	light: 'https://cephie.app/assets/icons/cephie-clean.avif',
	dark: 'https://dash.cephie.app/assets/icons/cephie-clean-dark.avif'
};

type NavbarContainerProps = {
	children?: ReactNode;
	mode?: 'light' | 'dark';
	className?: string;
};

type NavbarContextValue = {
	mode: 'light' | 'dark';
};

const NavbarContext = createContext<NavbarContextValue>({ mode: 'light' });

export default function NavbarContainer({
	children,
	mode = 'light',
	className = ''
}: NavbarContainerProps) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<NavbarContext.Provider value={{ mode }}>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					scrolled
						? `${modeClasses[mode]} py-0`
						: 'bg-transparent border-b border-transparent py-2'
				} ${className}`}
			>
				{children}
			</nav>
		</NavbarContext.Provider>
	);
}

type NavbarInnerProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarInner({ children, className = '' }: NavbarInnerProps) {
	return (
		<div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
			{children}
		</div>
	);
}

type NavbarRowProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarRow({ children, className = '' }: NavbarRowProps) {
	return (
		<div className={`flex justify-between items-center h-16 ${className}`}>
			{children}
		</div>
	);
}

type NavbarBrandProps = {
	title?: string;
	href?: string;
	iconLight?: string;
	iconDark?: string;
	iconAlt?: string;
	iconSize?: number;
	className?: string;
	titleClassName?: string;
};

export function NavbarBrand({
	title = 'Cephie Studios',
	href = '/',
	iconLight = defaultIcons.light,
	iconDark = defaultIcons.dark,
	iconAlt = 'Icon',
	iconSize = 44,
	className = '',
	titleClassName = ''
}: NavbarBrandProps) {
	const { mode } = useContext(NavbarContext);
	const iconSrc = mode === 'dark' ? iconDark : iconLight;

	return (
		<div className={`flex items-center ${className}`}>
			<img
				src={iconSrc}
				alt={iconAlt}
				width={iconSize}
				height={iconSize}
				className="inline-block mr-1"
			/>
			<a
				href={href}
				className={`text-xl font-bold font-montserrat tracking-tight ${
					mode === 'dark' ? 'text-zinc-50' : 'text-zinc-900'
				} ${titleClassName}`}
			>
				{title}
			</a>
		</div>
	);
}

type NavbarUserMenuItem = {
	label: string;
	href?: string;
	newTab?: boolean;
	onClick?: () => void;
	icon?: ReactNode;
	danger?: boolean;
};

type NavbarUserMenuProps = {
	userName?: string;
	userImage?: string;
	items: NavbarUserMenuItem[];
	className?: string;
	buttonClassName?: string;
	menuClassName?: string;
	mode?: 'light' | 'dark';
};

export function NavbarUserMenu({
	userName,
	userImage,
	items,
	className = '',
	buttonClassName = '',
	menuClassName = '',
	mode
}: NavbarUserMenuProps) {
	const context = useContext(NavbarContext);
	const currentMode = mode ?? context.mode;
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (menuRef.current && !menuRef.current.contains(target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const triggerClasses =
		currentMode === 'dark'
			? 'bg-transparent! text-zinc-50 hover:bg-zinc-900!'
			: 'bg-transparent! text-zinc-900 hover:bg-zinc-200!';

	return (
		<div className={`relative ${className}`} ref={menuRef}>
			<Button
				variant="secondary"
				mode={currentMode}
				onClick={() => setOpen(!open)}
				className={`px-3! py-2! rounded-xl! shadow-none! border-0! ${triggerClasses} ${buttonClassName}`}
			>
				<span className="flex items-center gap-2">
					{userImage && (
						<img
							src={userImage}
							alt="Profile"
							width={28}
							height={28}
							className="rounded-full"
						/>
					)}
					{userName && (
						<span className="text-sm font-medium font-montserrat">
							{userName}
						</span>
					)}
					<svg
						className={`w-4 h-4 transition-transform duration-200 ${
							currentMode === 'dark'
								? 'text-zinc-400'
								: 'text-zinc-500'
						} ${open ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</span>
			</Button>

			{open && (
				<div
					className={`absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${
						menuClasses[currentMode]
					} ${menuClassName}`}
				>
					<div className="py-1 px-1">
						{items.map((item) => {
							const baseClasses =
								'flex items-center gap-3 w-full px-4 py-2 rounded-xl text-sm transition-colors text-left';
							const dangerClasses =
								currentMode === 'dark'
									? 'text-zinc-300 hover:text-red-400 hover:bg-zinc-800'
									: 'text-zinc-700 hover:text-red-600 hover:bg-zinc-100';
							const defaultClasses =
								currentMode === 'dark'
									? 'text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800'
									: 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100';

							if (item.href) {
								return (
									<a
										key={item.label}
										href={item.href}
										target={
											item.newTab ? '_blank' : '_self'
										}
										rel={
											item.newTab
												? 'noopener noreferrer'
												: undefined
										}
										className={`${baseClasses} ${
											item.danger
												? dangerClasses
												: defaultClasses
										}`}
										onClick={() => setOpen(false)}
									>
										{item.icon}
										{item.label}
									</a>
								);
							}

							return (
								<button
									key={item.label}
									type="button"
									onClick={() => {
										setOpen(false);
										item.onClick?.();
									}}
									className={`${baseClasses} ${
										item.danger
											? dangerClasses
											: defaultClasses
									}`}
								>
									{item.icon}
									{item.label}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
