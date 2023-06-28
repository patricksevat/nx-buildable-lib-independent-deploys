import * as React from 'react';

const RemoteApp1 = React.lazy(() => import('remote-app1/Module'));

const RemoteApp2 = React.lazy(() => import('remote-app2/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <div>
        <p>Hello from Host App</p>
        <div>
          <RemoteApp1 />
          <RemoteApp2 />
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
