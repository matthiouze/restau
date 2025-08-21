import FrontHeader from '@/components/front/front-header';
import FrontFooter from '@/components/front/front-footer';

export default function FrontLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <FrontHeader />
            {children}
            <FrontFooter />
        </>
    );
}


