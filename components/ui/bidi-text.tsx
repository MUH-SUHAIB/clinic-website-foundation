/** Isolate Latin text and numeric values without changing their character order. */
export function BidiText({ children }: { children: string }) {
  return children.split(/(\(?[A-Za-z0-9]+(?:[ .:+/&–-][A-Za-z0-9]+)*\+?\)?)/g).map((part, index) =>
    index % 2 ? <bdi dir="ltr" key={index}>{part}</bdi> : part
  );
}
