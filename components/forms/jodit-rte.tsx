import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './jodit-rte.css';

type Props = {
  name: string;
  defaultValue?: string;
};

const JoditRTE = ({ name, defaultValue }: Props) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  //const [content, setContent] = useState(defaultValue ?? '');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Zde můžete začít psát...',
      toolbarAdaptive: false,
      buttons: [
        {
          name: 'basic',
          buttons: [
            'bold',
            'italic',
            'underline',
            '|',
            'ul',
            'ol',
            '|',
            'paragraph',
          ],
        },
      ],
      controls: {
        paragraph: {
          list: {
            p: 'Odstavec',
            h4: 'Nadpis 4',
            blockquote: 'Citace',
          },
        },
      },
    }),
    [],
  );

  /*const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);*/

  return (
    <div className="mb-6">
      <JoditEditor
        //value={content}
        value={defaultValue ?? ''}
        config={config}
        //onChange={handleChange}
        onBlur={(newContent) => {
          if (hiddenInputRef.current) {
            hiddenInputRef.current.value = newContent;
          }
        }}
      />
      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        //value={content}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  );
};

export default JoditRTE;
