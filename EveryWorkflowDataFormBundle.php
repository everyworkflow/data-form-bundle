<?php

/**
 * @copyright EveryWorkflow. All rights reserved.
 */

declare(strict_types=1);

namespace EveryWorkflow\DataFormBundle;

use EveryWorkflow\DataFormBundle\DependencyInjection\DataFormExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class EveryWorkflowDataFormBundle extends Bundle
{
    public function getContainerExtension()
    {
        return new DataFormExtension();
    }
}
