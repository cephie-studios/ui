import React from 'react';
import { injectStyles } from '../inject';

injectStyles();

const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
	small: 'cephie-h-4 cephie-w-4 cephie-border-2',
	medium: 'cephie-h-8 cephie-w-8 cephie-border-[3px]',
	large: 'cephie-h-12 cephie-w-12 cephie-border-4'
};

const modeClasses: Record<'light' | 'dark', string> = {
	light: 'cephie-border-zinc-200 cephie-border-t-zinc-800',
	dark: 'cephie-border-zinc-800 cephie-border-t-zinc-200'
};

export default function LoadingSpinner({
	size = 'medium',
	mode = 'dark'
}: {
	size?: 'small' | 'medium' | 'large';
	mode?: 'light' | 'dark';
}) {
	return (
		<div className="cephie-flex cephie-items-center cephie-justify-center">
			<div
				className={`cephie-animate-spin cephie-rounded-full cephie-border-solid ${sizeClasses[size]} ${modeClasses[mode]}`}
			/>
		</div>
	);
}
