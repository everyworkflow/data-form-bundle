/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Card from 'antd/lib/card';
import CardSectionInterface from "@EveryWorkflow/DataFormBundle/Model/Section/CardSectionInterface";
import FieldRenderComponent from "@EveryWorkflow/DataFormBundle/Component/FieldRenderComponent";
import SectionRenderComponent from "@EveryWorkflow/DataFormBundle/Component/SectionRenderComponent";

interface CardSectionProps {
    sectionData: CardSectionInterface;
}

const CardSection = ({ sectionData }: CardSectionProps) => {
    return (
        <>
            <Card
                className="app-container"
                title={sectionData.title}
                style={{ marginBottom: 24 }}>
                {(sectionData?.fields && sectionData?.fields.length > 0) && (
                    <FieldRenderComponent fields={sectionData.fields} />
                )}
                {(sectionData?.sections && sectionData?.sections.length > 0) && (
                    <SectionRenderComponent sections={sectionData.sections} />
                )}
            </Card>
        </>
    );
};

export default CardSection;
