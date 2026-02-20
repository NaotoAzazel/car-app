'use client'

import { cn } from '@/shared/lib'

interface DiapasoneButtonProps {
  title: string
  isSelected: boolean
  onClick: () => void
}

export function DiapasoneButton({
  title,
  isSelected,
  onClick,
}: DiapasoneButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-colors h-8 px-3 border items-center rounded-md flex text-sm bg-input/20 whitespace-nowrap',
        isSelected && 'bg-primary text-black',
      )}
    >
      {title}
    </button>
  )
}
