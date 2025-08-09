import { ZodError } from 'zod'

import {
  deleteRecordById,
  getRecordById,
  updateRecordById,
  updateRecordSchema,
} from '@/entities/record'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id

    const json = await request.json()
    const parsedJson = {
      ...json,
      createdAt: new Date(json.createdAt),
    }

    const data = updateRecordSchema.parse(parsedJson)

    const isRecordExists = await getRecordById(Number(id))
    if (!isRecordExists) {
      return Response.json(
        { message: 'Record with this id not found' },
        { status: 409 },
      )
    }

    await updateRecordById(Number(id), data)

    return Response.json(
      { message: 'Record updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      const a = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return Response.json({ message: a }, { status: 422 })
    }

    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 })
    }

    return Response.json({ message: 'Unknown error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id

    const isRecordExists = await getRecordById(Number(id))
    if (!isRecordExists) {
      return Response.json(
        { message: 'Record with this id not found' },
        { status: 409 },
      )
    }

    await deleteRecordById(Number(id))

    return Response.json(
      { message: 'Record deleted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 })
    }

    return Response.json({ message: 'Unknown error' }, { status: 500 })
  }
}
