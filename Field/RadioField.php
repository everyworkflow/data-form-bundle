<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Field;

use EveryWorkflow\CoreBundle\Model\DataObjectInterface;
use EveryWorkflow\CoreBundle\Support\ArrayableInterface;
use EveryWorkflow\DataFormBundle\Field\Select\OptionInterface;

class RadioField extends AbstractField implements RadioFieldInterface
{
    protected string $fieldType = 'radio_field';

    /**
     * @var OptionInterface[]
     */
    protected array $options = [];

    public function __construct(DataObjectInterface $dataObject)
    {
        if ($dataObject->getData(self::KEY_OPTIONS)) {
            $this->options = $dataObject->getData(self::KEY_OPTIONS);
            $dataObject->setData(self::KEY_OPTIONS, null);
        }
        parent::__construct($dataObject);
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
     * @return self
     */
    public function setOptions(array $options): self
    {
        $items = [];
        foreach ($options as $option) {
            if ($option instanceof OptionInterface) {
                $items[] = $option;
            }
        }
        $this->options = $items;
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
