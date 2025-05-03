import { useEffect, useState, useRef } from 'react';
import './TypingCursor.css';

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
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const hasTypedRef = useRef(false);

	useEffect(() => {
		if (hasTypedRef.current) {
			setDisplayedText(text);
			return;
		}

		if (startTyping && !hasTypedRef.current) {
			setIsTyping(true);
			let i = 0;
			const typing = setInterval(() => {
				setDisplayedText(text.substring(0, i));
				i++;
				if (i > text.length) {
					clearInterval(typing);
					setIsTyping(false);
					hasTypedRef.current = true;
					if (onComplete) {
						setTimeout(onComplete, 500);
					}
				}
			}, 50);

			return () => clearInterval(typing);
		}
	}, [text, startTyping, onComplete]);

	return (
		<p>
			{label}:{' '}
			<span className={`typing-text ${isTyping ? 'typing' : 'finished'}`}>
				{displayedText}
			</span>
		</p>
	);
}
