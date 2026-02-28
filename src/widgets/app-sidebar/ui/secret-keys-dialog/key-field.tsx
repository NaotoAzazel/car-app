'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button, Icons, Input, Label } from '@/shared/ui'

interface KeyFieldProps {
  label: string
  value: string
}

export function KeyField({ label, value }: KeyFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      toast.success('Ключ скопирован')

      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error('Не удалось скопировать')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label}>{label}</Label>

      <div className="flex gap-1">
        <Input
          id={label}
          type={isVisible ? 'text' : 'password'}
          value={value}
          readOnly
          onClick={handleCopy}
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <Icons.eyeOff className="size-4" />
          ) : (
            <Icons.eye className="size-4" />
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Icons.checkCircle className="size-4" />
          ) : (
            <Icons.copy className="size-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
