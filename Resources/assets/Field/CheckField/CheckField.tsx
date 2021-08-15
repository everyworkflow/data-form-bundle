/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useState} from 'react';
import Form from 'antd/lib/form';
import Checkbox, {CheckboxChangeEvent} from 'antd/lib/checkbox';
import CheckFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/CheckFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface CheckFieldProps extends DynamicFieldPropsInterface {
    fieldData: CheckFieldInterface;
}

const CheckField = ({fieldData, onChange, children, form}: CheckFieldProps) => {
    const [checkboxStatus, setCheckboxStatus] = useState(!!fieldData.value);

    const handleChange = (event: CheckboxChangeEvent) => {
        const updateValues: any = {};
        if (fieldData.name) {
            updateValues[fieldData.name] = event.target.checked;
        }
        if (Object.keys(updateValues).length) {
            form.setFieldsValue(updateValues);
        }
        setCheckboxStatus(event.target.checked);
        if (onChange) {
            onChange(event.target.checked);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
            >
                <Checkbox
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                    checked={checkboxStatus}
                >
                    {fieldData.help_text}
                </Checkbox>
            </Form.Item>
            {children}
        </>
    );
};

export default CheckField;
