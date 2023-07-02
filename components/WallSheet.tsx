'use client';
import { useState } from 'react';
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

export function WallSheet() {
	const [totalSquareFootage, setTotalSquareFootage] = useState('');
	const [pricePerSheet, setPricePerSheet] = useState('');
	const [sheetSize, setSheetSize] = useState<'4x8' | '4x12'>('4x8');
	const [extraAndWaste, setExtraAndWaste] = useState('10');
	const [numberOfSheets, setNumberOfSheets] = useState('');
	const [totalCost, setTotalCost] = useState('');
	const [taxRate, setTaxRate] = useState('');
	const [finalCost, setFinalCost] = useState('');

	const [inputErrors, setInputErrors] = useState({
		totalSquareFootage: false,
		pricePerSheet: false,
		extraAndWaste: false,
		taxRate: false,
	});

	const calculateSheetsAndCost = () => {
		const totalSqFt = parseFloat(totalSquareFootage);
		const priceSheet = parseFloat(pricePerSheet);

		// const extraWaste = parseFloat(extraAndWaste) || 1; // Use 1 as the default value if extraAndWaste is not provided or NaN
		const extraWastePercentage = parseFloat(extraAndWaste) || 0; // Use 0 as the default value if extraAndWaste is not provided or NaN
		const extraWasteMultiplier = 1 + extraWastePercentage / 100; // Calculate the multiplier from the percentage

		const tax = parseFloat(taxRate);

		let sheetCount = 0;
		let cost = 0;

		if (sheetSize === '4x8') {
			sheetCount = Math.ceil((totalSqFt / 32) * extraWasteMultiplier);
		} else if (sheetSize === '4x12') {
			sheetCount = Math.ceil((totalSqFt / 48) * extraWasteMultiplier);
		}

		cost = sheetCount * priceSheet;

		const taxAmount = cost * (tax / 100);
		const totalCostWithTax = (cost + taxAmount).toFixed(2);

		setNumberOfSheets(sheetCount.toString());
		setTotalCost(cost.toFixed(2));
		setFinalCost(totalCostWithTax);

		const errors = {
			totalSquareFootage: isNaN(totalSqFt) || totalSqFt <= 0,
			pricePerSheet: isNaN(priceSheet) || priceSheet <= 0,
			extraAndWaste: isNaN(extraWastePercentage) || extraWastePercentage < 0,
			taxRate: isNaN(tax) || tax < 0,
		};

		setInputErrors(errors);
	};

	const handleSheetChange = (value: string) => {
		if (value === '4x8') {
			setSheetSize(value);
		} else if (value === '4x12') {
			setSheetSize(value);
		}
	};

	const resetForm = () => {
		setTotalSquareFootage('');
		setPricePerSheet('');
		setSheetSize('4x8');
		setExtraAndWaste('');
		setTaxRate('');
		setNumberOfSheets('');
		setTotalCost('');
		setFinalCost('');
	};

	return (
		<Card className='w-[350px]'>
			<CardHeader>
				<CardTitle>Estimate</CardTitle>
				<CardDescription>Drywall Calculation</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Total Square Footage</Label>
							<Input
								placeholder='enter sqft'
								type='text'
								value={totalSquareFootage}
								onChange={(e) => {
									const value = e.target.value.trim();
									setTotalSquareFootage(value);
									setInputErrors((errors) => ({
										...errors,
										totalSquareFootage:
											value !== '' &&
											(isNaN(parseFloat(value)) || parseFloat(value) <= 0),
									}));
								}}
							/>
							{inputErrors.totalSquareFootage && (
								<p className='text-red-500 text-sm'>
									Invalid value. Please enter a valid number
								</p>
							)}
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Price per sheet</Label>
							<Input
								placeholder='enter price per sheet'
								type='text'
								value={pricePerSheet}
								onChange={(e) => {
									const value = e.target.value.trim();
									setPricePerSheet(value);
									setInputErrors((errors) => ({
										...errors,
										pricePerSheet:
											value !== '' &&
											(isNaN(parseFloat(value)) || parseFloat(value) <= 0),
									}));
								}}
							/>
							{inputErrors.pricePerSheet && (
								<p className='text-red-500 text-sm'>
									Invalid value. Please enter a valid number
								</p>
							)}
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Sheet Size</Label>
							<Select
								onValueChange={(value) => handleSheetChange(value)}
								value={sheetSize}
							>
								<SelectTrigger className=''>
									<SelectValue placeholder='Ft' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='4x8'>4x8</SelectItem>
										<SelectItem value='4x12'>4x12</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>
								Extra/Waste % &#123;change to liking&#125;
							</Label>
							<Input
								placeholder='enter extra'
								type='text'
								value={extraAndWaste}
								onChange={(e) => {
									const value = e.target.value.trim();
									setExtraAndWaste(value);
									setInputErrors((errors) => ({
										...errors,
										extraAndWaste:
											value !== '' &&
											(isNaN(parseFloat(value)) || parseFloat(value) === 0),
									}));
								}}
							/>
							{inputErrors.extraAndWaste && (
								<p className='text-red-500 text-sm'>
									Invalid value. Please enter a valid number
								</p>
							)}
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>
								Tax Rate % &#123;change to own state tax&#125;
							</Label>
							<Input
								placeholder='tax %'
								type='text'
								value={taxRate}
								onChange={(e) => {
									const value = e.target.value.trim();
									setTaxRate(value);
									setInputErrors((errors) => ({
										...errors,
										taxRate:
											value !== '' &&
											(isNaN(parseFloat(value)) || parseFloat(value) < 0),
									}));
								}}
							/>
							{inputErrors.taxRate && (
								<p className='text-red-500 text-sm'>
									Invalid value. Please enter a valid number
								</p>
							)}
						</div>
						<div className='border px-4 py-4 font-mono text-base font-semibold'>
							Number of Sheets:{' '}
							<span className='text-blue-500 font-semibold font-mono text-base'>
								{numberOfSheets}
							</span>
						</div>
						<div className='border px-4 py-4 font-mono text-base font-semibold'>
							Total Cost: ${' '}
							<span className='text-green-500 font-semibold font-mono text-base'>
								{/* {Math.round(totalCost)} */}
								{totalCost}
							</span>
						</div>
						<div className='border px-4 py-4 font-mono text-base font-semibold'>
							Tax Amount: ${' '}
							<span className='text-green-500 font-semibold font-mono text-base'>
								{finalCost}
							</span>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Button onClick={calculateSheetsAndCost}>Calculate</Button>
				<Button onClick={resetForm} className='bg-red-400'>
					Reset
				</Button>
			</CardFooter>
		</Card>
	);
}
