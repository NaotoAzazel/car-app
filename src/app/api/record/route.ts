import { createRecord, createRecordSchema } from '@/entities/record'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsedJson = {
      ...json,
      createdAt: new Date(json.createdAt),
    }

    const body = createRecordSchema.parse(parsedJson)

    const createdRecord = await createRecord(body)

    return Response.json(
      { message: 'Record created successfully', record: createdRecord },
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
