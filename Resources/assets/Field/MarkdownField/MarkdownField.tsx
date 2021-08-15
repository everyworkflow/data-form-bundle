/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useState} from 'react';
import Form from 'antd/lib/form';
import TextareaFieldInterface from '@EveryWorkflow/DataFormBundle/Model/Field/TextareaFieldInterface';
import MediaPanelComponent from "@EveryWorkflow/MediaManagerBundle/Component/MediaPanelComponent";
import {MEDIA_MANAGER_TYPE_SINGLE_SELECT} from "@EveryWorkflow/MediaManagerBundle/Component/MediaManagerComponent/MediaManagerComponent";
import SelectedMediaItemInterface from "@EveryWorkflow/MediaManagerBundle/Model/SelectedMediaItemInterface";
import DynamicFieldPropsInterface from "@EveryWorkflow/DataFormBundle/Model/DynamicFieldPropsInterface";
import SimpleMDE from "react-simplemde-editor";
import '@EveryWorkflow/DataFormBundle/Field/MarkdownField/MarkdownStyle.scss';
import "easymde/dist/easymde.min.css";
import UrlHelper from '@EveryWorkflow/CoreBundle/Helper/UrlHelper';

interface MarkdownFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextareaFieldInterface;
}

const MarkdownField = ({fieldData, onChange, children, form}: MarkdownFieldProps) => {
    const [simpleMD, setSimpleMD] = useState<EasyMDE | undefined>(undefined)
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);

    const handleChange = (value: string) => {
        const updateValues: any = {};
        if (fieldData.name) {
            updateValues[fieldData.name] = value;
        }
        if (Object.keys(updateValues).length) {
            form.setFieldsValue(updateValues);
        }
        if (onChange) {
            onChange(value);
        }
    };

    const onMediaImageSelected = (items: Array<SelectedMediaItemInterface>) => {
        if (items.length) {
            const imageMdText = '![' + items[0].title + '](' + UrlHelper.buildImgUrlFromPath(items[0].path_name) + ')';
            simpleMD?.codemirror.replaceSelection(imageMdText);
        }
    }

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={fieldData.label}
                initialValue={fieldData.value}
                rules={[{required: fieldData.is_required}]}
            >
                <SimpleMDE
                    getMdeInstance={(instance) => {
                        setSimpleMD(instance);
                    }}
                    onChange={handleChange}
                    options={{
                        toolbar: [
                            'bold',
                            'italic',
                            'strikethrough',
                            'heading',
                            '|',
                            'code',
                            'quote',
                            'unordered-list',
                            'ordered-list',
                            'clean-block',
                            '|',
                            'link',
                            'table',
                            'horizontal-rule',
                            {
                                name: "media_image_selector",
                                action: () => {
                                    setIsMediaSelectorEnabled(true);
                                },
                                className: "fa fa-image",
                                title: "Media image selector",
                            },
                            '|',
                            'preview',
                            'side-by-side',
                            'fullscreen',
                            '|',
                            'guide',
                            'undo',
                            'redo'
                        ],
                        maxHeight: '500px',
                    }}
                />
            </Form.Item>
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_SINGLE_SELECT}
                    onSelectedDataChange={onMediaImageSelected}
                    onClose={() => {
                        setIsMediaSelectorEnabled(false);
                    }}
                />
            )}
            {children}
        </>
    );
};

export default MarkdownField;
