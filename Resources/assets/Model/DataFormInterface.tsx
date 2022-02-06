/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@EveryWorkflow/DataFormBundle/Model/Field/BaseFieldInterface";
import BaseSectionInterface from "@EveryWorkflow/DataFormBundle/Model/Section/BaseSectionInterface";

interface DataFormInterface {
    _id?: string;
    form_update_path?: string;
    is_side_form_anchor_enable?: boolean;
    fields?: Array<BaseFieldInterface>;
    sections?: Array<BaseSectionInterface>;
}

export default DataFormInterface;
