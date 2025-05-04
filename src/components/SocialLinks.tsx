import githubLogo from '../assets/github-mark-white.png';
import linkedinLogo from '../assets/InBug-White.png';

export default function SocialLinks() {
	return (
		<>
			<a
				href="https://github.com/quinn-labrie"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src={githubLogo}
					className="w-6 h-6"
					alt="Github Profile"
				/>
			</a>
			<a
				href="https://www.linkedin.com/in/quinn-labrie-300411a9/"
				target="_blank"
				rel="noopener noreferrer"
				className="mr-1"
			>
				<img
					src={linkedinLogo}
					className="w-7 h-6"
					alt="Linkedin Profile"
				/>
			</a>
		</>
	);
}
