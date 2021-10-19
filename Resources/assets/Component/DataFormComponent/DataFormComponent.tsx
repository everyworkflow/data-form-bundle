/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { Suspense, useCallback } from "react";
import FieldRenderComponent from "@EveryWorkflow/DataFormBundle/Component/FieldRenderComponent";
import { ColProps } from "antd/lib/col";
import Form, { FormInstance } from "antd/lib/form";
import Row from "antd/lib/row";
import DataFormInterface from "@EveryWorkflow/DataFormBundle/Model/DataFormInterface";
import moment from "moment";
import LoadingIndicatorComponent from "@EveryWorkflow/CoreBundle/Component/LoadingIndicatorComponent";

export const FORM_TYPE_VERTICAL = "vertical"; // default
export const FORM_TYPE_HORIZONTAL = "horizontal";
export const FORM_TYPE_INLINE = "inline";

export const FORM_MODE_EDIT = "mode_edit"; // default
export const FORM_MODE_VIEW = "mode_view";

interface DataFormProps {
  className?: string;
  formId?: string;
  form?: FormInstance;
  formData?: DataFormInterface;
  formType?: "vertical" | "horizontal" | "inline";
  mode?: string;
  method?: string;
  hasMarginBottom?: boolean;
  children?: JSX.Element | JSX.Element[];
  formRef?: any;
  onSubmit?: (data: any) => void;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  initialValues?: any;
}

const DataFormComponent = ({
  className,
  formId,
  form,
  formData,
  formType = FORM_TYPE_VERTICAL,
  mode,
  children,
  formRef,
  onSubmit,
  labelCol,
  wrapperCol,
  initialValues,
}: DataFormProps) => {
  const [internalForm] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const getFormId = useCallback(() => {
    if (formId === undefined) {
      return "form-" + Math.random();
    }
    return formId;
  }, [formId]);

  const onFinish = (values: any) => {
    if (onSubmit) {
      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
          const newValues: Array<any> = [];
          values[key].forEach((dateObj: any, index: number) => {
            if (dateObj instanceof moment) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              newValues[index] = dateObj.toISOString();
            }
          });
          values[key] = newValues;
        } else if (values[key] instanceof moment) {
          values[key] = values[key].toISOString();
        }
      });
      console.log("onFinish --> values", values);
      onSubmit(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getLabelCol = useCallback(() => {
    if (labelCol) {
      return labelCol;
    }
    if (formType === FORM_TYPE_HORIZONTAL) {
      return { span: 4 };
    }
    return undefined;
  }, [labelCol, formType]);

  const getWrapperCol = useCallback(() => {
    if (wrapperCol) {
      return wrapperCol;
    }
    if (formType === FORM_TYPE_HORIZONTAL) {
      return { span: 14 };
    }
    return undefined;
  }, [wrapperCol, formType]);

  const getSortedFieldData = (): any => {
    return formData?.fields?.sort((a: any, b: any) => {
      if (a === undefined || b === undefined) {
        return 0;
      }
      if (a.sort_order ?? 0 === b.sort_order ?? 0) {
        return 0;
      }
      return a.sort_order ?? 0 > b.sort_order ?? 0 ? 1 : -1;
    });
  };

  return (
    <Form
      className={className}
      ref={formRef}
      id={getFormId()}
      form={form ?? internalForm}
      initialValues={initialValues}
      labelCol={getLabelCol()}
      wrapperCol={getWrapperCol()}
      validateMessages={validateMessages}
      layout={formType}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Suspense fallback={<LoadingIndicatorComponent />}>
        {formType === FORM_TYPE_INLINE ? (
          <Row>
            {getSortedFieldData().map((item: any, index: number) => (
              <FieldRenderComponent
                key={index}
                item={item}
                form={form ?? internalForm}
                mode={mode ?? FORM_TYPE_VERTICAL}
                formType={formType}
              />
            ))}
          </Row>
        ) : (
          <>
            {getSortedFieldData().map((item: any, index: number) => (
              <FieldRenderComponent
                key={index}
                item={item}
                form={form ?? internalForm}
                mode={mode ?? FORM_TYPE_VERTICAL}
                formType={formType}
              />
            ))}
          </>
        )}
      </Suspense>
      {children}
    </Form>
  );
};

export default DataFormComponent;
