/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import { MediaFormFieldMaps } from '@EveryWorkflow/MediaManagerBundle/Root/MediaFormFieldMaps';

const TextField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/TextField')
);
const TextareaField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/TextareaField')
);
const MarkdownField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/MarkdownField')
);
const ColorPickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/ColorPickerField')
);
const DatePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/DatePickerField')
);
const TimePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/TimePickerField')
);
const DateTimePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/DateTimePickerField')
);
const DateRangePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/DateRangePickerField')
);
const TimeRangePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/TimeRangePickerField')
);
const DateTimeRangePickerField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/DateTimeRangePickerField')
);
const FileField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/FileField')
);
const CheckField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/CheckField')
);
const SwitchField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/SwitchField')
);
const RadioField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/RadioField')
);
const SelectField = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/SelectField')
);
const Cascader = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/Cascader')
);

const MultiSelect = lazy(
  () => import('@EveryWorkflow/DataFormBundle/Field/MultiSelect')
);

export const DataFormFieldMaps: any = {
  text_field: TextField,
  textarea_field: TextareaField,
  markdown_field: MarkdownField,
  color_picker_field: ColorPickerField,
  date_picker_field: DatePickerField,
  time_picker_field: TimePickerField,
  date_time_picker_field: DateTimePickerField,
  date_range_picker_field: DateRangePickerField,
  time_range_picker_field: TimeRangePickerField,
  date_time_range_picker_field: DateTimeRangePickerField,
  file_field: FileField,
  check_field: CheckField,
  switch_field: SwitchField,
  radio_field: RadioField,
  select_field: SelectField,
  cascader: Cascader,
  multi_select: MultiSelect,
  ...MediaFormFieldMaps,
};
