/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface";

interface TextareaFieldInterface extends BaseFieldInterface {
    row_count?: number;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
}

export default TextareaFieldInterface;
