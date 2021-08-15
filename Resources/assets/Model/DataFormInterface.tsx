/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AbstractFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface";

interface DataFormInterface {
    _id?: string;
    fields: Array<AbstractFieldInterface>;
}

export default DataFormInterface;
