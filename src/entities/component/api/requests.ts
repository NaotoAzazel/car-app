import { Components } from '@prisma/client'
import axios from 'axios'

import { CreateComponentSchema } from '../model'

export async function createComponentRequest(component: CreateComponentSchema) {
  try {
    const response = await axios.post('/api/component', component, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error createComponentRequest:', error)
    throw error
  }
}

export async function deleteComponentByIdRequest(id: Components['id']) {
  try {
    const response = await axios.delete(`/api/component/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleteComponentByIdRequest:', error)
    throw error
  }
}
