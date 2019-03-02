declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void }
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}
declare var System: System

declare module '*.scss' {
  const content: any
  export default content
}

declare interface RequestError {
  message: string
}