'use client';
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function CardCalc() {
	const [length, setLength] = useState('');
	const [width, setWidth] = useState('');
	const [depth, setDepth] = useState('');
	const [volume, setVolume] = useState('');
	const [totalVolume, setTotalVolume] = useState('');
	// const [depthError, setDepthError] = useState('');
	const [inputErrors, setInputErrors] = useState({
		length: '',
		width: '',
		depth: '',
	});

	const [lengthUnit, setLengthUnit] = useState('feet');
	const [widthUnit, setWidthUnit] = useState('feet');
	const [depthUnit, setDepthUnit] = useState('feet');
	const [totalVolumeCubicMeters, setTotalVolumeCubicMeters] = useState('');

	// works with normal select / not with shad ui select
	// const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	const { name, value } = e.target;

	// 	if (name === 'lengthUnit') {
	// 		setLengthUnit(value);
	// 	} else if (name === 'widthUnit') {
	// 		setWidthUnit(value);
	// 	} else if (name === 'depthUnit') {
	// 		setDepthUnit(value);
	// 	}
	// };

	const handleUnitChange = (value: string, name: string) => {
		if (name === 'lengthUnit') {
			setLengthUnit(value);
		} else if (name === 'widthUnit') {
			setWidthUnit(value);
		} else if (name === 'depthUnit') {
			setDepthUnit(value);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		let newInputErrors = { ...inputErrors };
		let error = '';

		if (isNaN(Number(value))) {
			error = 'Invalid input. Please enter a number.';
		}

		newInputErrors[name as keyof typeof inputErrors] = error; // Type assertion
		setInputErrors(newInputErrors);

		if (name === 'length') {
			setLength(value);
		} else if (name === 'width') {
			setWidth(value);
		} else if (name === 'depth') {
			setDepth(value);
		}
	};

	const resetForm = () => {
		setLength('');
		setWidth('');
		setDepth('');
		setVolume('');
		setTotalVolume('');
		setInputErrors({
			length: '',
			width: '',
			depth: '',
		});
		setTotalVolumeCubicMeters('');
	};

	const calculateVolume = () => {
		let l = parseFloat(length) / 3; // convert length feet to yards
		let w = parseFloat(width) / 3; // convert width feet to yards
		let d = parseFloat(depth) / 36; // convert depth inches to yards

		if (isNaN(d) || d <= 0) {
			setInputErrors((prevErrors) => ({
				...prevErrors,
				depth: 'Do not leave blank or leave 0',
			}));
			return; // Stop further calculations
		} else {
			setInputErrors((prevErrors) => ({
				...prevErrors,
				depth: '',
			}));
		}

		if (lengthUnit === 'inches') {
			l = l / 12;
		} else if (lengthUnit === 'meters') {
			l = l * 3.28084;
		} else if (lengthUnit === 'yards') {
			// No need to convert
		}

		if (widthUnit === 'inches') {
			w = w / 12;
		} else if (widthUnit === 'meters') {
			w = w * 3.28084;
		} else if (widthUnit === 'yards') {
			// No need to convert
		}

		if (depthUnit === 'inches') {
			d = d / 12;
		} else if (depthUnit === 'meters') {
			d = d * 3.28084;
		} else if (depthUnit === 'yards') {
			// No need to convert
		}

		let v = l * w * d; // calculate volume in yards
		v = Math.round(v * 100) / 100; // round to 2 decimal places

		let totalV = v + v * 0.1; // add 10% waste material
		totalV = Math.round(totalV * 100) / 100; // round to 2 decimal places

		let vCubicMeters = v / 1.30795; // calculate volume in cubic meters
		vCubicMeters = Math.round(vCubicMeters * 100) / 100; // round to 2 decimal places

		setVolume(v.toString());
		setTotalVolume(totalV.toString());
		setTotalVolumeCubicMeters(vCubicMeters.toString()); // set total volume in cubic meters
	};

	return (
		<Card className='w-[350px]'>
			<CardHeader>
				<CardTitle>Calculator</CardTitle>
				<CardDescription>Concrete yards needed</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<div className='flex flex-row'>
								<Label htmlFor='name' className='mt-2'>
									Length
									{/* <select
										name='lengthUnit'
										value={lengthUnit}
										onChange={handleUnitChange}
										className='bg-blue-500 rounded-sm ml-2 border-gray-400 font-semibold appearance:none'
									>
										<option value='feet'>Ft</option>
										<option value='inches'>in</option>
										<option value='meters'>Meters</option>
										<option value='yards'>Yards</option>
									</select> */}
								</Label>

								<Select
									onValueChange={(value) =>
										handleUnitChange(value, 'lengthUnit')
									}
									value={lengthUnit}
								>
									<SelectTrigger className='w-[80px] h-[30px] ml-4'>
										<SelectValue placeholder='Ft' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='feet'>Ft</SelectItem>
											<SelectItem value='inches'>in</SelectItem>
											<SelectItem value='meters'>meters</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<Input
								name='length'
								placeholder='enter height'
								value={length}
								type='text'
								onChange={handleChange}
							/>

							{inputErrors.length && (
								<p className='text-red-500 text-sm'>{inputErrors.length}</p>
							)}
						</div>
						<div className='flex flex-col space-y-1.5'>
							<div className='flex flex-row'>
								<Label htmlFor='name' className='mt-2'>
									Width
								</Label>
								<Select
									onValueChange={(value) =>
										handleUnitChange(value, 'widthUnit')
									}
									value={widthUnit}
								>
									<SelectTrigger className='w-[80px] h-[30px] ml-4'>
										<SelectValue placeholder='Ft' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='feet'>Ft</SelectItem>
											<SelectItem value='inches'>in</SelectItem>
											<SelectItem value='meters'>meters</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<Input
								name='width'
								placeholder='enter width'
								value={width}
								type='text'
								onChange={handleChange}
							/>
							{inputErrors.width && (
								<p className='text-red-500 text-sm'>{inputErrors.width}</p>
							)}
						</div>
						<div className='flex flex-col space-y-1.5'>
							<div className='flex flex-row'>
								<Label htmlFor='name' className='mt-2'>
									Depth Inches
								</Label>
							</div>
							<Input
								name='depth'
								placeholder='enter depth'
								value={depth}
								type='text'
								onChange={handleChange}
							/>
							{/* {depthError && (
								<p className='text-red-500 text-sm'>{depthError}</p>
							)}{' '} */}
							{inputErrors.depth && (
								<p className='text-red-500 text-sm'>{inputErrors.depth}</p>
							)}
							{/* Display error message if depthError is not empty */}
						</div>
						<div className='border px-4 py-4 font-mono text-sm'>
							Total Yards<sup>3</sup> &#123;without waste&#125;:
							<h2 className='text-green-600 font-semibold font-mono text-base'>
								{volume}
							</h2>
						</div>
						<div className='border px-4 py-4 font-mono text-sm '>
							Total Yards<sup>3</sup>{' '}
							<span className='text-red-400'>&#123;with waste 10%&#125;</span>:
							<h2 className='text-green-600 font-semibold font-mono text-base'>
								{totalVolume}
							</h2>
						</div>
						<div className='border px-4 py-4 font-mono text-sm '>
							Total Meters
							<h2 className='text-green-600 font-semibold font-mono text-base'>
								{totalVolumeCubicMeters}
							</h2>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Button onClick={calculateVolume}>Calculate</Button>
				<Button onClick={resetForm} className='bg-red-400'>
					Reset
				</Button>
			</CardFooter>
		</Card>
	);
}
