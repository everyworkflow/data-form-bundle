/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import Form from 'antd/lib/form';
import TreeSelect from 'antd/lib/tree-select';
import DynamicFieldPropsInterface from '@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface';
import TreeSelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/TreeSelectFieldInterface';
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';

interface TreeSelectFieldProps extends DynamicFieldPropsInterface {
    fieldData: TreeSelectFieldInterface;
}

const TreeSelectField = ({ fieldData, onChange }: TreeSelectFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <Form.Item
            style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                display: 'none',
            } : undefined}
            name={fieldData.name}
            label={fieldData.label}
            initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
            validateStatus={getErrorMessage() ? 'error' : undefined}
            help={getErrorMessage()}
            rules={[{ required: fieldData.is_required }]}>
            <TreeSelect
                treeData={fieldData.options}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll={fieldData.is_default_expand_all}
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={onChange}
                treeCheckable={fieldData.multi_select}
                showSearch={fieldData.is_searchable}
                disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
            />
        </Form.Item>
    );
};

export default TreeSelectField;
