import deepExtend from 'deep-extend'

export type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

export type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

const baseLayout = {
  borderRadius: 'border-radius: 3px;',
  largeComponent: {
    height: '40px'
  },
  font: {
    medium: 'font-family: Helvetica, Arial, sans-serif; font-size: 18px;'
  },
  border: {},
  darkGrey: '#999'
}

export const layout = deepExtend(baseLayout, {
    largeInput: `
      box-sizing: border-box;
      ${baseLayout.font.medium}
      border: 1px solid ${baseLayout.darkGrey}; ${baseLayout.borderRadius}; 
      padding: 0 10px;
      height: ${baseLayout.largeComponent.height};
      line-height: ${baseLayout.largeComponent.height};
      ${baseLayout.borderRadius}`
  }
)