import styles from './buildable-lib.module.css';

/* eslint-disable-next-line */
export interface BuildableLibProps {}

export function BuildableLib(props: BuildableLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BuildableLib!</h1>
    </div>
  );
}

export default BuildableLib;
