'use client';

import { useState } from 'react';
import { CardCalc } from './CardCalc';
import TileCalculator from './TileCalc';
import { WallSheet } from './WallSheet';
import FlooringCalculator from './FlooringCalc';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const SelectTwo = () => {
	const [selectedOption, setSelectedOption] = useState('option1');


	const handleSelectChange = (value: string, name: string) => {
		if (name === 'option1') {
			setSelectedOption(value);
		} else if (name === 'option2') {
			setSelectedOption(value);
		} else if (name === 'option3') {
			setSelectedOption(value);
		} else if (name === 'option4') {
			setSelectedOption(value);
		}
	};

	return (
		<div className='flex flex-col m-auto'>
			<Select
				onValueChange={(value) => handleSelectChange(value, 'option1')}
				value={selectedOption}
			>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select a option' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='option1'>Construction Calculator</SelectItem>
						<SelectItem value='option2'>Drywall Estimate</SelectItem>
						<SelectItem value='option3'>Flooring Estimate</SelectItem>
						<SelectItem value='option4'>Tile Estimate</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<div className='mt-5'>
				{selectedOption === 'option1' && <CardCalc />}
				{selectedOption === 'option2' && <WallSheet />}
				{selectedOption === 'option3' && <FlooringCalculator />}
				{selectedOption === 'option4' && <TileCalculator />}
			</div>
		</div>
	);
};

export default SelectTwo;
