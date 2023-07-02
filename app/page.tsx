// import { WallSheet } from '@/components/WallSheet';
// import { CardCalc } from '@/components/CardCalc';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import SelectTwo from '@/components/SelectTwo';
import MyListBox from '@/components/MyListBox';

export default function Home() {
	return (
		<>
			<div className='z-10 w-full max-w-xl px-5 xl:px-0'>
				<h1 className='bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em]  md:text-7xl md:leading-[5rem]'>
					<Balancer>Manage and calculate projects</Balancer>
				</h1>
				
				<div className='my-10 w-full max-w-screen-xl gap-5 px-1 xl:px-0 flex flex-col md:flex-row'>
					{/* <SelectTwo />   */}
					<MyListBox />
				</div>
			</div>
		</>
	);
}
