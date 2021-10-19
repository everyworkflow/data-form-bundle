/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface DatePickerFieldInterface extends AbstractFieldInterface {
  row_class_name?: string;
  label_class_name?: string;
  class_name?: string;
  picker?: string;
  format?: string;
}

export default DatePickerFieldInterface;
