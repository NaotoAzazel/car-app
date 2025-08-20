import { RecordTags } from '@prisma/client'

export const recordTagsRu = {
  [RecordTags.ENGINE_OIL_CHANGE]: 'Замена моторного масла',
  [RecordTags.OIL_FILTER_REPLACEMENT]: 'Замена масляного фильтра',
  [RecordTags.GEARBOX_OIL_CHANGE]: 'Замена масла в коробке передач',
  [RecordTags.BRAKE_PADS_REPLACEMENT]: 'Замена тормозных колодок',
  [RecordTags.BRAKE_DISKS_REPLACEMENT]: 'Замена тормозных дисков',
  [RecordTags.ENGINE_AIR_FILTER_REPLACEMENT]:
    'Замена воздушного фильтра двигателя',
  [RecordTags.CABIN_FILTER_REPLACEMENT]: 'Замена салонного фильтра',
  [RecordTags.BALL_BEARINGS_REPLACEMENT]: 'Замена шаровых опор',
  [RecordTags.FRONT_ARM_SILENT_BLOCKS_REPLACEMENT]:
    'Замена сайлентблоков передних рычагов',
  [RecordTags.REAR_ARM_SILENT_BLOCKS_REPLACEMENT]:
    'Замена сайлентблоков задних рычагов',
  [RecordTags.FRONT_SHOCK_ABSORBERS_REPLACEMENT]:
    'Замена передних амортизаторов',
  [RecordTags.REAR_SHOCK_ABSORBERS_REPLACEMENT]: 'Замена задних амортизаторов',
  [RecordTags.SPARK_PLUGS_REPLACEMENT]: 'Замена свечей зажигания',
  [RecordTags.FUEL_FILTER_REPLACEMENT]: 'Замена топливного фильтра',
  [RecordTags.TIMING_BELT_REPLACEMENT]: 'Замена ремня ГРМ',
  [RecordTags.ROLLERS_AND_PUMP_REPLACEMENT]: 'Замена роликов и помпы',
  [RecordTags.POWER_STEERING_FLUID_CHANGE]: 'Замена жидкости ГУР',
} as const

export type RecordTagsRuKeys = keyof typeof recordTagsRu
