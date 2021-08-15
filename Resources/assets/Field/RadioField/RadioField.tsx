/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useState} from 'react';
import Form from 'antd/lib/form';
import Radio, {RadioChangeEvent} from 'antd/lib/radio';
import RadioFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/RadioFieldInterface';
import OptionInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface RadioFieldProps extends DynamicFieldPropsInterface {
    fieldData: RadioFieldInterface;
}

const RadioField = ({fieldData, onChange, children}: RadioFieldProps) => {
    const [value, setValue] = useState(fieldData.value);

    const handleChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
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
                <Radio.Group
                    value={value}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled}
                >
                    {fieldData.options?.map(
                        (option: OptionInterface, index: number) => (
                            <Radio key={index} value={option.key}>
                                {option.value}
                            </Radio>
                        )
                    )}
                </Radio.Group>
            </Form.Item>
            {children}
        </>
    );
};

export default RadioField;
