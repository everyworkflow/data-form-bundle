/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import TimePicker from 'antd/lib/time-picker';
import moment from 'moment';
import TimeRangePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/TimeRangePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface TimeRangePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: TimeRangePickerFieldInterface;
}

const TimeRangePickerField = ({fieldData, onChange, children}: TimeRangePickerFieldProps) => {
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
                    moment(fieldData.value[0], 'HH:mm:ss'), moment(fieldData.value[1], 'HH:mm:ss')
                ] : undefined}
                rules={[{required: fieldData.is_required}]}
            >
                <TimePicker.RangePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TimeRangePickerField;
