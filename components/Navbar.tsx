import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {
	return (
		<header className='w-full absolute z-10'>
			<nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 '>
				<Link href='/' className='flex justify-center items-center'>
					<Image
						src='/logo.png'
						alt='logo'
						width={30}
						height={30}
						className='object-contain'
					/>
					<p className='font-display text-2xl mx-5 '>Construction Hub</p>
				</Link>
				{/* <CustomButton
						title='Sign In'
						btnType='button'
						containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
					/> */}
				<ModeToggle />
			</nav>
		</header>
	);
};

export default Navbar;
