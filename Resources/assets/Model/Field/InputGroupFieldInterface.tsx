/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface InputGroupFieldInterface extends AbstractFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    type?: string;
    class_name?: string;
    options?: any;

    prefix_text?: string;
    subfix_text?: string;
}

export default InputGroupFieldInterface;
