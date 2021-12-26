import React from 'react';
import Form from 'antd/lib/form';
import TreeSelect from 'antd/lib/tree-select';
import DynamicFieldPropsInterface from '@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface';
import MultiSelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/MultiSelectFieldInterface';

interface MultiSelectFieldProps extends DynamicFieldPropsInterface {
  fieldData: MultiSelectFieldInterface;
}

const MultiSelect = ({ fieldData, onChange, form }: MultiSelectFieldProps) => {
  const { SHOW_PARENT } = TreeSelect;
  const { treeProps, options } = fieldData;
  const tProps = {
    ...treeProps,
    showCheckedStrategy: treeProps ? SHOW_PARENT : null,
  };

  const handleChange = (value: any) => {
    if (!fieldData.name) {
      return;
    }

    console.log('MultiSelect value -->', value);
    let updateField: any = {};
    updateField[fieldData.name] = value;
    form.setFieldsValue(updateField);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Item
      name={fieldData.name}
      label={fieldData.label}
      initialValue={fieldData.value}
      rules={[{ required: fieldData.is_required }]}
    >
      <TreeSelect
        treeData={options}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        // treeDefaultExpandAll
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
        {...tProps}
        showCheckedStrategy={SHOW_PARENT}
      />
    </Form.Item>
  );
};

export default MultiSelect;
