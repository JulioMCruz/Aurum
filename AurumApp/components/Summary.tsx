//import { PaperPlaneIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="flex items-center justify-center text-white p-4 py-16">
      <div className="w-full max-w-md space-y-6 rounded-lg p-6">
        <h2 className="text-2xl font-bold">Transaction Summary</h2>
        <div className="h-16 bg-gradient-to-r from-[#f5a88e] to-[#7accc0] rounded-lg" />
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            {/* <PaperPlaneIcon className="h-16 w-16 text-blue-500" /> */}
            {/* <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">$</span>
            </div> */}
          </div>
          <p className="text-lg font-semibold text-green-400">Transaction SUCCESSFULLY completed!</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">SENT</p>
            <p className="text-lg font-semibold">1000 USDC</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">FROM WALLET</p>
            <p className="text-lg font-semibold">0xabc987qrz...</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">TIME</p>
            <p className="text-lg font-semibold">9:56am GMT+7</p>
          </div>
        </div>
      </div>
    </div>
  )
}