/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import SelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SelectFieldInterface';
import OptionInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

const { Option } = Select;

interface SelectFieldProps extends DynamicFieldPropsInterface {
    fieldData: SelectFieldInterface;
}

const SelectField = ({ fieldData, onChange, children }: SelectFieldProps) => {
    const onSearch = (val: string) => {
        console.log('search:', val);
    };

    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value?.toString()}
                rules={[{ required: fieldData.is_required }]}
            >
                <Select
                    showSearch={fieldData.is_searchable}
                    // style={{ width: 200 }}
                    optionFilterProp="children"
                    onChange={handleChange}
                    allowClear={fieldData.allow_clear ?? false}
                    onSearch={fieldData.is_searchable ? onSearch : undefined}
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {fieldData.options?.map(
                        (option: OptionInterface, index: number) => (
                            <Option key={index} value={option.key}>
                                {option.value}
                            </Option>
                        )
                    )}
                </Select>
            </Form.Item>
            {children}
        </>
    );
};

export default SelectField;
