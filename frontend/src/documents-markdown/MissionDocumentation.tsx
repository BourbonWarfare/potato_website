import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MissionDocumentation = () => {
  // eslint-disable-next-line global-require
  const missionMarkdown = require('./missionMarkdown.md');
  const [mdText, setMdText] = React.useState('');
  fetch(missionMarkdown)
    .then((res) => res.text())
    .then((text) => setMdText(text));

  const missionDocumentationArray = mdText.split(/^(?=#+ )/m).filter(Boolean);

  const docTitles = missionDocumentationArray.map((e: any) => {
    return e.split(/\r\n\r\n/m).filter(Boolean)[0];
  });

  const docText = missionDocumentationArray.map((e: any) => {
    return e.split(/\r\n\r\n/m).filter(Boolean);
  });

  docText.map((e) => {
    return e.shift();
  });
  return (
    <React.Fragment key="mission-doc">
      {docTitles.map((p, i) => {
        const title = docTitles[i].split(' ')[1];
        const children = docText[i].join('\r\n\r\n');
        return (
          <div key={title}>
            <h3 id={title}>
              <span>{title}</span>
              <a href={title} className="anchor">
                #
              </a>
            </h3>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {children}
            </ReactMarkdown>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default MissionDocumentation;
