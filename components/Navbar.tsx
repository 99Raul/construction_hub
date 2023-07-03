import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './ModeToggle';
import { SignIn } from './SignIn';
import { SideMenu } from './SideMenu';

const Navbar = () => {
	return (
		<header className='w-full absolute z-10'>
			<nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 '>
				<div className='flex'>
					<SideMenu />
					<Link href='/' className='flex justify-center items-center'>
						<Image
							src='/logo.png'
							alt='logo'
							width={30}
							height={30}
							className='object-contain hidden sm:flex'
						/>
						<p className='hidden sm:flex sm:text-base md:text-2xl mx-3'>
							Construction Hub
						</p>
					</Link>
				</div>
				<div className='flex'>
					<SignIn />
					<ModeToggle />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
