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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function CardCalc() {
	const [length, setLength] = useState('');
	const [width, setWidth] = useState('');
	const [depth, setDepth] = useState('');
	const [volume, setVolume] = useState('');
	const [totalVolume, setTotalVolume] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
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
	};

	const calculateVolume = () => {
		let l = parseFloat(length) / 3; // convert length feet to yards
		let w = parseFloat(width) / 3; // convert width feet to yards
		let d = parseFloat(depth) / 36; // convert depth inches to yards

		let v = l * w * d; // calculate volume in yards
		v = Math.round(v * 100) / 100; // round to 2 decimal places

		let totalV = v + v * 0.1; // add 10% waste material
		totalV = Math.round(totalV * 100) / 100; // round to 2 decimal places

		setVolume(v.toString());
		setTotalVolume(totalV.toString());
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
							<Label htmlFor='name'>Length ft</Label>
							<Input
								name='length'
								placeholder='enter height'
								value={length}
								type='number'
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Width ft</Label>
							<Input
								name='width'
								placeholder='enter width'
								value={width}
								type='number'
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Depth In</Label>
							<Input
								name='depth'
								placeholder='enter depth'
								value={depth}
								type='number'
								onChange={handleChange}
							/>
						</div>
						<div className='border px-4 py-4 font-mono text-sm'>
							Total Yards<sup>3</sup> &#123;without waste&#125; :
							<h2 className='text-green-600 font-semibold font-mono text-base'>
								{volume}
							</h2>
						</div>
						<div className='border px-4 py-4 font-mono text-sm '>
							Total Yards<sup>3</sup>{' '}
							<span className='text-red-400'>&#123;with waste 10%&#125;</span> :
							<h2 className='text-green-600 font-semibold font-mono text-base'>
								{totalVolume}
							</h2>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Button onClick={calculateVolume}>Calculate</Button>
				<Button onClick={resetForm}>Reset</Button>
			</CardFooter>
		</Card>
	);
}
