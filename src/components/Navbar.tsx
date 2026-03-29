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
import Rail from './Rail';

const shellClasses: Record<'light' | 'dark', string> = {
	light:
		'bg-white border-b border-[#d8d8d6]',
	dark: 'bg-[#0d0d0b] border-b border-[#2a2a28]'
};

const railTone: Record<'light' | 'dark', string> = {
	light: 'border-t border-[#d8d8d6] bg-white sm:border-t-0',
	dark: 'border-t border-[#2a2a28] bg-[#0d0d0b] sm:border-t-0'
};

const menuClasses: Record<'light' | 'dark', string> = {
	light: 'border border-[#e5e5e5] bg-white shadow-xl',
	dark: 'border border-[#2a2a28] bg-[#141412] shadow-xl'
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
	return (
		<NavbarContext.Provider value={{ mode }}>
			<header
				className={`fixed left-0 right-0 top-0 z-50 h-12 ${shellClasses[mode]} ${className}`}
			>
				<Rail
					variant={mode === 'dark' ? 'dark' : 'light'}
					className={`flex h-full min-w-0 items-stretch ${railTone[mode]}`}
				>
					<div className="flex h-full min-w-0 w-full flex-1 items-stretch justify-between">
						{children}
					</div>
				</Rail>
			</header>
		</NavbarContext.Provider>
	);
}

type NavbarLeftProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarLeft({ children, className = '' }: NavbarLeftProps) {
	return (
		<div className={`flex h-full min-w-0 items-stretch ${className}`}>
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
			className={`hidden h-full shrink-0 items-stretch divide-x divide-[#e5e5e5] border-[#e5e5e5] md:flex md:border-l dark:divide-[#2a2a28] dark:border-[#2a2a28] ${className}`}
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
		<div className={`flex h-full items-stretch ${className}`}>
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
			className={`flex h-full shrink-0 items-stretch border-l border-[#e5e5e5] md:hidden dark:border-[#2a2a28] ${className}`}
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
	iconSize = 48,
	className = '',
	titleClassName = ''
}: NavbarBrandProps) {
	const { mode } = useContext(NavbarContext);
	const iconSrc = mode === 'dark' ? iconDark : iconLight;
	const isDark = mode === 'dark';

	return (
		<a
			href={href}
			className={`flex h-full shrink-0 items-stretch border-r border-[#e5e5e5] hover:bg-[#fafafa] dark:border-[#2a2a28] dark:hover:bg-white/5 ${
				className
			}`}
		>
			<span className="flex h-full items-center">
				<img
					src={iconSrc}
					alt={iconAlt}
					width={iconSize}
					height={iconSize}
					className="h-12 w-12 object-contain object-left"
				/>
			</span>
			<span
				className={`hidden h-full items-center px-4 text-[13px] font-medium normal-case tracking-tight sm:flex md:px-5 ${
					isDark ? 'text-white' : 'text-[#0d0d0b]'
				} ${titleClassName}`}
			>
				{title}
			</span>
		</a>
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
			? 'text-[13px] font-medium uppercase tracking-[0.06em] text-[#a8a69f] transition-colors hover:text-white'
			: 'text-[13px] font-medium uppercase tracking-[0.06em] text-[#5c5a55] transition-colors hover:text-[#0d0d0b]';

	return (
		<a
			href={href}
			target={newTab ? '_blank' : '_self'}
			rel={newTab ? 'noopener noreferrer' : undefined}
			className={`!flex h-full min-h-0 flex-1 items-center justify-center border-0 px-2 sm:flex-none sm:px-5 md:px-6 ${linkClasses} ${className}`}
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
			? 'text-[13px] font-medium text-white'
			: 'text-[13px] font-medium text-[#0d0d0b]';

	const chevronClasses =
		currentMode === 'dark' ? 'text-[#a8a69f]' : 'text-[#5c5a55]';

	const menuLinkBaseClasses =
		'flex items-center gap-3 px-4 py-2 text-left text-[13px] transition-colors';
	const menuButtonBaseClasses =
		'flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] transition-colors';
	const menuItemDefaultClasses =
		currentMode === 'dark'
			? 'text-[#c8c6c1] hover:bg-white/10 hover:text-white'
			: 'text-[#0d0d0b] hover:bg-[#f4f4f4]';
	const menuItemDangerClasses =
		currentMode === 'dark'
			? 'text-[#c8c6c1] hover:bg-white/10 hover:text-red-400'
			: 'text-[#0d0d0b] hover:bg-[#f4f4f4] hover:text-red-600';

	return (
		<div className={`relative h-full shrink-0 ${className}`} ref={menuRef}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={`flex h-full items-center gap-2 px-3 ${buttonClassName}`}
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
					className={`h-4 w-4 shrink-0 transition-transform duration-200 ${chevronClasses} ${open ? 'rotate-180' : ''}`}
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
					className={`absolute right-0 top-full z-50 mt-2 w-48 animate-in fade-in zoom-in overflow-hidden rounded-xl py-1 duration-200 ${menuClasses[currentMode]} ${menuClassName}`}
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

/** Full-width row of nav links with vertical dividers (rail style). */
type NavbarSegmentGroupProps = {
	children?: ReactNode;
	className?: string;
};

export function NavbarSegmentGroup({
	children,
	className = ''
}: NavbarSegmentGroupProps) {
	return (
		<div
			className={`flex h-full min-w-0 flex-1 overflow-x-hidden sm:overflow-x-auto ${className}`}
		>
			<div className="flex h-full min-w-0 w-full">{children}</div>
		</div>
	);
}

type NavbarDividerProps = { className?: string };

export function NavbarDivider({ className = '' }: NavbarDividerProps) {
	return (
		<span
			className={`h-full w-px shrink-0 self-stretch bg-[#e5e5e5] dark:bg-[#2a2a28] ${className}`}
			aria-hidden
		/>
	);
}
