import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<SignIn
				appearance={{ variables: { colorPrimary: '#000' } }}
				afterSignInUrl='/'
			/>
		</main>
	);
}
