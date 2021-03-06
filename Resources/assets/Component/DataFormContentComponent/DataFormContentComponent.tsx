/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import SectionRenderComponent from "@EveryWorkflow/DataFormBundle/Component/SectionRenderComponent";
import FieldRenderComponent from "@EveryWorkflow/DataFormBundle/Component/FieldRenderComponent";
import FormContext from '@EveryWorkflow/DataFormBundle/Context/FormContext';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Anchor from 'antd/lib/anchor';
import PanelContext from '@EveryWorkflow/PanelBundle/Context/PanelContext';

const DataFormContentComponent = () => {
    const { state: panelState } = useContext(PanelContext);
    const { state: formState } = useContext(FormContext);

    const getSortedSectionData = (sections: Array<any>): Array<any> => {
        return sections?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderContent = useCallback(() => {
        return (
            <>
                {(formState.form_data?.fields && formState.form_data?.fields.length > 0) && (
                    <FieldRenderComponent fields={formState.form_data.fields} />
                )}
                {(formState.form_data?.sections && formState.form_data?.sections.length > 0) && (
                    <SectionRenderComponent sections={formState.form_data.sections} />
                )}
            </>
        );
    }, [formState.form_data]);

    if (formState.form_data?.is_side_form_anchor_enable) {
        if (formState.form_data?.side_form_anchor_position === 'right') {
            return (
                <Row>
                    <Col md={{ order: 2, span: 4 }}>
                        <Anchor affix={!panelState.is_mobile} offsetTop={55 + 16} style={{ marginBottom: 24 }}>
                            {getSortedSectionData(formState.form_data?.sections ?? []).map((item: any, index: number) => (
                                <Anchor.Link key={index.toString()} href={'#form-section-' + item.code} title={item.title} />
                            ))}
                        </Anchor>
                    </Col>
                    <Col md={{ order: 1, span: 20 }}>
                        {renderContent()}
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col md={{ span: 4 }} style={{ paddingLeft: 16 }}>
                        <Anchor affix={!panelState.is_mobile} offsetTop={55 + 16} style={{ marginBottom: 24 }}>
                            {getSortedSectionData(formState.form_data?.sections ?? []).map((item: any, index: number) => (
                                <Anchor.Link key={index.toString()} href={'#form-section-' + item.code} title={item.title} />
                            ))}
                        </Anchor>
                    </Col>
                    <Col md={{ span: 20 }}>
                        {renderContent()}
                    </Col>
                </Row>
            );
        }
    }

    return (
        <>
            {renderContent()}
        </>
    );
};

export default DataFormContentComponent;
