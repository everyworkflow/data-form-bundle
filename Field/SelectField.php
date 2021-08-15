<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Field;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataFormBundle\Field\Select\OptionInterface;

class SelectField extends AbstractField implements SelectFieldInterface
{
    protected string $fieldType = 'select_field';

    /**
     * @var OptionInterface[]
     */
    protected array $options = [];

    public function __construct(DataObjectInterface $dataObject)
    {
        parent::__construct($dataObject);
        if ($dataObject->getData(self::KEY_OPTIONS)) {
            $this->options = $dataObject->getData(self::KEY_OPTIONS);
            $dataObject->setData(self::KEY_OPTIONS, null);
        }
    }

    public function isSearchable(): bool
    {
        return $this->dataObject->getData(self::KEY_IS_SEARCHABLE) ?? false;
    }

    public function setIsSearchable(bool $isSearchable): self
    {
        $this->dataObject->setData(self::KEY_IS_SEARCHABLE, $isSearchable);

        return $this;
    }

    /**
     * @return OptionInterface[]
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * @param OptionInterface[] $options
     */
    public function setOptions(array $options): self
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Export data to array.
     */
    public function toArray(): array
    {
        $data = parent::toArray();
        $options = $this->getOptions();
        if (count($options)) {
            $optionData = [];
            foreach ($options as $option) {
                if ($option instanceof ArrayableInterface) {
                    $optionData[] = $option->toArray();
                } elseif (is_array($option)) {
                    $optionData[] = $option;
                }
            }
            $data[self::KEY_OPTIONS] = $optionData;
        }

        return $data;
    }
}
