'use client';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-tr">
      {children}
    </div>
  );
};

export default AuthLayout;
