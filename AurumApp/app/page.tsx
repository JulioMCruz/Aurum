'use client';

import HeaderComponent from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Landing from "@/components/Landing";
import { useAccount} from 'wagmi'

export default function Home() {

  const { address } = useAccount()

  return (
    <div>
      <HeaderComponent />
      {address ? <Dashboard /> : <Landing />}
    </div>    
  );
}
