import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center my-10 px-4'>
            
            <p className='font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 text-center'>
                404
            </p>
                
            <p className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 md:mb-8 text-center'>
                Page Not Found
            </p>
            
            <p className='text-lg sm:text-xl md:text-2xl lg:text-4xl mb-6 md:mb-8 text-center max-w-2xl px-4'>
                The page you're looking for is not available
            </p>

            <Link href={'/'}>
                <Button 
                    className='bg-green-600 text-white' 
                    size="lg"
                >
                    Back To Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;