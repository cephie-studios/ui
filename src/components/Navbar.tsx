'use client';

import {
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
	type ComponentProps,
	type ReactNode
} from 'react';
import Button from './Button';

const modeClasses: Record<'light' | 'dark', string> = {
	light: 'bg-white backdrop-blur-md border-b border-zinc-200',
	dark: 'bg-zinc-950 backdrop-blur-md border-b border-zinc-800'
};

const menuClasses: Record<'light' | 'dark', string> = {
	light: 'bg-white border border-zinc-200 shadow-xl',
	dark: 'bg-zinc-900 border border-zinc-800 shadow-xl'
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
				className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
					scrolled
						? `${modeClasses[mode]} py-0`
						: 'bg-transparent border-b border-transparent py-2'
				} ${className}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{children}
					</div>
				</div>
			</nav>
		</NavbarContext.Provider>
	);
}

type NavbarLeftProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarLeft({ children, className = '' }: NavbarLeftProps) {
	return (
		<div className={`flex items-center ${className}`}>
			{children}
		</div>
	);
}

type NavbarRightProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarRight({ children, className = '' }: NavbarRightProps) {
	return (
		<div
			className={`hidden md:flex items-center space-x-8 ${className}`}
		>
			{children}
		</div>
	);
}

type NavbarActionsProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarActions({
	children,
	className = ''
}: NavbarActionsProps) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{children}
		</div>
	);
}

type NavbarRightMobileProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarRightMobile({
	children,
	className = ''
}: NavbarRightMobileProps) {
	return (
		<div
			className={`md:hidden flex items-center ${className}`}
		>
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

type NavbarLinkProps = {
	children?: ReactNode;
	href: string;
	newTab?: boolean;
	className?: string;
	mode?: 'light' | 'dark';
};

export function NavbarLink({
	children,
	href,
	newTab = false,
	className = '',
	mode
}: NavbarLinkProps) {
	const context = useContext(NavbarContext);
	const currentMode = mode ?? context.mode;
	const linkClasses =
		currentMode === 'dark'
			? 'text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors'
			: 'text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors';

	return (
		<a
			href={href}
			target={newTab ? '_blank' : '_self'}
			rel={newTab ? 'noopener noreferrer' : undefined}
			className={`${linkClasses} ${className}`}
		>
			{children}
		</a>
	);
}

type NavbarButtonProps = ComponentProps<typeof Button>;

export function NavbarButton({ className, ...props }: NavbarButtonProps) {
	return <Button navbar className={className} {...props} />;
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

	const userNameClasses =
		currentMode === 'dark'
			? 'text-sm font-medium text-zinc-50 font-montserrat'
			: 'text-sm font-medium text-zinc-900 font-montserrat';

	const chevronClasses =
		currentMode === 'dark' ? 'text-zinc-400' : 'text-zinc-500';

	const menuLinkBaseClasses =
		'flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors';
	const menuButtonBaseClasses =
		'flex items-center gap-3 w-full px-4 py-2 rounded-xl text-sm transition-colors text-left';
	const menuItemDefaultClasses =
		currentMode === 'dark'
			? 'text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800'
			: 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100';
	const menuItemDangerClasses =
		currentMode === 'dark'
			? 'text-zinc-300 hover:text-red-400 hover:bg-zinc-800'
			: 'text-zinc-700 hover:text-red-600 hover:bg-zinc-100';

	return (
		<div className={`relative shrink-0 ${className}`} ref={menuRef}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={`flex items-center gap-2 px-3 py-2 rounded-xl ${buttonClassName}`}
			>
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
					<span className={userNameClasses}>{userName}</span>
				)}
				<svg
					className={`w-4 h-4 shrink-0 transition-transform duration-200 ${chevronClasses} ${open ? 'rotate-180' : ''}`}
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
			</button>

			{open && (
				<div
					className={`absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200 py-1 px-1 ${
						menuClasses[currentMode]
					} ${menuClassName}`}
				>
					{items.map((item) => {
						if (item.href) {
							return (
								<a
									key={item.label}
									href={item.href}
									target={item.newTab ? '_blank' : '_self'}
									rel={
										item.newTab
											? 'noopener noreferrer'
											: undefined
									}
									className={`${menuLinkBaseClasses} ${
										item.danger
											? menuItemDangerClasses
											: menuItemDefaultClasses
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
								className={`${menuButtonBaseClasses} ${
									item.danger
										? menuItemDangerClasses
										: menuItemDefaultClasses
								}`}
							>
								{item.icon}
								{item.label}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
