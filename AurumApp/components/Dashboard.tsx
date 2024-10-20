/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Mic } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';

export default function Component() {

  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [aiResponse, setAiResponse] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter();
  const handleSendVoice = async () => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setAiResponse(data);

      // Parse the response and extract amount and symbol
      const [amountStr, symbolStr] = data.response.split(',');
      const amount = amountStr.split('=')[1];
      const symbol = symbolStr.split('=')[1];

      // Navigate to the give-funds page with query parameters
      router.push(`/give-funds?amount=${amount}&currency=${symbol}`);

      console.log(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setMessage('');
    setIsOpen(false);
  }

  return (
    <div className="flex items-center justify-center py-16 text-white p-4">
      <div className="w-full max-w-md space-y-6 mx-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Vitalik Buterin</h1>
            <p className="text-sm text-gray-400">Wallet Balance</p>
            <p className="text-4xl font-bold">$23,000</p>
            <p className="text-sm text-orange-400">3 currencies</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <p className="text-sm text-gray-400 mt-2">Bangkok, Thailand</p>
          </div>
        </div>
        <div className="flex space-x-4">
      
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">GIVE</Button>
        </DrawerTrigger>
        <DrawerContent className="h-[200px]">
          <div className="p-4 bg-white rounded-t-2xl shadow-lg px-16">
            <h2 className="text-lg font-semibold mb-4">Send Voice Message</h2>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow text-black"
              />
              <Button onClick={handleSendVoice} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Mic className="w-4 h-4 mr-2" />
                Send Voice
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Response</DialogTitle>
            <DialogDescription>
              {aiResponse ? JSON.stringify(aiResponse, null, 2) : 'No response yet.'}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>      

      <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">RECEIVE</Button>
      
        </div>
        <div className="space-y-4">
          <CryptoCard name="Bitcoin" amount={7302} percentage={32} color="from-green-400 to-green-600" />
          <CryptoCard name="Solona" amount={7302} percentage={40} color="from-blue-400 to-indigo-600" />
          <CryptoCard name="Ethereum" amount={7302} percentage={40} color="from-orange-400 to-orange-600" />
        </div>
      </div>
    </div>
  )
}

function CryptoCard({ name, amount, percentage, color }: { name: string; amount: number; percentage: number; color: string }) {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-r ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-2xl font-bold">${amount.toLocaleString()}</p>
        </div>
        <p className="text-sm">{percentage}% of portfolio</p>
      </div>
      <div className="mt-2 bg-white bg-opacity-30 h-2 rounded-full">
        <div className="bg-white h-full rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
