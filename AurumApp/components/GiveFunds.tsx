'use client'

import { Badge } from "@/components/ui/badge"
import { useSearchParams } from 'next/navigation'

export default function GiveFunds() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')
  const currency = searchParams.get('currency')

  return (
    <div className="flex items-center justify-center py-16 text-white">
      <div className="w-full max-w-md space-y-6 mx-8">
        <h2 className="text-2xl font-bold">Give Funds</h2>
        <div className="h-24 bg-gradient-to-r from-[#f5a88e] to-[#7accc0] rounded-lg" />
        <div className="px-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">- {amount} {currency?.toUpperCase()}</h1>
            <p className="text-sm text-gray-400 uppercase">Requested</p>
          </div>
          <h2 className="text-xl font-semibold">SELECT PAYMENT OPTION</h2>
          <div className="space-y-4">
            <PaymentOption amount="1000.00" currency="USDC" color="bg-green-500" />
            <PaymentOption amount="6.44122" currency="SOL" color="bg-teal-500" />
            <PaymentOption amount="0.00038" currency="ETH" color="bg-orange-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentOption({ amount, currency, color }: { amount: string; currency: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xl font-medium">- {amount}</span>
      <Badge className={`${color} text-white px-3 py-1 text-sm font-medium w-20 flex justify-center`}>
        {currency}
      </Badge>
    </div>
  )
}
