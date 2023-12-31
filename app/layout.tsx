// import { Footer, Navbar } from '@/components';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Manage your project',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={inter.className}>
					<div>
						<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
							<Navbar />
							<main className='flex min-h-screen w-full flex-col items-center justify-center py-32 '>
								{children}
							</main>
							<Footer />
						</ThemeProvider>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
