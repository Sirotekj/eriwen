import React, { useState, useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import './jodit-rte.css';

type Props = {
  name: string;
  defaultValue?: string;
};

const JoditRTE = ({ name, defaultValue }: Props) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultValue ?? '');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Zde můžete začít psát...',
      toolbarAdaptive: false,
      buttons: [{ name: 'basic', buttons: ['bold', 'italic'] }],
    }),
    [],
  );

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  return (
    <div className="mb-6">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleChange}
      />
      <input type="hidden" name={name} value={content} />
    </div>
  );
};

export default JoditRTE;
