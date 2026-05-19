import { useState } from 'react'
import { Component } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { RecordSchema } from '@/entities/record'
import { Button } from '@/shared/ui'

import { ComponentsDialog } from '../components-dialog/components-dialog'
import { ComponentsList } from './components-list'

interface ComponentContainerProps {
  value: RecordSchema['recordsToComponents']
  onChange: (components: RecordSchema['recordsToComponents']) => void
  disabled: boolean
  recordId: number
}

export function ComponentsContainer({
  value,
  onChange,
  disabled,
  recordId,
}: ComponentContainerProps) {
  const t = useTranslations('record.overviewForm.componentsContainer')

  const [isComponentsDialogOpen, setIsComponentsDialogOpen] =
    useState<boolean>(false)

  const onConfirm = (selectedComponents: Component[]) => {
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
          {t('add-or-change')}
        </Button>

        <ComponentsDialog
          isOpen={isComponentsDialogOpen}
          onOpenChange={setIsComponentsDialogOpen}
          initiallySelected={value?.map((item) => item.component) || []}
          onConfirm={(selectedComponents) => onConfirm(selectedComponents)}
        />
      </div>
    </>
  )
}
