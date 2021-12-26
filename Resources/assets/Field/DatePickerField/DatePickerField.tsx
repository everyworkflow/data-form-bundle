/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from "react";
import Form from "antd/lib/form";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";
import DatePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/DatePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface DatePickerFieldProps extends DynamicFieldPropsInterface {
  fieldData: DatePickerFieldInterface;
}

const DatePickerField = ({
  fieldData,
  onChange,
  children,
}: DatePickerFieldProps) => {
  const handleChange = (value: any, dateString: string) => {
    if (onChange) {
      onChange(dateString);
    }
  };

  const getPickerVal = ():
    | "date"
    | "week"
    | "month"
    | "quarter"
    | "year"
    | undefined => {
    let currentVal = undefined;
    ["date", "week", "month", "quarter", "year"].forEach((val: string) => {
      if (fieldData.picker === val) {
        currentVal = val;
        return false;
      }
    });
    return currentVal;
  };

  return (
    <>
      <Form.Item
        name={fieldData.name}
        label={fieldData.label}
        initialValue={fieldData.value ? moment(fieldData.value) : undefined}
        rules={[{ required: fieldData.is_required }]}
      >
        <DatePicker
          allowClear={fieldData.allow_clear ?? false}
          onChange={handleChange}
          disabled={fieldData.is_disabled}
          picker={getPickerVal()}
          format={fieldData.format}
        />
      </Form.Item>
      {children}
    </>
  );
};

export default DatePickerField;
