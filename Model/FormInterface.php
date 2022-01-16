<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Model;

use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataFormBundle\Factory\FormFieldFactoryInterface;
use EveryWorkflow\DataFormBundle\Factory\FormSectionFactoryInterface;
use EveryWorkflow\DataFormBundle\Field\BaseFieldInterface;

interface FormInterface extends ArrayableInterface
{
    public const KEY_FIELDS = 'fields';
    public const KEY_SECTIONS = 'sections';

    public function getFormFieldFactory(): FormFieldFactoryInterface;

    public function getFormSectionFactory(): FormSectionFactoryInterface;

    /**
     * @return BaseSectionInterface[]
     */
    public function getSections(): array;

    /**
     * @param BaseSectionInterface[] $sections
     */
    public function setSections(array $sections): self;

    /**
     * @return BaseFieldInterface[]
     */
    public function getFields(): array;

    /**
     * @param BaseFieldInterface[] $fields
     * @return self
     */
    public function setFields(array $fields): self;

    /**
     * @param BaseFieldInterface[] $fields
     * @return self
     */
    public function addFields(array $fields): self;

    public function addIfNot(string $name, BaseFieldInterface $baseField): self;

    public function addField(string $name, BaseFieldInterface $baseField): self;

    public function removeField(string $name): self;

    public function resetData(array $data): self;
}
