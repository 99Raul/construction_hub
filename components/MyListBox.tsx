'use client';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { WallSheet } from '@/components/WallSheet';
import { CardCalc } from '@/components/CardCalc';
import TileCalc from '@/components/TileCalc';
import FlooringCalc from '@/components/FlooringCalc';
import Balancer from 'react-wrap-balancer';

type FruitOption = {
	label?: string;
	value?: string;
	name?: string;
	onChange?: (event?: any) => void;
};

const fruitOptions: FruitOption[] = [
	{ label: 'Concrete Calculator', value: 'apple', name: 'Concrete Calculator' },
	{
		label: 'Drywall Material Estimate',
		value: 'banana',
		name: 'Drywall Material Estimate',
	},
	{
		label: 'Flooring Material Estimate',
		value: 'carrot',
		name: 'Flooring Material Estimate',
	},
	{
		label: 'Tile Material Estimate',
		value: 'orange',
		name: 'Tile Material Estimate',
	},
];

export default function MyListBox() {
	const [selected, setSelected] = useState(fruitOptions[0]);

	const [selectedOption, setSelectedOption] = useState<FruitOption | null>(
		fruitOptions[0]
	);

	const handleOptionChange = (value: any) => {
		const selected = fruitOptions.find((option) => option.value === value);
		setSelectedOption(selected || null);
		setSelected(selected || fruitOptions[0]);
	};

	return (
		<div className='w-full'>
			<p className='mt-2 mb-2  text-gray-500 md:text-xl'>
				<Balancer>
					Select between different calculators for your project
				</Balancer>
			</p>
			<Listbox value={selectedOption} onChange={handleOptionChange}>
				<div className='relative mt-1'>
					<Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
						<span className='block truncate text-black font-medium'>
							{selected.name}
						</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<ChevronUpDownIcon
								className='h-5 w-5 text-gray-600'
								aria-hidden='true'
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='relative font-medium mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{fruitOptions.map((fruit, fruitIdx) => (
								<Listbox.Option
									key={fruitIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
										}`
									}
									value={fruit.value}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{fruit.name}
											</span>

											{selected ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
													<CheckIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
			<div className='flex justify-center mt-5'>
				{selectedOption?.value === 'apple' && <CardCalc />}
				{selectedOption?.value === 'banana' && <WallSheet />}
				{selectedOption?.value === 'orange' && <TileCalc />}
				{selectedOption?.value === 'carrot' && <FlooringCalc />}
			</div>
		</div>
	);
}
