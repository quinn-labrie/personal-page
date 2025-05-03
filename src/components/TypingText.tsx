import { useEffect, useState } from 'react';

export default function TypingText({
	label,
	text,
	delay,
}: {
	label: string;
	text: string;
	delay: number;
}) {
	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			let i = 0;
			const typing = setInterval(() => {
				setDisplayedText(text.substring(0, i));
				i++;
				if (i > text.length) clearInterval(typing);
			}, 50);

			return () => clearInterval(typing);
		}, delay);

		return () => clearTimeout(timeout);
	}, [text, delay]);

	return (
		<p>
			{label}: {displayedText}
		</p>
	);
}
