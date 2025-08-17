import { useState } from 'react'
import { RecordTags } from '@prisma/client'

import { useIntersection } from '@/shared/lib'

import { ItemSection } from './item-section'
import { MaintenanceCard } from './maintenance-card/maintenance-card'

interface LazySectionProps {
  title: string
  tags: RecordTags[]
}

export function LazySection({ title, tags }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  const intersectionRef = useIntersection(() => {
    setIsVisible(true)
  })

  return (
    <ItemSection title={title} ref={intersectionRef}>
      {isVisible && tags.map((tag) => <MaintenanceCard key={tag} tag={tag} />)}
    </ItemSection>
  )
}
