/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface SwitchFieldInterface extends AbstractFieldInterface {
    checked_label?: string;
    unchecked_label?: string;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
}

export default SwitchFieldInterface;
