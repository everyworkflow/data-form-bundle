<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Field;

use EveryWorkflow\DataFormBundle\Field\Trait\ClearableTrait;

class DatePickerField extends AbstractField implements DatePickerFieldInterface
{
    use ClearableTrait;

    protected string $fieldType = 'date_picker_field';
}
