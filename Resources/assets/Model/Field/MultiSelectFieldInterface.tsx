import AbstractFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface';
import OptionInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface';
import ObjectInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/ObjectInterface';

interface MultiSelectFieldInterface extends AbstractFieldInterface {
  options?: Array<OptionInterface>;
  row_class_name?: string;
  label_class_name?: string;
  class_name?: string;
  is_searchable?: boolean;
  treeProps: ObjectInterface;
}

export default MultiSelectFieldInterface;
