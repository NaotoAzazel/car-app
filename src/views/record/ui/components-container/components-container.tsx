'use client'

import { useState } from 'react'
import { Components } from '@prisma/client'

import { RecordsComponentWithData } from '@/entities/record'
import { Button } from '@/shared/ui'

import { ComponentsDialog } from '../components-dialog/components-dialog'
import { ComponentsList } from './components-list'

interface ComponentsContainerProps {
  recordId: number
  value: RecordsComponentWithData[]
  onChange: (components: RecordsComponentWithData[]) => void
  disabled: boolean
}

export function ComponentsContainer({
  recordId,
  value,
  disabled,
  onChange,
}: ComponentsContainerProps) {
  const [isComponentsDialogOpen, setIsComponentsDialogOpen] =
    useState<boolean>(false)

  const onConfirm = (selectedComponents: Components[]) => {
    const newList = selectedComponents.map((component) => ({
      recordId,
      componentId: component.id,
      component,
    }))
    onChange(newList)
  }

  return (
    <>
      <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center items-center">
        <ComponentsList components={value} />
        <Button
          variant="outline"
          onClick={() => setIsComponentsDialogOpen(true)}
          type="button"
          className="w-full"
          disabled={disabled}
        >
          Добавить
        </Button>
      </div>

      <ComponentsDialog
        isOpen={isComponentsDialogOpen}
        onOpenChange={setIsComponentsDialogOpen}
        initiallySelected={value?.map((rc) => rc.component)}
        onConfirm={(selectedComponents) => onConfirm(selectedComponents)}
      />
    </>
  )
}
