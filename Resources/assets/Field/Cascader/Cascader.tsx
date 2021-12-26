/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from 'antd/lib/form';
import Cascader from 'antd/lib/cascader';
import DynamicFieldPropsInterface from '@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface';
import CascaderFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/CascaderFieldInterface';
import {
  FORM_MODE_EDIT,
  FORM_MODE_VIEW,
} from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';

interface CascaderFieldProps extends DynamicFieldPropsInterface {
  fieldData: CascaderFieldInterface;
}

const CascaderField = ({
  fieldData,
  mode = FORM_MODE_EDIT,
  onChange,
  children,
}: CascaderFieldProps) => {
  if (mode === FORM_MODE_VIEW) {
    return <span>{fieldData?.value}</span>;
  }

  function filter(inputValue: any, path: any) {
    return path.some(
      (option: any) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <>
      <Form.Item
        name={fieldData.name}
        label={fieldData.label}
        initialValue={fieldData.value}
        rules={[{ required: fieldData.is_required }]}
      >
        <Cascader
          // options={fieldData.options}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter }}
        />
      </Form.Item>
      {children}
    </>
  );
};

export default CascaderField;
