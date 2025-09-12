import { useEffect, useState } from 'react'

import './App.css'
import NavBar from './Nav'
import User_Table from './User_Table'
import Heart_Rate_Graph from './graphs/Heart_Rate_Graph'
import Sleep_Graph from './graphs/Sleep_Graph'
import Steps_Graph from './graphs/Steps_Graph'




type User = {
  user_id: string;
};





function App() {

  const API_BASE = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const res = await fetch(`/api/users`, {
          signal: controller.signal,
        });
        const data = await res.json();
        console.log("Fetched data: ", data)
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("User fetching error: ", err);
        }
      }
    };

    loadUsers();

    return () => controller.abort(); // cleanup if unmounted
  }, []);

  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavBar/>
        <User_Table/>
        <Sleep_Graph/>
        <Heart_Rate_Graph/>
        {users.map(u => (<div key={u.user_id}>{u.user_id}</div>))}

        <Steps_Graph/>
        
      </main>
    </>
  )
}

export default App
