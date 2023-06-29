/* eslint-disable-next-line */
export interface BuildableLibProps {
  foo1?: string,
}

export function BuildableLib(props: BuildableLibProps) {
  return (
    <div>
      <h1>Welcome to BuildableLib1.0.1!</h1>
    </div>
  );
}

export default BuildableLib;
