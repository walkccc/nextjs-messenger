import { Navigation } from '@/components/skeleton/navigation';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  return <Navigation>{children}</Navigation>;
};

export default UsersLayout;
