//import { Button } from "@/components/ui/button"
import Image from "next/image"
//import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Component() {

  //const { setShowAuthFlow } = useDynamicContext();
  
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-4 my-16">
      <div className="w-full max-w-md space-y-8">
        <div className="relative aspect-square w-full max-w-[300px] mx-auto items-center">
          {/* <Image
            src="/images/Aurum.png"
            alt="Golden glowing globe"
            className="w-full h-full object-cover"
          /> */}
            <Image src="/images/AurumLanding.png" alt={`Aurum logo`} width={350} height={350} className="h-fit rounded-lg" />

        </div>
        <h1 className="text-5xl font-bold text-center">AURUM</h1>
        <p className="text-xl text-center">Let&apos;s Connect!</p>
        <div className="space-y-4">

        {/* {
        !isLoggedIn && (
                <Button colorScheme="purple" onClick={() => setShowAuthFlow(true)}>
                Sign Up or Sign In
                </Button>
            )
        } */}

          {/* <Button className="w-full text-lg py-6" size="lg" onClick={() => setShowAuthFlow(true)}>
            SIGN IN
          </Button> */}
          
          {/* 
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              CREATE ACCOUNT
            </a>
          </p> */}
        </div>
      </div>
    </div>
  )
}