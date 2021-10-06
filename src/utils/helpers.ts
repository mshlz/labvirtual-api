export function escapeStringRegexp(value: string): string {
	if (typeof value !== 'string') {
		throw new TypeError('Expected a string');
	}

	return value
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}