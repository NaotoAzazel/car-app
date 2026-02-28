import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui'

import { SecretKeysDialogContent } from './secret-keys-dialog-content'

export function SecretKeysDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['secret-keys'],
    queryFn: async () => {
      const response = await axios.get('/api/keys')
      return response.data
    },
    enabled: isOpen,
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Секретные ключи</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Секретные ключи</DialogTitle>
          <DialogDescription>
            Секретные ключи для доступа к API.
          </DialogDescription>
        </DialogHeader>

        <SecretKeysDialogContent
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  )
}
