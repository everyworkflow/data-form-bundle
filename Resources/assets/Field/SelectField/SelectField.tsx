/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import SelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SelectFieldInterface';
import OptionInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';

interface SelectFieldProps extends DynamicFieldPropsInterface {
    fieldData: SelectFieldInterface;
}

const SelectField = ({ fieldData, onChange, children }: SelectFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const onSearch = (val: string) => {
        console.log('search:', val);
    };

    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value);
        }
    };

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                    display: 'none',
                } : undefined}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name].toString() : fieldData?.default_value}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <Select
                    showSearch={fieldData.is_searchable}
                    optionFilterProp="children"
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    allowClear={fieldData.allow_clear ?? false}
                    onSearch={fieldData.is_searchable ? onSearch : undefined}
                    // filterOption={(input, option) =>
                    //     option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                    {fieldData.options?.map(
                        (option: OptionInterface, index: number) => (
                            <Select.Option key={index} value={option.key}>
                                {option.value}
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            {children}
        </>
    );
};

export default SelectField;
