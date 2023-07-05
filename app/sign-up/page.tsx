import { SignUp } from '@clerk/nextjs';

export default function SignInPage() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<SignUp
				afterSignUpUrl='/'
				appearance={{ variables: { colorPrimary: '#000' } }}
			/>
		</main>
	);
}
