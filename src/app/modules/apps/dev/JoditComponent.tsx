import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

type propstype={
  placeholder:string,
  content:any,
  setContent:any
}
export const JoditComponent = ({placeholder,content,setContent}:propstype) => {
	const editor = useRef(null);
  const theme=localStorage.getItem("kt_theme_mode_value");
	const config:any = useMemo( ()=>{
		return {
              "theme": theme,
              "style": theme=="dark" ? {
                "background": "black",
                "color": "white"
              }:{},
            "buttons": "bold,italic,underline,strikethrough,source,fullsize",
            "toolbarAdaptive": false,
            "showCharsCounter": false,
            "showWordsCounter": false,
            "showXPathInStatusbar": false,
            "placeholder": placeholder || 'Start typings...',
            "uploader": {
              url: 'http://localhost:3001/knowledgebase/upload',
              isSuccess: function (resp:any) {
                return true;
              },
             
        
            },
            
        }
    },[placeholder,theme])
    //const css=".jodit-wysiwyg{background-color: black;!important}"

	return (
    <>
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
    </>
	);
};
