'use client';
import { useState, ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
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

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TileCalculator: React.FC = () => {
	const [length, setLength] = useState<number | null>(null);
	const [width, setWidth] = useState<number | null>(null);
	const [diameter, setDiameter] = useState<number | null>(null);
	const [isInches, setIsInches] = useState<boolean>(true);
	const [isInches2, setIsInches2] = useState<boolean>(true);
	const [coverage, setCoverage] = useState<number>(0);
	const [tileArea, setTileArea] = useState<number>(0);
	const [tileCount, setTileCount] = useState<number>(0);
	const [overage, setOverage] = useState<number>(0);
	const [totalTiles, setTotalTiles] = useState<number>(0);
	const [circleCoverage, setCircleCoverage] = useState<number>(0);

	const [costPerTile, setCostPerTile] = useState<number>(0);
	const [customTileCost, setCustomTileCost] = useState<number>(0);
	const [totalCost, setTotalCost] = useState<number>(0);

	// for alert display
	const [isCalculated, setIsCalculated] = useState<boolean>(false);

	//had to do it this way to enter decimal values
	const handleChangeLength = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		setLength(isNaN(value) ? null : value);
	};

	const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		setWidth(isNaN(value) ? null : value);
	};

	const handleChangeDiameter = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		setDiameter(isNaN(value) ? null : value);
	};

	// const calculateSquareCoverage = () => {
	// 	const totalCoverage = (
	// 		(isInches ? length * width : length * width * 144) / 144
	// 	).toFixed(2);
	// 	setCoverage(parseFloat(totalCoverage));
	// };

	const calculateSquareCoverage = () => {
		if (length !== null && width !== null) {
			const totalCoverage =
				((isInches ? length : length * 12) * (isInches ? width : width * 12)) /
				144;
			setCoverage(parseFloat(totalCoverage.toFixed(2)));
		}
	};
	const calculateRoundCoverage2 = () => {
		if (diameter !== null) {
			const radius = isInches2 ? diameter / 2 : (diameter / 2) * 12;
			const totalCoverage = Math.ceil(radius * radius * Math.PI);
			setCircleCoverage(totalCoverage);
		}
	};

	const calculateTileCount = () => {
		if (coverage === 0 || tileArea === 0) {
			// Display an error or show a message indicating that the coverage and tile area must be calculated first
			setIsCalculated(false); // Set isCalculated to false
			console.log('Please calculate coverage and tile area first.');
			return;
		}

		const tilesNeeded = Math.ceil(coverage / tileArea);
		setTileCount(tilesNeeded);
		setIsCalculated(true); // Set isCalculated to true
	};

	const calculateTotalTiles = () => {
		const adjustedCoverage = coverage * (1 + overage / 100);
		const totalTilesNeeded = Math.ceil(adjustedCoverage / tileArea);
		setTotalTiles(totalTilesNeeded);
	};

	const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsInches(event.target.value === 'inches');
	};
	const handleUnitChange2 = (event: ChangeEvent<HTMLInputElement>) => {
		setIsInches2(event.target.value === 'inches');
	};

	// works but cannot input decimals
	const handleCustomTileCostChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCustomTileCost(parseFloat(event.target.value));
	};

	// trying out different function to allow user to enter decimals on cost/ works on chrome but safari cant seem to enter decimals
	const handleCustomTileCostChange2 = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const parsedValue = parseFloat(value);

		if (!isNaN(parsedValue) || value === '') {
			setCustomTileCost(parsedValue);
		}
	};

	const calculateTotalCost = () => {
		const cost = totalTiles * customTileCost;
		setTotalCost(cost);
	};

	const resetCalculator = () => {
		setLength(null);
		setWidth(null);
		setDiameter(null);
		setIsInches(true);
		setIsInches2(true);
		setCoverage(0);
		setTileArea(0);
		setTileCount(0);
		setOverage(0);
		setTotalTiles(0);
		setCircleCoverage(0);
		setCostPerTile(0);
		setCustomTileCost(0);
		setTotalCost(0);
	};

	return (
		<Card className='w-[440px]'>
			<CardHeader>
				<CardTitle>Estimate</CardTitle>
				<CardDescription>Tile Calculation</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid w-full items-center gap-4'>
					<h3>Square or Rectangular Area</h3>
					<label>
						<input
							type='radio'
							value='inches'
							checked={isInches}
							onChange={handleUnitChange}
							className='w-4 h-4 mr-1 text-sm'
						/>
						Inches
					</label>
					<label>
						<input
							type='radio'
							value='feet'
							checked={!isInches}
							onChange={handleUnitChange}
							className='w-4 h-4 mr-1 text-sm'
						/>
						Feet
					</label>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>Length</Label>
						<Input
							type='number'
							step='any'
							placeholder='enter length'
							value={length !== null ? length : ''}
							onChange={handleChangeLength}
						/>
					</div>
					<div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Width</Label>
							<Input
								type='number'
								step='any'
								placeholder='enter width'
								value={width !== null ? width : ''}
								onChange={handleChangeWidth}
							/>
						</div>
					</div>
					<Button onClick={calculateSquareCoverage}>Calculate Coverage</Button>

					{coverage > 0 && (
						<>
							<div>
								<h3 className='mb-1'>Tile Coverage</h3>
								<div className='border px-4 py-4 font-mono font-semibold text-base'>
									<h2 className='text-blue-500 font-semibold font-mono text-base'>
										{coverage} square feet
									</h2>
								</div>
							</div>
							<div>
								<div className='flex flex-col space-y-1.5'>
									<div className='flex flex-row'>
										<Label htmlFor='name' className='mt-1 mr-3'>
											Tile Area &#123; in square inches &#125;:
										</Label>
										<Popover>
											<PopoverTrigger asChild>
												<InformationCircleIcon className='h-5 w-5'>
													<Button variant='outline'>Open popover</Button>
												</InformationCircleIcon>
											</PopoverTrigger>
											<PopoverContent className='w-80'>
												<div className='grid gap-4'>
													<div className='space-y-2'>
														<h4 className='font-medium leading-none'>
															Square inches = width x length
														</h4>
														<p className='text-sm text-muted-foreground'>
															You can calculate the square inches of an area by
															measuring the length and width in inches.
														</p>
													</div>
												</div>
											</PopoverContent>
										</Popover>
									</div>
									{!isCalculated && (
										<Alert variant={'destructive'}>
											<AlertTitle>Heads up!</AlertTitle>
											<AlertDescription>
												Please enter tile area first, do not leave blank or 0
											</AlertDescription>
										</Alert>
									)}

									<Input
										type='number'
										step='any'
										value={tileArea}
										onChange={(e) => setTileArea(parseInt(e.target.value))}
									/>
								</div>
							</div>
							{/*// Render the tile count calculation button conditionally */}
							{coverage > 0 && tileArea > 0 && (
								<Button onClick={calculateTileCount}>
									Calculate Tile Count
								</Button>
							)}
							{tileCount > 0 && (
								<>
									<div className='flex flex-col space-y-1.5'>
										<Label>Overage/Material Waste (%):</Label>
										<Input
											type='number'
											step='any'
											value={overage}
											onChange={(e) => setOverage(parseInt(e.target.value))}
										/>
									</div>
									<Button onClick={calculateTotalTiles}>
										Calculate Total Tiles
									</Button>

									{totalTiles > 0 && (
										<div className='border px-4 py-4 font-mono text-base font-semibold'>
											Total Tiles Needed: {''}
											<span className='text-blue-500 font-semibold font-mono text-base'>
												{totalTiles}
											</span>
										</div>
									)}
								</>
							)}
							{totalTiles > 0 && (
								<>
									<div className='flex flex-col space-y-3'>
										<Label htmlFor='customTileCost'>Custom Tile Cost $:</Label>
										{/* <Input
											type='number'
											step='any'
											id='customTileCost'
											value={customTileCost}
											onChange={handleCustomTileCostChange}
										/> */}
										<Input
											type='number'
											step='any'
											id='customTileCost'
											value={
												customTileCost !== null ? customTileCost.toString() : ''
											}
											onChange={handleCustomTileCostChange2}
										/>

										<Button onClick={calculateTotalCost}>
											Calculate Total Cost
										</Button>
									</div>
									<div className='border px-4 py-4 font-mono text-base font-semibold'>
										Total Cost: {''}
										<span className='text-green-500 font-semibold font-mono text-base'>
											${totalCost}
										</span>
									</div>
								</>
							)}
						</>
					)}
					<h3>Round Area</h3>
					<label>
						<input
							type='radio'
							value='inches'
							checked={isInches2}
							onChange={handleUnitChange2}
							className='w-4 h-4 mr-1 text-sm'
						/>
						Inches
					</label>
					<label>
						<input
							type='radio'
							value='feet'
							checked={!isInches2}
							onChange={handleUnitChange2}
							className='w-4 h-4 mr-1 text-sm'
						/>
						Feet
					</label>
					<div className='flex flex-col space-y-1.5'>
						<Label>Diameter:</Label>
						<Input
							type='number'
							step='any'
							placeholder='enter diameter'
							value={diameter !== null ? diameter : ''}
							onChange={handleChangeDiameter}
						/>
					</div>
					<Button onClick={calculateRoundCoverage2}>Calculate Coverage</Button>
					{circleCoverage > 0 && (
						<div>
							<h3 className='mb-1'>Tile Coverage</h3>
							<div className='border px-4 py-4 font-mono font-semibold text-base'>
								<h2 className='text-blue-500 font-semibold font-mono text-base'>
									{circleCoverage} square feet
								</h2>
							</div>
						</div>
					)}
					<Button onClick={resetCalculator} className='bg-red-400'>
						Reset
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default TileCalculator;
