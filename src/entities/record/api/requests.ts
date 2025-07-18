'use client'

import axios from 'axios'

import { CreateRecordRequest, UpdateRecordRequest } from '../model'

export async function createRecordRequest(record: CreateRecordRequest) {
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

export async function updateRecordByIdRequest(record: UpdateRecordRequest) {
  try {
    const response = await axios.patch(`/api/record/${record.id}`, record, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error updateRecordById:', error)
    throw error
  }
}
