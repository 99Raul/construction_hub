'use client';
import { useState, ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const TileCalculator: React.FC = () => {
	const [length, setLength] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [diameter, setDiameter] = useState<number>(0);
	const [isInches, setIsInches] = useState<boolean>(true);
	const [isInches2, setIsInches2] = useState<boolean>(true);
	const [coverage, setCoverage] = useState<number>(0);
	const [tileArea, setTileArea] = useState<number>(0);
	const [tileCount, setTileCount] = useState<number>(0);
	const [overage, setOverage] = useState<number>(0);
	const [totalTiles, setTotalTiles] = useState<number>(0);
	const [circleCoverage, setCircleCoverage] = useState<number>(0);

	const calculateSquareCoverage = () => {
		const totalCoverage = (
			(isInches ? length * width : length * width * 144) / 144
		).toFixed(2);
		setCoverage(parseFloat(totalCoverage));
	};

	// const calculateRoundCoverage = () => {
	// 	const radius = isInches ? diameter / 2 : (diameter / 2) * 12;
	// 	const totalCoverage = Math.ceil(radius * radius * Math.PI);
	// 	setCoverage(totalCoverage);
	// };

	const calculateRoundCoverage2 = () => {
		const radius = isInches2 ? diameter / 2 : (diameter / 2) * 12;
		const totalCoverage = Math.ceil(radius * radius * Math.PI);
		setCircleCoverage(totalCoverage);
	};

	const calculateTileCount = () => {
		const tilesNeeded = Math.ceil(coverage / tileArea);
		setTileCount(tilesNeeded);
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
							value={length}
							onChange={(e) => setLength(parseInt(e.target.value))}
						/>
					</div>
					<div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Width</Label>
							<Input
								type='number'
								value={width}
								onChange={(e) => setWidth(parseInt(e.target.value))}
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
									<Label htmlFor='name'>
										Tile Area &#123; in square inches &#125;:
									</Label>
									<Input
										type='number'
										value={tileArea}
										onChange={(e) => setTileArea(parseInt(e.target.value))}
									/>
								</div>
							</div>
							<Button onClick={calculateTileCount}>Calculate Tile Count</Button>

							{tileCount > 0 && (
								<>
									<div className='flex flex-col space-y-1.5'>
										<Label>Overage/Material Waste (%):</Label>
										<Input
											type='number'
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
							value={diameter}
							onChange={(e) => setDiameter(parseInt(e.target.value))}
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
				</div>
			</CardContent>
		</Card>
	);
};

export default TileCalculator;
