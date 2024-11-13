import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { AppWrapper } from '@/layout/AppWrapper';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning style={{ overflow: 'hidden' }}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <AppWrapper>
                        <LayoutProvider>
                            {children}
                        </LayoutProvider>
                    </AppWrapper>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
