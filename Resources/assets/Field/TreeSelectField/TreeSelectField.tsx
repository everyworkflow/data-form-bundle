/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import TreeSelect from 'antd/lib/tree-select';
import DynamicFieldPropsInterface from '@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface';
import TreeSelectFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/TreeSelectFieldInterface';

interface TreeSelectFieldProps extends DynamicFieldPropsInterface {
  fieldData: TreeSelectFieldInterface;
}

const TreeSelectField = ({ fieldData, onChange }: TreeSelectFieldProps) => {

  return (
    <Form.Item
      name={fieldData.name}
      label={fieldData.label}
      initialValue={fieldData.value}
      rules={[{ required: fieldData.is_required }]}
    >
      <TreeSelect
        treeData={fieldData.options}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        // treeDefaultExpandAll
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={onChange}
        treeCheckable={fieldData.multi_select}
        showSearch={fieldData.is_searchable}
      />
    </Form.Item>
  );
};

export default TreeSelectField;
