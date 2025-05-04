import { useEffect, useState, useRef } from 'react';

interface TypingTextProps {
	label: string;
	text: string;
	startTyping: boolean;
	onComplete?: () => void;
}

export default function TypingText({
	label,
	text,
	startTyping,
	onComplete,
}: TypingTextProps) {
	const [chars, setChars] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const hasTypedRef = useRef(false);

	const labelWithColon = `${label}: `;

	useEffect(() => {
		if (hasTypedRef.current) {
			setChars(labelWithColon.length + text.length);
			return;
		}

		if (startTyping && !hasTypedRef.current) {
			setIsTyping(true);
			let i = 0;
			const fullLength = labelWithColon.length + text.length;

			const typing = setInterval(() => {
				setChars(i);
				i++;
				if (i > fullLength) {
					clearInterval(typing);
					setIsTyping(false);
					hasTypedRef.current = true;
					if (onComplete) {
						setTimeout(onComplete, 200);
					}
				}
			}, 25);

			return () => clearInterval(typing);
		}
	}, [labelWithColon, text, startTyping, onComplete]);

	const visibleLabel = labelWithColon.substring(
		0,
		Math.min(chars, labelWithColon.length)
	);
	const visibleText =
		chars > labelWithColon.length
			? text.substring(0, chars - labelWithColon.length)
			: '';

	return (
		<p
			className="text-left pl-4 text-lg"
			style={{ margin: 0, lineHeight: 1.5 }}
		>
			<span className="text-gray-500">{visibleLabel}</span>
			<span>{visibleText}</span>
			{isTyping && <span>|</span>}
		</p>
	);
}
