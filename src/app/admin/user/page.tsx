import UsersTable from '../../../modules/admin/pages/UsersTable'

export default async function Home() {
  let data = await fetch("http://localhost:8003/api/v1/user?skip=0&limit=286");
  let users = await data.json();

  return (
    <div className='w-2/3 mx-auto'>
      <UsersTable users={users} />
    </div>
  );
}

