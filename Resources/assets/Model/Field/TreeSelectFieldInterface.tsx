import AbstractFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/AbstractFieldInterface';
import OptionInterface from '@EveryWorkflow/DataFormBundle/Model/Field/Select/OptionInterface';

interface TreeSelectFieldInterface extends AbstractFieldInterface {
  options?: Array<OptionInterface>;
  row_class_name?: string;
  label_class_name?: string;
  class_name?: string;
  is_searchable?: boolean;
  multi_select?: boolean;
}

export default TreeSelectFieldInterface;
