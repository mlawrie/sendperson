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
const color = {
  darkGrey: '#999',
  almostBlack: '#999'
}

const baseLayout = {
  borderRadius: 'border-radius: 3px;',
  padding: '15px',
  lineHeight: 'line-height: 20px;',
  largeComponent: {
    height: '40px'
  },
  font: {
    smallTitle: `font-family: Helvetica, Arial, sans-serif; font-size: 12px; text-transform: uppercase; color: ${color.almostBlack}; line-height: 40px;`,
    medium: 'font-family: Helvetica, Arial, sans-serif; font-size: 18px;'
  },
  border: {
    regular: `border: 1px solid ${color.darkGrey}; border-radius: 3px;`,
  }
}

export const layout = deepExtend(baseLayout, color, {
  largeInput: `
      box-sizing: border-box;
      ${baseLayout.font.medium}
      border: 1px solid ${color.darkGrey}; ${baseLayout.borderRadius}; 
      padding: 0 10px;
      height: ${baseLayout.largeComponent.height};
      line-height: ${baseLayout.largeComponent.height};
      ${baseLayout.borderRadius}`
}
)