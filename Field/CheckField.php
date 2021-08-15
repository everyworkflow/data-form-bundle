<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Field;

class CheckField extends AbstractField implements CheckFieldInterface
{
    protected string $fieldType = 'check_field';
}
