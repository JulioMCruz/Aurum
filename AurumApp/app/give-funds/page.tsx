import HeaderComponent from "@/components/Header";
import GiveFunds from "@/components/GiveFunds";
import { Suspense } from 'react'

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <GiveFunds />
      </Suspense>
    </div>    
  );
}
