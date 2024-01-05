import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export const JoditComponent = ({placeholder,content,setContent}) => {
	const editor = useRef(null);

	const config:any = useMemo( ()=>{
        console.log("use memo call");
		return {
            "buttons": "bold,italic,underline,strikethrough,source,fullsize",
            "toolbarAdaptive": false,
            "showCharsCounter": false,
            "showWordsCounter": false,
            "showXPathInStatusbar": false,
            "placeholder": placeholder || 'Start typings...',
            "uploader": {
              url: 'http://192.168.1.179:3001/knowledgebase/upload',
              isSuccess: function (resp:any) {
                return true;
              },
             
        
            },
            
        }
    },[placeholder])
	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
	);
};
