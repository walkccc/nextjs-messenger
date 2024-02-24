import { getUsers } from '@/actions/get-users';
import { Navigation } from '@/components/skeleton/navigation';

import { UserList } from './_components/user-list';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  const users = await getUsers();

  return (
    <Navigation>
      <UserList users={users} />
      {children}
    </Navigation>
  );
};

export default UsersLayout;
