import { ZodError } from 'zod'

import { createComponent, createComponentSchema } from '@/entities/component'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = createComponentSchema.parse(json)

    await createComponent({
      ...body,
      cost: Number(body.cost),
    })

    return Response.json(
      { message: 'Component created successfully' },
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
