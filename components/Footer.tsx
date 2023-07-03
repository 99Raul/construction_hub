import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<div className='flex flex-row w-full border-t py-5 text-center justify-center'>
			<div className='flex'>
				Github
				<div className='flex ml-2'>
					<Link
						className='flex flex-row justify-center'
						href='https://github.com/99Raul/construction_hub'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Github />
					</Link>
				</div>
			</div>
		</div>
	);
}
