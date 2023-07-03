import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function SignIn() {
	return (
		<Button asChild className='mr-3  sm:flex' size='sm'>
			<Link href='/login'>Login</Link>
		</Button>
	);
}
