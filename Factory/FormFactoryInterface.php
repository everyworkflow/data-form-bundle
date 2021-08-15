<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Factory;

use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;
use EveryWorkflow\DataFormBundle\Model\FormInterface;

interface FormFactoryInterface
{
    /**
     * @param AbstractFieldInterface[] $fields
     */
    public function create(array $fields = [], array $data = []): FormInterface;
}
