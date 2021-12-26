import React, { FunctionComponent } from 'react';
import Col from 'antd/lib/col';
import { FormInstance } from "antd/lib/form";
import {
    FORM_MODE_EDIT,
    FORM_TYPE_VERTICAL,
    FORM_TYPE_INLINE
} from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';
import { DataFormFieldMaps } from "@EveryWorkflow/DataFormBundle/Root/DataFormFieldMaps";

interface RenderFieldProps {
    item: any;
    form: FormInstance<any>;
    formType: string;
    mode: string;
    FormField?: FunctionComponent<any>;
}

const FieldRenderComponent = ({
    item,
    form,
    formType = FORM_TYPE_VERTICAL,
    mode = FORM_MODE_EDIT,
    FormField,
}: RenderFieldProps) => {
    const getField = () => {
        if (FormField) {
            return <FormField fieldData={item} formType={formType} mode={mode} form={form} />;
        }
        if (!!DataFormFieldMaps[item.field_type]) {
            const DynamicComponent = DataFormFieldMaps[item.field_type];
            return <DynamicComponent fieldData={item} formType={formType} mode={mode} form={form} />;
        }
        return (
            <p style={{ padding: 16 }}>
                Field not found &quot;{item.field_type}&quot;
            </p>
        );
    }

    if (formType === FORM_TYPE_INLINE) {
        return (
            <Col className="gutter-row" span={8}>
                {getField()}
            </Col>
        );
    }
    return getField();
};

export default FieldRenderComponent;
