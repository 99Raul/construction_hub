import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '../ModeToggle';

import { SideMenu } from './SideMenu';
import { auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { NavMenu } from './NavMenu';
import { HomeIcon } from 'lucide-react';

const Navbar = () => {
	const { userId } = auth();
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
							className='object-contain hidden lg:flex'
						/>
						<p className='hidden lg:flex sm:text-base md:text-2xl mx-3'>
							Construction Hub
						</p>
					</Link>
				</div>
				{userId && (
					<div className='hidden md:flex'>
						<NavMenu />
					</div>
				)}
				<div className='flex'>
					{!userId ? (
						<>
							<Button className='mr-3  sm:flex' size='sm' variant='outline'>
								<Link href='/sign-up'>Sign-up</Link>
							</Button>
							<Button className='mr-3  sm:flex' size='sm'>
								<Link href='/sign-in'>Sign-in</Link>
							</Button>
						</>
					) : (
						<>
							<Link href='/' className='flex items-center mr-3'>
								<HomeIcon />
							</Link>
						</>
					)}
					<ModeToggle />
					<div className='ml-3'>
						<SignedIn>
							{/* Mount the UserButton component */}
							<UserButton
								afterSignOutUrl='/'
								afterMultiSessionSingleSignOutUrl='/'
								afterSwitchSessionUrl='/'
								appearance={{ variables: { colorPrimary: '#000' } }}
							/>
						</SignedIn>
					</div>
					<SignedOut>{/* Signed out users get sign in button */}</SignedOut>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
