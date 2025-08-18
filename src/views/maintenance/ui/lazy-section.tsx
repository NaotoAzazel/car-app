import { useState } from 'react'
import { RecordTags } from '@prisma/client'

import { useIntersection } from '@/shared/lib'

import { ItemSection } from './item-section'
import { MaintenanceCard } from './maintenance-card/maintenance-card'

interface LazySectionProps {
  title: string
  tags: RecordTags[]
  currMileage: number
}

export function LazySection({ title, tags, currMileage }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  const intersectionRef = useIntersection(() => {
    setIsVisible(true)
  })

  return (
    <ItemSection title={title} ref={intersectionRef}>
      {isVisible &&
        tags.map((tag) => (
          <MaintenanceCard currMileage={currMileage} key={tag} tag={tag} />
        ))}
    </ItemSection>
  )
}
