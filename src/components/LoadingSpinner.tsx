import { injectStyles } from '../inject';

injectStyles();

export default function LoadingSpinner({
	size = 'medium',
	mode = 'dark'
}: {
	size?: 'small' | 'medium' | 'large';
	mode?: 'light' | 'dark';
}) {
	return (
		<div className="cephie-spinner-wrap">
			<div
				className={`cephie-spinner cephie-spinner--${size} cephie-spinner--${mode}`}
			/>
		</div>
	);
}
