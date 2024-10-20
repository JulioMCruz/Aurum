import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex items-center justify-center py-16 text-white">
      <div className="w-full max-w-md space-y-6  rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approve Transaction</h2>
        </div>
        <div className="h-24 bg-gradient-to-r from-[#f5a88e] to-[#7accc0] rounded-lg" />
        <div className="space-y-2 text-center">
          <p className="text-4xl font-bold">- 1000.00 USDC</p>
          <p className="text-xl text-gray-400">(33150.98 THB)</p>
        </div>
        <Button className="w-full text-xl py-6 bg-indigo-600 hover:bg-indigo-700" size="lg">
          APPROVE
        </Button>
        <p className="text-center text-sm text-gray-400">
          THIS ACTION CANNOT BE REVERSED.
        </p>
      </div>
    </div>
  )
}