/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'antd/lib/form';
import PanelContext from "@EveryWorkflow/PanelBundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@EveryWorkflow/PanelBundle/Reducer/PanelReducer";
import Remote from "@EveryWorkflow/PanelBundle/Service/Remote";
import PageHeaderComponent from "@EveryWorkflow/AdminPanelBundle/Component/PageHeaderComponent";
import BreadcrumbComponent from "@EveryWorkflow/AdminPanelBundle/Component/BreadcrumbComponent";
import DataFormComponent from "@EveryWorkflow/DataFormBundle/Component/DataFormComponent";
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "@EveryWorkflow/PanelBundle/Action/AlertAction";
import { FORM_TYPE_HORIZONTAL } from "@EveryWorkflow/DataFormBundle/Component/DataFormComponent/DataFormComponent";
import ValidationError from '@EveryWorkflow/PanelBundle/Error/ValidationError';

const SUBMIT_SAVE_CHANGES = 'save_changes';
const SUBMIT_SAVE_CHANGES_AND_CONTINUE = 'save_changes_and_continue';

interface DataFormPageComponentProps {
    title: string;
    getPath: string;
    savePath: string;
    primaryKey?: string;
    primaryKeyLabel?: string;
    childrenBeforeHeader?: JSX.Element | JSX.Element[];
    childrenBeforeBreadcrumb?: JSX.Element | JSX.Element[];
    childrenBefore?: JSX.Element | JSX.Element[];
    childrenAfter?: JSX.Element | JSX.Element[];
    formSectionMaps?: any;
    formFieldMaps?: any;
}

const DataFormPageComponent = ({
    title,
    getPath,
    savePath,
    primaryKey = 'uuid',
    primaryKeyLabel = 'ID',
    childrenBeforeHeader,
    childrenBeforeBreadcrumb,
    childrenBefore,
    childrenAfter,
    formSectionMaps,
    formFieldMaps
}: DataFormPageComponentProps) => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const urlParams: any = useParams();
    const [form] = Form.useForm();
    const [submitActionState, setSubmitActionState] = useState<string>(SUBMIT_SAVE_CHANGES);
    const [formErrors, setFormErrors] = useState<any>();
    const [remoteData, setRemoteData] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: (urlParams[primaryKey] && urlParams[primaryKey] !== '') ? 'Edit ' + title : 'Create ' + title,
        });

        const handleResponse = (response: any) => {
            if (response.data_form) {
                setRemoteData(response);
            }
        };

        (async () => {
            try {
                let path: string = getPath;
                path = path.replace('{' + primaryKey + '}', urlParams[primaryKey] ?? 'create');
                const response: any = await Remote.get(path);
                handleResponse(response);
                setFormErrors(undefined);
            } catch (error: any) {
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
            }
        })();
    }, [panelDispatch, getPath, primaryKey, title]);

    const onSubmit = async (data: any) => {
        const submitData: any = {};
        Object.keys(data).forEach(name => {
            if (data[name] !== undefined) {
                submitData[name] = data[name];
            }
        });

        const handlePostResponse = (response: any) => {
            AlertAction({
                description: response.detail,
                message: 'Form submit success',
                type: ALERT_TYPE_SUCCESS,
            });
            if (submitActionState === SUBMIT_SAVE_CHANGES) {
                navigate(-1);
            }
        };

        try {
            let path: string = savePath;
            path = path.replace('{' + primaryKey + '}', urlParams[primaryKey] ?? 'create');
            const response = await Remote.post(path, submitData);
            handlePostResponse(response);
            setFormErrors(undefined);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                setFormErrors(error.errors);
            }

            AlertAction({
                description: error.message,
                message: 'Submit error',
                type: ALERT_TYPE_ERROR,
            });
        }
    };

    const getHeaderActions = () => {
        const headerActions: Array<any> = [
            {
                button_label: 'Save changes',
                button_type: 'primary',
                onClick: () => {
                    setSubmitActionState(SUBMIT_SAVE_CHANGES);
                    form.submit();
                },
            },
        ];

        if (urlParams[primaryKey] && urlParams[primaryKey] !== 'create') {
            headerActions.push({
                button_label: 'Save changes and continue',
                button_type: 'primary',
                onClick: () => {
                    setSubmitActionState(SUBMIT_SAVE_CHANGES_AND_CONTINUE);
                    form.submit();
                },
            });
        }

        return headerActions;
    }

    return (
        <>
            {childrenBeforeHeader}
            <PageHeaderComponent
                title={(urlParams[primaryKey] && urlParams[primaryKey] !== '') ? primaryKeyLabel + ': ' + urlParams[primaryKey] : undefined}
                actions={getHeaderActions()}
            />
            {childrenBeforeBreadcrumb}
            <BreadcrumbComponent />
            {childrenBefore}
            {remoteData && (
                <DataFormComponent
                    form={form}
                    initialValues={remoteData.item}
                    formErrors={formErrors}
                    formData={remoteData.data_form}
                    formType={FORM_TYPE_HORIZONTAL}
                    onSubmit={onSubmit}
                    formSectionMaps={formSectionMaps}
                    formFieldMaps={formFieldMaps}
                />
            )}
            {childrenAfter}
        </>
    );
}

export default DataFormPageComponent;
