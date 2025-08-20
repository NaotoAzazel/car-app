import { RecordTags } from '@prisma/client'

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
