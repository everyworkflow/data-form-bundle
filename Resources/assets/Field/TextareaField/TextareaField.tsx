/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import TextareaFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/TextareaFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface TextareaFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextareaFieldInterface;
}

const TextareaField = ({fieldData, onChange, children}: TextareaFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value}
                rules={[{required: fieldData.is_required}]}
            >
                <Input.TextArea
                    onChange={handleChange}
                    rows={fieldData.row_count}
                    disabled={fieldData.is_disabled}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TextareaField;
