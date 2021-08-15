<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Field;

class ColumnField extends AbstractField implements ColumnFieldInterface
{
    protected string $fieldType = 'column_field';
}
