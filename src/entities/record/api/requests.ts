'use client'

import axios from 'axios'

import { CreateRecordParam } from './actions'

export async function createRecordRequest(record: CreateRecordParam) {
  try {
    const response = await axios.post('/api/record', record, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error createRecordRequest:', error)
    throw error
  }
}
