'use client';

import React, { useState } from 'react';

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

const FlooringCalculator: React.FC = ({}) => {
	const [length, setLength] = useState<string>('');
	const [width, setWidth] = useState<string>('');
	const [wastePercent, setWastePercent] = useState<string>('');
	const [tileLength, setTileLength] = useState<string>('');
	const [tileWidth, setTileWidth] = useState<string>('');
	const [tilesPerBox, setTilesPerBox] = useState<string>('');
	const [reset, setReset] = useState<boolean>(false);
	const [totalTilesNeeded, setTotalTilesNeeded] = useState<number>(0);
	const [boxesNeeded, setBoxesNeeded] = useState<number>(0);
	const [inputErrors, setInputErrors] = useState<Record<string, boolean>>({
		length: false,
		width: false,
		wastePercent: false,
		tileLength: false,
		tileWidth: false,
		tilesPerBox: false,
	});

	const calculateFlooring = () => {
		const area = Number(length) * Number(width);
		const tileSizeArea = Number(tileLength) * Number(tileWidth);

		if (isNaN(area) || isNaN(tileSizeArea)) {
			// Display error for NaN values
			setInputErrors({
				length: isNaN(Number(length)),
				width: isNaN(Number(width)),
				wastePercent: isNaN(Number(wastePercent)),
				tileLength: isNaN(Number(tileLength)),
				tileWidth: isNaN(Number(tileWidth)),
				tilesPerBox: isNaN(Number(tilesPerBox)),
			});
			return;
		}

		if (tileSizeArea !== 0) {
			const flooringNeeded = area / tileSizeArea;
			const calculatedTotalTilesNeeded = Math.ceil(
				flooringNeeded * (1 + Number(wastePercent) / 100)
			);
			const calculatedBoxesNeeded = Math.ceil(
				calculatedTotalTilesNeeded / Number(tilesPerBox)
			);
			setTotalTilesNeeded(calculatedTotalTilesNeeded);
			setBoxesNeeded(calculatedBoxesNeeded);
		} else {
			setTotalTilesNeeded(0);
			setBoxesNeeded(0);
		}
		setReset(false);
		setInputErrors({});
	};

	const resetFields = () => {
		setLength('');
		setWidth('');
		setWastePercent('');
		setTileLength('');
		setTileWidth('');
		setTilesPerBox('');
		setReset(true);
		setInputErrors({});
		setTotalTilesNeeded(0); // Reset the output values
		setBoxesNeeded(0); // Reset the output values
	};

	return (
		<Card className='w-[380px]'>
			<CardHeader>
				<CardTitle>Calculator</CardTitle>
				<CardDescription>Flooring Calculation</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid w-full items-center gap-4'>
					<div className='flex flex-col space-y-1.5'>
						<Label>Area Length:</Label>
						<Input
							type='text'
							value={length}
							onChange={(e) => setLength(e.target.value)}
						/>
						{inputErrors.length && (
							<p className='text-red-500'>Please enter a valid number</p>
						)}
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label>Area Width:</Label>
						<Input
							type='text'
							value={width}
							onChange={(e) => setWidth(e.target.value)}
						/>
						{inputErrors.width && (
							<p className='text-red-500'>Please enter a valid number</p>
						)}
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label>Floor Tile Length (inches):</Label>
						<Input
							type='text'
							value={tileLength}
							onChange={(e) => setTileLength(e.target.value)}
						/>
						{inputErrors.tileLength && (
							<p className='text-red-500'>Please enter a valid number</p>
						)}
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label>Floor Tile Width (inches):</Label>
						<Input
							type='text'
							value={tileWidth}
							onChange={(e) => setTileWidth(e.target.value)}
						/>
						{inputErrors.tileWidth && (
							<p className='text-red-500'>Please enter a valid number</p>
						)}
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label>Tiles per Box:</Label>
						<Input
							type='text'
							value={tilesPerBox}
							onChange={(e) => setTilesPerBox(e.target.value)}
						/>
						{inputErrors.tilesPerBox && (
							<p className='text-red-500'>Please enter a valid number</p>
						)}
					</div>

					<div className='border px-4 py-4 font-mono font-semibold text-base'>
						<strong>Total Boxes Needed:</strong>
						<span className='text-blue-500 font-semibold font-mono text-base ml-2'>
							{boxesNeeded}
						</span>
					</div>

					<div className='border px-4 py-4 font-mono font-semibold text-base'>
						<strong>Single Floor Tile Needed:</strong>{' '}
						<span className='text-blue-500 font-semibold font-mono text-base '>
							{totalTilesNeeded}
						</span>
					</div>
					<Button onClick={calculateFlooring}>Calculate</Button>
					<Button onClick={resetFields} className='bg-red-400'>
						Reset
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default FlooringCalculator;
