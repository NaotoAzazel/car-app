'use client'

import { useState } from 'react'

import { getRecordById } from '@/entities/record'
import { Button } from '@/shared/ui'

import { ComponentsDialog } from '../components-dialog/components-dialog'
import { ComponentListItem } from './component-list-item'

interface ComponentsContainerProps {
  recordId: number
  components?: NonNullable<
    Awaited<ReturnType<typeof getRecordById>>
  >['RecordsComponents']
}

export function ComponentsContainer({
  recordId,
  components,
}: ComponentsContainerProps) {
  const [componentsList, setComponentsList] = useState(components ?? [])
  const [isComponentsDialogOpen, setIsComponentsDialogOpen] =
    useState<boolean>(false)

  const totalCost = componentsList?.reduce((sum, component) => {
    return sum + component.component.cost
  }, 0)

  return (
    <>
      <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center items-center">
        {componentsList?.length === 0 ? (
          <span className="text-sm text-muted-foreground py-10">
            Компоненты не добавлены
          </span>
        ) : (
          <div className="flex flex-col space-y-4 w-full">
            <div className="grid gap-1">
              {componentsList?.map((component, i) => (
                <ComponentListItem
                  name={component.component.name}
                  cost={component.component.cost}
                  key={i}
                />
              ))}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Общяя сумма</span>
              <span className="font-semibold">{totalCost} UAH</span>
            </div>
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => setIsComponentsDialogOpen(true)}
          type="button"
          className="w-full"
        >
          Добавить
        </Button>
      </div>

      <ComponentsDialog
        isOpen={isComponentsDialogOpen}
        onOpenChange={setIsComponentsDialogOpen}
        initiallySelected={componentsList?.map((rc) => rc.component)}
        onConfirm={(selectedComponents) => {
          setComponentsList((prev) => {
            const newList = prev ? [...prev] : []

            selectedComponents.forEach((component) => {
              const alreadyExists = newList.find(
                (c) => c.componentId === component.id,
              )
              if (!alreadyExists) {
                newList.push({
                  recordId,
                  componentId: component.id,
                  component,
                })
              }
            })

            const filteredList = newList.filter((c) =>
              selectedComponents.some(
                (selected) => selected.id === c.componentId,
              ),
            )

            return filteredList
          })
        }}
      />
    </>
  )
}
