<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Model;

use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataFormBundle\Factory\FormFieldFactoryInterface;
use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;

interface FormInterface extends ArrayableInterface
{
    public const KEY_FIELDS = 'fields';

    public function getFormFieldFactory(): FormFieldFactoryInterface;

    /**
     * @return AbstractFieldInterface[]
     */
    public function getFields(): array;

    /**
     * @param AbstractFieldInterface[] $fields
     * @return self
     */
    public function setFields(array $fields): self;

    /**
     * @param AbstractFieldInterface[] $fields
     * @return self
     */
    public function addFields(array $fields): self;

    public function addIfNot(string $name, AbstractFieldInterface $abstractField): self;

    public function addField(string $name, AbstractFieldInterface $abstractField): self;

    public function removeField(string $name): self;
}
