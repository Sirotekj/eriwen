import xss from 'xss';

export default function SafeContent(html: string) {
  const clean = xss(html);

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
