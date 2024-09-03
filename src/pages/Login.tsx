// pages/auth/login.tsx
import React from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const LoginPage = async () => {
    const session = await getSession();
    console.log("session",session);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return (
        <div>
            Login
        </div>
    );
};

export default LoginPage;
