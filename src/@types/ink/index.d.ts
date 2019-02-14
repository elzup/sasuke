// Type definitions for ink 0.5
// Project: https://github.com/vadimdemedes/ink#readme
// Definitions by: Carlos Precioso <https://github.com/cprecioso>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/// <reference types="node" />

declare module 'ink' {
  import {
    ReactNode,
    ReactComponentElement,
    Component,
    ComponentType,
  } from 'react'
  export function h(...args: any[]): any
  export function render(vdom: ReactNode): void

  export const Fragment: ComponentType

  export const Color: ComponentType<{
    rgb?: [number, number, number]
    hsl?: [number, number, number]
    hsv?: [number, number, number]
    hwb?: [number, number, number]
    hex?: string
    keyword?: string
    bgRgb?: [number, number, number]
    bgHsl?: [number, number, number]
    bgHsv?: [number, number, number]
    bgHwb?: [number, number, number]
    bgHex?: string
    bgKeyword?: string
    reset?: boolean
    bold?: boolean
    dim?: boolean
    italic?: boolean
    underline?: boolean
    inverse?: boolean
    hidden?: boolean
    strikethrough?: boolean
    visible?: boolean
    black?: boolean
    red?: boolean
    green?: boolean
    yellow?: boolean
    blue?: boolean
    magenta?: boolean
    cyan?: boolean
    white?: boolean
    gray?: boolean
    grey?: boolean
    blackBright?: boolean
    redBright?: boolean
    greenBright?: boolean
    yellowBright?: boolean
    blueBright?: boolean
    magentaBright?: boolean
    cyanBright?: boolean
    whiteBright?: boolean
    bgBlack?: boolean
    bgRed?: boolean
    bgGreen?: boolean
    bgYellow?: boolean
    bgBlue?: boolean
    bgMagenta?: boolean
    bgCyan?: boolean
    bgWhite?: boolean
    bgBlackBright?: boolean
    bgRedBright?: boolean
    bgGreenBright?: boolean
    bgYellowBright?: boolean
    bgBlueBright?: boolean
    bgMagentaBright?: boolean
    bgCyanBright?: boolean
    bgWhiteBright?: boolean
  }>

  export const Bold: ComponentType
  export const Underline: ComponentType
}