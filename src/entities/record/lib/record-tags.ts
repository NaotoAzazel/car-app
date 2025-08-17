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

export const recordTagsGrouped = {
  engine: [
    RecordTags.ENGINE_OIL_CHANGE,
    RecordTags.OIL_FILTER_REPLACEMENT,
    RecordTags.ENGINE_AIR_FILTER_REPLACEMENT,
    RecordTags.SPARK_PLUGS_REPLACEMENT,
    RecordTags.FUEL_FILTER_REPLACEMENT,
    RecordTags.TIMING_BELT_REPLACEMENT,
    RecordTags.ROLLERS_AND_PUMP_REPLACEMENT,
  ],
  transmission: [RecordTags.GEARBOX_OIL_CHANGE],
  brakeSystem: [
    RecordTags.BRAKE_PADS_REPLACEMENT,
    RecordTags.BRAKE_DISKS_REPLACEMENT,
  ],
  suspension: [
    RecordTags.BALL_BEARINGS_REPLACEMENT,
    RecordTags.FRONT_ARM_SILENT_BLOCKS_REPLACEMENT,
    RecordTags.REAR_ARM_SILENT_BLOCKS_REPLACEMENT,
    RecordTags.FRONT_SHOCK_ABSORBERS_REPLACEMENT,
    RecordTags.REAR_SHOCK_ABSORBERS_REPLACEMENT,
  ],
  salon: [RecordTags.CABIN_FILTER_REPLACEMENT],
  other: [RecordTags.POWER_STEERING_FLUID_CHANGE],
}

export const recordIntervals: Record<RecordTags, number> = {
  [RecordTags.ENGINE_OIL_CHANGE]: 10000,
  [RecordTags.OIL_FILTER_REPLACEMENT]: 10000,
  [RecordTags.ENGINE_AIR_FILTER_REPLACEMENT]: 15000,
  [RecordTags.SPARK_PLUGS_REPLACEMENT]: 30000,
  [RecordTags.FUEL_FILTER_REPLACEMENT]: 20000,
  [RecordTags.TIMING_BELT_REPLACEMENT]: 60000,
  [RecordTags.ROLLERS_AND_PUMP_REPLACEMENT]: 60000,

  [RecordTags.GEARBOX_OIL_CHANGE]: 40000,

  [RecordTags.BRAKE_PADS_REPLACEMENT]: 25000,
  [RecordTags.BRAKE_DISKS_REPLACEMENT]: 80000,

  [RecordTags.BALL_BEARINGS_REPLACEMENT]: 70000,
  [RecordTags.FRONT_ARM_SILENT_BLOCKS_REPLACEMENT]: 60000,
  [RecordTags.REAR_ARM_SILENT_BLOCKS_REPLACEMENT]: 60000,
  [RecordTags.FRONT_SHOCK_ABSORBERS_REPLACEMENT]: 70000,
  [RecordTags.REAR_SHOCK_ABSORBERS_REPLACEMENT]: 70000,

  [RecordTags.CABIN_FILTER_REPLACEMENT]: 15000,

  [RecordTags.POWER_STEERING_FLUID_CHANGE]: 60000,
}
