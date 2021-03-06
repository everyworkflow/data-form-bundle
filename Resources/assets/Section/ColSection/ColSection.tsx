/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import ColSectionInterface from "@EveryWorkflow/DataFormBundle/Model/Section/ColSectionInterface";
import FieldRenderComponent from "@EveryWorkflow/DataFormBundle/Component/FieldRenderComponent";
import SectionRenderComponent from "@EveryWorkflow/DataFormBundle/Component/SectionRenderComponent";
import Col from 'antd/lib/col';

interface ColSectionProps {
    sectionData: ColSectionInterface;
}

const ColSection = ({ sectionData }: ColSectionProps) => {
    return (
        <>
            <Col
                flex={sectionData.flex}
                offset={sectionData.offset}
                order={sectionData.order}
                pull={sectionData.pull}
                push={sectionData.push}
                span={sectionData.span}
                sm={sectionData.sm}
                md={sectionData.md}
                lg={sectionData.lg}
                xl={sectionData.xl}
                xxl={sectionData.xxl}>
                {(sectionData?.fields && sectionData?.fields.length > 0) && (
                    <FieldRenderComponent fields={sectionData.fields} />
                )}
                {(sectionData?.sections && sectionData?.sections.length > 0) && (
                    <SectionRenderComponent sections={sectionData.sections} />
                )}
            </Col>
        </>
    );
};

export default ColSection;
