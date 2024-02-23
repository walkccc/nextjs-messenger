'use client';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-tr from-sky-200 to-sky-600">
      {children}
    </div>
  );
};

export default AuthLayout;
