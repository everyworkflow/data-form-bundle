/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface FileFieldInterface extends AbstractFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
}

export default FileFieldInterface;
