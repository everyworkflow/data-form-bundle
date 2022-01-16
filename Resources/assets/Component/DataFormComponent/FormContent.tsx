/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import SectionRenderComponent from "@EveryWorkflow/DataFormBundle/Component/SectionRenderComponent";
import FieldRenderComponent from "@EveryWorkflow/DataFormBundle/Component/FieldRenderComponent";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';

const FormContent = () => {
    const { state: formState } = useContext(FormContext);

    const renderContent = useCallback(() => {
        return (
            <>
                {(formState.form_data?.fields && formState.form_data?.fields.length > 0) && (
                    <FieldRenderComponent fields={formState.form_data.fields} />
                )}
                {(formState.form_data?.sections && formState.form_data?.sections.length > 0) && (
                    <SectionRenderComponent sections={formState.form_data.sections} />
                )}
            </>
        );
    }, [formState.form_data]);

    return (
        <>
            {renderContent()}
        </>
    );
};

export default FormContent;
