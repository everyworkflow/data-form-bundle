/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";
import OptionInterface from "@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface";

interface SelectFieldInterface extends AbstractFieldInterface {
    options?: Array<OptionInterface>;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    is_searchable?: boolean;
}

export default SelectFieldInterface;
