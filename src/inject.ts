import cssText from './styles.css';

let injected = false;

export function injectStyles(): void {
	if (injected) return;
	injected = true;
	if (typeof document === 'undefined') return;
	if (document.getElementById('cephie-ui-styles')) return;
	const style = document.createElement('style');
	style.id = 'cephie-ui-styles';
	style.textContent = cssText as unknown as string;
	document.head.appendChild(style);
}
