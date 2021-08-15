/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useState } from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Popover from 'antd/lib/popover';
import {ColorResult, SketchPicker} from 'react-color';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import ColorPickerFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/ColorPickerFieldInterface';

interface ColorPickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: ColorPickerFieldInterface;
}

const ColorPickerField = ({fieldData, onChange, children, form}: ColorPickerFieldProps) => {
    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState<any>({ hex: '#ffffff' });

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };

    const handleChange = (color: ColorResult) => {
        if (fieldData.is_disabled) {
            return;
        }
        setColor(color);

        const updateValues: any = {};
        if (fieldData.name && color.hex) {
            updateValues[fieldData.name] = color.hex;
        }
        if (Object.keys(updateValues).length) {
            form.setFieldsValue(updateValues);
        }

        if (onChange && color.hex) {
            onChange(color.hex);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value}
                rules={[{ required: fieldData.is_required }]}
            >
                <Space>
                    <Popover
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        overlayInnerStyle={{
                            margin: '-12px -16px',
                            background: 'transparent',
                            boxShadow: 'none',
                        }}
                        content={<SketchPicker color={color} onChange={handleChange} />}
                    >
                        <Button
                            disabled={fieldData.is_disabled}
                            style={{ backgroundColor: color.hex, width: 32, height: 32 }}
                        >
                            &#160;
                        </Button>
                    </Popover>
                    <span>{color.hex}</span>
                </Space>
            </Form.Item>
            {children}
        </>
    );
};

export default ColorPickerField;
