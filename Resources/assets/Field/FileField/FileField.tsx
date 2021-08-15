/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Upload from 'antd/lib/upload';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import FileFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/FileFieldInterface';
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";

interface FileFieldProps extends DynamicFieldPropsInterface {
    fieldData: FileFieldInterface;
}

const FileField = ({ fieldData, children }: FileFieldProps) => {
    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                extra={fieldData.help_text}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            {children}
        </>
    );
};

export default FileField;
