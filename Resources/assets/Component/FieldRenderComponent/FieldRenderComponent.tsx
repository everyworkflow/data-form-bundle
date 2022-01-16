/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import { DataFormFieldMaps } from "@EveryWorkflow/DataFormBundle/Root/DataFormFieldMaps";
import BaseFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface';
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';
import UpdateFormAction from '@EveryWorkflow/DataFormBundle/Action/UpdateFormAction';
import { FORM_TYPE_INLINE } from '@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { ACTION_SET_DISABLE_FIELD_NAMES, ACTION_SET_FORM_UPDATE_NAMES, ACTION_SET_HIDDEN_FIELD_NAMES, ACTION_SET_INVISIBLE_FIELD_NAMES } from '@EveryWorkflow/DataFormBundle/Reducer/FormReducer';

interface RenderFieldProps {
    fields: Array<BaseFieldInterface>;
}

const FieldRenderComponent = ({ fields = [] }: RenderFieldProps) => {
    const { state: formState, dispatch: formDispatch } = useContext(FormContext);

    useEffect(() => {
        fields.forEach((field) => {
            if (field.is_actionable && field.name) {
                fieldActionHandler(field, formState.initial_values[field.name]);
            }
        });
    }, [fields]);

    const generateFilledPath = (path: string, rowData: any) => {
        Object.keys(rowData).forEach((itemKey: string) => {
            path = path.replace(
                '{' + itemKey + '}',
                rowData[itemKey]
            );
        });
        return path;
    }

    const fieldActionHandler = (field: BaseFieldInterface, value: any, actionType = 'init') => {
        if (typeof value === 'boolean') {
            value = Number(value);
        }
        const actions: Array<any> = field.field_actions[value] ?? [];

        let hiddenFieldNames = formState.hidden_field_names ?? [];
        let disableFieldNames = formState.disable_field_names ?? [];
        let invisibleFieldNames = formState.invisible_field_names ?? [];
        actions.forEach((action: any) => {
            switch (action.action_type) {
                case 'show_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (hiddenFieldNames.includes(fieldName)) {
                            hiddenFieldNames = hiddenFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'hide_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!hiddenFieldNames.includes(fieldName)) {
                            hiddenFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'enable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (disableFieldNames.includes(fieldName)) {
                            disableFieldNames = disableFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'disable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!disableFieldNames.includes(fieldName)) {
                            disableFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'add_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!invisibleFieldNames.includes(fieldName)) {
                            invisibleFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'remove_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (invisibleFieldNames.includes(fieldName)) {
                            invisibleFieldNames = invisibleFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'update_form': {
                    if ((field.name && !formState.form_update_names.includes(field.name)) || actionType === 'change') {
                        formDispatch({
                            type: ACTION_SET_FORM_UPDATE_NAMES,
                            payload: [...formState.form_update_names, field.name],
                        });
                        let path: string = generateFilledPath(action.path, formState.initial_values ?? {});
                        UpdateFormAction(path)(formDispatch);
                    }
                    break;
                }
            }
        });

        formDispatch({
            type: ACTION_SET_HIDDEN_FIELD_NAMES,
            payload: hiddenFieldNames
        });
        formDispatch({
            type: ACTION_SET_DISABLE_FIELD_NAMES,
            payload: disableFieldNames
        });
        formDispatch({
            type: ACTION_SET_INVISIBLE_FIELD_NAMES,
            payload: invisibleFieldNames
        });
    }

    const onValueChange = (field: BaseFieldInterface, value: any) => {
        if (field.is_actionable) {
            fieldActionHandler(field, value, 'change');
        }
    }

    const getSortedFieldData = (formFields: Array<any>): Array<any> => {
        return formFields?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderField = (item: any, index: number) => {
        if (item.name && !!formState.form_field_maps[item.name]) {
            const DynamicComponent = formState.form_field_maps[item.name];
            return <DynamicComponent key={index} fieldData={item} onChange={(value: any) => {
                onValueChange(item, value);
            }} />;
        }
        if (item.field_type && !!DataFormFieldMaps[item.field_type]) {
            const DynamicComponent = DataFormFieldMaps[item.field_type];
            return <DynamicComponent key={index} fieldData={item} onChange={(value: any) => {
                onValueChange(item, value);
            }} />;
            // return <DynamicComponent key={index} fieldData={item} />;
        }

        return (
            <p key={index} style={{ padding: 16 }}>
                Field not found &quot;{item.field_type}&quot;
            </p>
        );
    }

    if (fields.length) {
        return (
            <>
                {formState.form_type === FORM_TYPE_INLINE ? (
                    <Row>
                        {getSortedFieldData(fields ?? []).map((item: any, index: number) => {
                            return (
                                <Col key={index} className="gutter-row" span={8}>
                                    {renderField(item, index)}
                                </Col>
                            );
                        })}
                    </Row>
                ) : getSortedFieldData(fields ?? []).map(renderField)}
            </>
        )
    }

    return null;
};

export default FieldRenderComponent;
