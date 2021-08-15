/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import DateTimeRangePickerFieldInterface
    from "@EveryWorkflow/DataFormBundle/Model/Field/DateTimeRangePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface DateTimeRangePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DateTimeRangePickerFieldInterface;
}

const DateTimeRangePickerField = ({fieldData, onChange, children}: DateTimeRangePickerFieldProps) => {
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
                    showTime={{ format: 'HH:mm:ss' }}
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default DateTimeRangePickerField;
