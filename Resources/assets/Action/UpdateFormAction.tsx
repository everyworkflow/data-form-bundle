/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AlertAction, { ALERT_TYPE_ERROR } from "@EveryWorkflow/PanelBundle/Action/AlertAction";
import Remote from "@EveryWorkflow/PanelBundle/Service/Remote";
import { ACTION_SET_FORM_DATA } from "@EveryWorkflow/DataFormBundle/Reducer/FormReducer";

const UpdateFormAction = (path: string) => {
    return async (dispatch: any) => {
        const handleResponse = (response: any) => {
            if (response.data_form) {
                dispatch({
                    type: ACTION_SET_FORM_DATA,
                    payload: response.data_form,
                });
            }
        };

        try {
            const response: any = await Remote.get(path);
            handleResponse(response);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        }
    };
};

export default UpdateFormAction;
