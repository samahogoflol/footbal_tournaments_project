import { createClient } from '@/src/utils/utils/supabase';
import UsersListClient from './users-list-client';

export default async function UsersPage() {
  const supabase = await createClient();
  
  const { data: users } = await supabase
    .from('profiles')
    .select('id, username, full_name, total_points, email')
    .order('total_points', { ascending: false }); // Сортуємо за очками (якщо це лідерборд)

  return <UsersListClient initialUsers={users || []} />;
}