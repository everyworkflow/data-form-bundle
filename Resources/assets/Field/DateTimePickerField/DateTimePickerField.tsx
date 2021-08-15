/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import DatePicker from 'antd/lib/date-picker';
import Input from "antd/lib/input";
import moment from 'moment';
import DateTimePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/DateTimePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface DateTimePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DateTimePickerFieldInterface;
}

const DateTimePickerField = ({fieldData, onChange, children}: DateTimePickerFieldProps) => {
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
                initialValue={(fieldData.value && !fieldData.is_readonly) ? moment(fieldData.value) : fieldData.value}
                rules={[{required: fieldData.is_required}]}
            >
                {fieldData.is_readonly ? (
                    <Input
                        bordered={!fieldData.is_readonly}
                        readOnly={fieldData.is_readonly}
                    />
                ) : (
                    <DatePicker
                        showTime={{format: 'HH:mm:ss'}}
                        allowClear={fieldData.allow_clear ?? false}
                        onChange={handleChange}
                        disabled={fieldData.is_disabled}
                    />
                )}
            </Form.Item>
            {children}
        </>
    );
};

export default DateTimePickerField;
