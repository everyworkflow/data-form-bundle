/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {FormInstance} from "antd/lib/form";
import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface DynamicFieldPropsInterface {
    fieldData: AbstractFieldInterface;
    form: FormInstance<any>;
    formType: string;
    mode: string;
    onChange?: (value: any) => void;
    children?: JSX.Element;
}

export default DynamicFieldPropsInterface;
