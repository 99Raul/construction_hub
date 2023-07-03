'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const SHEET_SIDES = ['left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SideMenu() {
	return (
		<div className=''>
			{SHEET_SIDES.map((side) => (
				<Sheet key={side}>
					<SheetTrigger asChild>
						<Button variant='ghost' size='default' className='sm:hidden '>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side={side}>
						<SheetHeader>
							<SheetTitle>Construction hub</SheetTitle>
						</SheetHeader>
						<div className='pl-1 mt-4'>
							<Accordion type='single' collapsible className='w-full'>
								<AccordionItem value='item-1'>
									<AccordionTrigger className='text-sm'>
										Invoices
									</AccordionTrigger>
									<AccordionContent className='text-sm'>
										invoice content
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-2'>
									<AccordionTrigger className='text-sm'>
										Proposals
									</AccordionTrigger>
									<AccordionContent className='text-sm'>
										Proposal content
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-3'>
									<AccordionTrigger className='text-sm'>
										Contracts
									</AccordionTrigger>
									<AccordionContent className='text-sm'>
										Contract content
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-4'>
									<AccordionTrigger className='text-sm'>
										Projects
									</AccordionTrigger>
									<AccordionContent className='text-sm'>
										Project Content
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-5'>
									<AccordionTrigger className='text-sm'>
										Customers
									</AccordionTrigger>
									<AccordionContent className='text-sm'>
										Customer content
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								{/* <Button type='submit'>Save changes</Button> */}
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			))}
		</div>
	);
}
