import TypingText from './TypingText';
import { Card, CardContent } from './ui/card';

export default function Info() {
	const text = {
		name: 'Quinn LaBrie',
		email: 'quinn.labrie@gmail.com',
		occupation: 'Software Engineer',
		location: 'Austin, TX',
	};

	return (
		<Card className="items-start">
			<CardContent className="flex flex-col items-start">
				<TypingText
					label="Name"
					text={text.name}
					delay={0}
				/>
				<TypingText
					label="Email"
					text={text.email}
					delay={1000}
				/>
				<TypingText
					label="Occupation"
					text={text.occupation}
					delay={2000}
				/>
				<TypingText
					label="Location"
					text={text.location}
					delay={3000}
				/>
			</CardContent>
		</Card>
	);
}
