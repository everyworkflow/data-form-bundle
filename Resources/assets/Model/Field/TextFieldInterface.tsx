/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface TextFieldInterface extends AbstractFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    input_type?: string;
    class_name?: string;
    options?: any;

    prefix_tab_text?: string;
    suffix_tab_text?: string;
    prefix_text?: string;
    suffix_text?: string;
}

export default TextFieldInterface;
