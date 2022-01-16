/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Tabs from 'antd/lib/tabs';
import { useNavigate, useLocation } from 'react-router';

interface FormMenuTabItem {
    label: string;
    path: string;
}

interface FormMenuTabComponentProps {
    tabData: Array<FormMenuTabItem>
}

const FormMenuTabComponent = ({ tabData }: FormMenuTabComponentProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ background: 'white' }}>
            <Tabs
                defaultActiveKey={location.pathname}
                centered={true}
                onChange={(key: string) => navigate(key)}
                animated={false}
                style={{ paddingLeft: 16, paddingRight: 16 }}
                tabBarStyle={{
                    marginBottom: 0,
                }}>
                {tabData.map((tab: any) => (
                    <Tabs.TabPane tab={tab.label} key={tab.path} />
                ))}
            </Tabs>
        </div>
    );
};

export default FormMenuTabComponent;