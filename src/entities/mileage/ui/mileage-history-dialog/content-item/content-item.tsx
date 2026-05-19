'use client'

import { useState } from 'react'
import { Mileage } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { cn, formatDate } from '@/shared/lib'
import { Button, Icons } from '@/shared/ui'

import { useDeleteMileage } from '../../../lib'

interface ContentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  mileageItem: Mileage
  diff: number | null
}

export function ContentItem({ mileageItem, diff, ...props }: ContentItemProps) {
  const t = useTranslations('mileage.history-dialog.content-item')

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { deleteMileage, isPending } = useDeleteMileage()

  const { id, createdAt, mileage } = mileageItem

  const handleMileageDelete = async () => {
    try {
      toast.promise(deleteMileage(id), {
        loading: t('deleating-mileage'),
        success: () => {
          setIsOpen(false)
          return t('mileage-deleated')
        },
        error: t('delete-mileage-error'),
      })
    } catch (error) {
      console.error('ContentItem', error)
    }
  }

  return (
    <div {...props} className="rounded-md border mt-1 overflow-hidden">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer p-2 px-4 flex justify-between hover:bg-accent transition-colors items-center"
      >
        <div className="flex flex-row gap-1 items-center">
          <p className="font-heading font-medium">{mileage}</p>
          {diff !== null && (
            <div className="flex flex-row text-muted-foreground items-center">
              <Icons.arrowUp className="size-4" />
              <span className="text-sm">{diff}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {formatDate(createdAt)}
        </span>
      </div>

      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden border-t bg-muted/30">
          <div className="flex justify-end gap-2 p-2">
            <Button variant="outline" size="sm" disabled>
              {t('edit-mileage')}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={handleMileageDelete}
            >
              {isPending && <Icons.loader className="size-4 animate-spin" />}
              {t('delete-mileage')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
