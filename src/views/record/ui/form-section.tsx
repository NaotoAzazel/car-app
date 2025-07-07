import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="flex w-full flex-col space-y-4">
      <p className="text-xl font-heading">{title}</p>
      {children}
    </div>
  )
}
