/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useState} from 'react';
import Space from 'antd/lib/space';
import Form from 'antd/lib/form';
import Switch from 'antd/lib/switch';
import {FORM_MODE_VIEW} from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';
import SwitchFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/SwitchFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import {CheckboxChangeEvent} from "antd/lib/checkbox";

interface SwitchFieldProps extends DynamicFieldPropsInterface {
    fieldData: SwitchFieldInterface;
}

const SwitchField = ({fieldData, onChange, mode, children, form}: SwitchFieldProps) => {
    const [switchStatus, setSwitchStatus] = useState(!!fieldData.value);

    const handleChange = (checked: boolean) => {
        const updateValues: any = {};
        if (fieldData.name) {
            updateValues[fieldData.name] = checked;
        }
        if (Object.keys(updateValues).length) {
            form.setFieldsValue(updateValues);
        }
        setSwitchStatus(checked);
        if (onChange) {
            onChange(checked);
        }
    };

    if (mode === FORM_MODE_VIEW) {
        if (fieldData?.value) {
            if (fieldData.checked_label) {
                return <span>{fieldData.checked_label}</span>;
            }
            return <span>Yes</span>;
        }
        if (fieldData.unchecked_label) {
            return <span>{fieldData.unchecked_label}</span>;
        }
        return <span>No</span>;
    }

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
            >
                <Space>
                    <Switch
                        checkedChildren={fieldData.checked_label}
                        unCheckedChildren={fieldData.unchecked_label}
                        checked={switchStatus}
                        onChange={handleChange}
                    />
                    <span>{fieldData.help_text}</span>
                </Space>
            </Form.Item>
            {children}
        </>
    );
};

export default SwitchField;
