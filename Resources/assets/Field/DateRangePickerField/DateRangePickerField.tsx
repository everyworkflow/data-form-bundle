/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import DateRangePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/DateRangePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface DateRangePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DateRangePickerFieldInterface;
}

const DateRangePickerField = ({ fieldData, onChange, children }: DateRangePickerFieldProps) => {
    const handleChange = (value: any, dateString: [string, string]) => {
        if (onChange) {
            onChange(dateString);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.value && fieldData.value.length === 2) ? [
                    moment(fieldData.value[0]), moment(fieldData.value[1])
                ] : undefined}
                rules={[{ required: fieldData.is_required }]}
            >
                <DatePicker.RangePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default DateRangePickerField;
