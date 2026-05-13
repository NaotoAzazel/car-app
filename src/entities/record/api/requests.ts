'use client'

import { Record } from '@prisma/client'
import axios from 'axios'

export async function deleteRecordByIdRequest(id: Record['id']) {
  try {
    const response = await axios.delete(`/api/record/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error deleteRecordByIdRequest:', error)
    throw error
  }
}
