/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from "react";
import Form from "antd/lib/form";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";
import DatePickerFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/DatePickerFieldInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import FormContext from "@EveryWorkflow/DataFormBundle/Context/FormContext";

interface DatePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DatePickerFieldInterface;
}

const DatePickerField = ({
    fieldData,
    onChange,
    children,
}: DatePickerFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (value: any, dateString: string) => {
        if (onChange) {
            onChange(dateString);
        }
    };

    const getPickerVal = ():
        | "date"
        | "week"
        | "month"
        | "quarter"
        | "year"
        | undefined => {
        let currentVal = undefined;
        ["date", "week", "month", "quarter", "year"].forEach((val: string) => {
            if (fieldData.picker === val) {
                currentVal = val;
                return false;
            }
        });
        return currentVal;
    };

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                    display: 'none',
                } : undefined}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? moment(formState.initial_values[fieldData.name]) : undefined}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <DatePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    picker={getPickerVal()}
                    format={fieldData.format}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default DatePickerField;
