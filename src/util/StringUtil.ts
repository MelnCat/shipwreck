export const replaceN = (str: string, match: string | RegExp, n: number, replaceWith: string) => {
	for (let i = 0; i < n; i++) str = str.replace(match, replaceWith);
	return str;
};