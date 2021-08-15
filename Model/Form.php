<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Model;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\DataFormBundle\Factory\FormFieldFactoryInterface;
use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;

class Form implements FormInterface
{
    protected array $fields = [];

    protected DataObjectInterface $dataObject;
    protected FormFieldFactoryInterface $formFieldFactory;

    public function __construct(
        DataObjectInterface       $dataObject,
        FormFieldFactoryInterface $formFieldFactory
    ) {
        $this->dataObject = $dataObject;
        $this->formFieldFactory = $formFieldFactory;
    }

    public function getFormFieldFactory(): FormFieldFactoryInterface
    {
        return $this->formFieldFactory;
    }

    /**
     * @return AbstractFieldInterface[]
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    /**
     * @param AbstractFieldInterface[] $fields
     */
    public function setFields(array $fields): self
    {
        $this->fields = $fields;

        return $this;
    }

    /**
     * @param AbstractFieldInterface[] $fields
     */
    public function addFields(array $fields): self
    {
        foreach ($fields as $name => $field) {
            $keyName = $name;
            if (!is_string($keyName)) {
                $keyName = $field->getName();
            }
            $this->fields[$keyName] = $field;
        }

        return $this;
    }

    public function addIfNot(string $name, AbstractFieldInterface $abstractField): self
    {
        if (!isset($this->fields[$name])) {
            $this->fields[$name] = $abstractField;
        }

        return $this;
    }

    public function addField(string $name, AbstractFieldInterface $abstractField): self
    {
        $this->fields[$name] = $abstractField;

        return $this;
    }

    public function removeField(string $name): self
    {
        if (isset($this->fields[$name])) {
            unset($this->fields[$name]);
        }

        return $this;
    }

    public function toArray(): array
    {
        $data = $this->dataObject->toArray();

        $fields = [];
        foreach ($this->getFields() as $field) {
            $fields[] = $field->toArray();
        }

        usort($fields, static function ($a, $b) {
            if (!isset($a['sort_order'], $b['sort_order'])) {
                return -1;
            }
            if ($a['sort_order'] === $b['sort_order']) {
                return 0;
            }
            return ($a['sort_order'] < $b['sort_order']) ? -1 : 1;
        });

        $data[self::KEY_FIELDS] = $fields;

        return $data;
    }
}
