import React from 'react';
import { injectStyles } from '../inject';

injectStyles();

export default function Background({
	className = '',
	style = {}
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<div aria-hidden="true" className={`cephie-bg ${className}`}>
			<div className="cephie-bg-shape" style={style} />
		</div>
	);
}
