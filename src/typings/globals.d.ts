// tslint:disable-next-line
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare interface INodeModule {
  hot?: { accept: (path: string, callback: () => void) => void }
}

declare interface ISystem {
  import<T = any>(module: string): Promise<T>
}
declare var System: System

declare module '*.scss' {
  const content: any
  export default content
}

declare interface IRequestError {
  message: string
  status: number
}
