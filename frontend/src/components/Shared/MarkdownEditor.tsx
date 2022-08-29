import { Editor, EditorState } from 'draft-js';
import React from 'react';

const MarkdownEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default MarkdownEditor;
