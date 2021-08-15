<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Factory;

use EveryWorkflow\CoreBundle\Model\DataObjectFactoryInterface;
use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;
use EveryWorkflow\DataFormBundle\Model\Form;
use EveryWorkflow\DataFormBundle\Model\FormInterface;

class FormFactory implements FormFactoryInterface
{
    protected DataObjectFactoryInterface $dataObjectFactory;
    protected FormFieldFactoryInterface $formFieldFactory;

    public function __construct(
        DataObjectFactoryInterface $dataObjectFactory,
        FormFieldFactoryInterface $formFieldFactory
    ) {
        $this->dataObjectFactory = $dataObjectFactory;
        $this->formFieldFactory = $formFieldFactory;
    }

    /**
     * @param AbstractFieldInterface[] $fields
     */
    public function create(array $fields = [], array $data = []): FormInterface
    {
        return (new Form($this->dataObjectFactory->create($data), $this->formFieldFactory))->addFields($fields);
    }
}
