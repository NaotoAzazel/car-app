import { ZodError } from 'zod'

import { deleteComponentById } from '@/entities/component'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id

    await deleteComponentById(Number(id))

    return Response.json(
      { message: 'Component deleted successfully' },
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
