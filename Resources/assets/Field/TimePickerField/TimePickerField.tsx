/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import TimePicker from 'antd/lib/time-picker';
import moment from 'moment';
import TimePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/TimePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface TimePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: TimePickerFieldInterface;
}

const TimePickerField = ({fieldData, onChange, children}: TimePickerFieldProps) => {
    const handleChange = (value: any, dateString: string) => {
        if (onChange) {
            onChange(dateString);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value ? moment(fieldData.value, 'HH:mm:ss') : undefined}
                rules={[{required: fieldData.is_required}]}
            >
                <TimePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TimePickerField;
