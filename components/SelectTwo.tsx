'use client';
import { useState } from 'react';
import { CardForm } from '@/components/WallSheet';
import { CardCalc } from '@/components/CardCalc';

const SelectTwo = () => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
	};

	return (
		<div>
			<select value={selectedOption} onChange={handleOptionChange}>
				<option value=''>Select an option</option>
				<option value='option1'>Option 1</option>
				<option value='option2'>Option 2</option>
				{/* <li value='option1'>Option 1</li>
				<li value='option2'>Option 2</li>
				<li value='option3'>Option 3</li> */}
			</select>

			{selectedOption === 'option1' && <CardCalc />}
			{selectedOption === 'option2' && <CardForm />}
		</div>
	);
};

export default SelectTwo;
