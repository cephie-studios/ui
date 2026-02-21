import React from 'react';

const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
	small: 'h-4 w-4 border-2',
	medium: 'h-8 w-8 border-3',
	large: 'h-12 w-12 border-4'
};

const modeClasses: Record<'light' | 'dark', string> = {
	light: 'border-zinc-200 border-t-zinc-800',
	dark: 'border-zinc-800 border-t-zinc-200'
};

export default function LoadingSpinner({
	size = 'medium',
	mode = 'dark'
}: {
	size?: 'small' | 'medium' | 'large';
	mode?: 'light' | 'dark';
}) {
	return (
		<div className="flex items-center justify-center">
			<div
				className={`${sizeClasses[size]} ${modeClasses[mode]} animate-spin rounded-full`}
			/>
		</div>
	);
}
