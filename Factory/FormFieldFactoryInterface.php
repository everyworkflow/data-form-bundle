<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Factory;

use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;

interface FormFieldFactoryInterface
{
    public function create(string $className, array $data = []): ?AbstractFieldInterface;

    public function createFieldFromType(string $fieldType, array $data = []): ?AbstractFieldInterface;

    public function createField(array $data = []): ?AbstractFieldInterface;
}
