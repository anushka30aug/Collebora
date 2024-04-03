declare module 'redux-persist/integration/react' {
    import { ComponentType, ReactNode } from 'react';
    import { PersistGateProps } from 'redux-persist/es/integration/react'; 
    export const PersistGate: ComponentType<PersistGateProps>;
  }
  