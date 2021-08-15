<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle\Factory;

use EveryWorkflow\CoreBundle\Helper\Trait\GenerateSetMethodNameTrait;
use EveryWorkflow\DataFormBundle\Field\AbstractFieldInterface;
use EveryWorkflow\DataFormBundle\Model\DataFormConfigProviderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class FormFieldFactory implements FormFieldFactoryInterface
{
    use GenerateSetMethodNameTrait;

    protected ContainerInterface $container;
    protected DataFormConfigProviderInterface $dataFormConfigProvider;

    public function __construct(
        ContainerInterface $container,
        DataFormConfigProviderInterface $dataFormConfigProvider
    ) {
        $this->container = $container;
        $this->dataFormConfigProvider = $dataFormConfigProvider;
    }

    public function create(string $className, array $data = []): ?AbstractFieldInterface
    {
        if ($this->container->has($className)) {
            $field = $this->container->get($className);
            if ($field instanceof AbstractFieldInterface) {
                foreach ($data as $key => $val) {
                    $methodName = $this->generateSetMethodName($key);
                    if (method_exists($field, $methodName)) {
                        $field->$methodName($val);
                    }
                }
                return $field;
            }
        }
        return null;
    }

    public function createFieldFromType(string $fieldType, array $data = []): ?AbstractFieldInterface
    {
        $fields = $this->dataFormConfigProvider->get('fields');
        if (isset($fields[$fieldType])) {
            return $this->create($fields[$fieldType], $data);
        }
        return $this->createField($data);
    }

    public function createField(array $data = []): ?AbstractFieldInterface
    {
        $fields = $this->dataFormConfigProvider->get('fields');
        if (isset($data['field_type'], $fields[$data['field_type']])) {
            return $this->create($fields[$data['field_type']], $data);
        }
        $fieldType = $this->dataFormConfigProvider->get('default.field');
        return $this->create($fields[$fieldType], $data);
    }
}
