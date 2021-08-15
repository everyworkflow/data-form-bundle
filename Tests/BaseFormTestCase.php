<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

namespace EveryWorkflow\DataFormBundle\Tests;

use EveryWorkflow\DataFormBundle\Factory\FormFactory;
use EveryWorkflow\DataFormBundle\Factory\FormFactoryInterface;
use EveryWorkflow\DataFormBundle\Factory\FormFieldFactory;
use EveryWorkflow\DataFormBundle\Factory\FormFieldFactoryInterface;
use EveryWorkflow\DataFormBundle\Model\DataFormConfigProvider;
use EveryWorkflow\DataFormBundle\Model\DataFormConfigProviderInterface;
use EveryWorkflow\MongoBundle\Tests\BaseMongoTestCase;
use Symfony\Component\DependencyInjection\ContainerInterface;

class BaseFormTestCase extends BaseMongoTestCase
{
    protected function getFormConfigProvider(ContainerInterface $container): DataFormConfigProviderInterface
    {
        return new DataFormConfigProvider($container->getParameter('data_form'));
    }

    protected function getFormFieldFactory(
        DataFormConfigProviderInterface | ContainerInterface $configProviderOrContainer
    ): FormFieldFactoryInterface {
        if ($configProviderOrContainer instanceof DataFormConfigProviderInterface) {
            return new FormFieldFactory($this->getContainer(), $configProviderOrContainer);
        }

        return new FormFieldFactory(
            $this->getContainer(),
            $this->getFormConfigProvider($configProviderOrContainer)
        );
    }

    protected function getFormFactory(
        FormFieldFactoryInterface | ContainerInterface $formFieldFactoryOrContainer
    ): FormFactoryInterface {
        if ($formFieldFactoryOrContainer instanceof FormFieldFactoryInterface) {
            return new FormFactory($this->getDataObjectFactory(), $formFieldFactoryOrContainer);
        }

        return new FormFactory($this->getDataObjectFactory(), $this->getFormFieldFactory($formFieldFactoryOrContainer));
    }
}
