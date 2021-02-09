import { Properties as CSSProperties, Pseudos as CSSPsuedos } from 'csstype';
import { KeyframesAddon } from 'nano-css/addon/keyframes'

type Unitless = string | number;
type StringKeyValue = { [name: string]: string }
type UnitlessKeyValue = { [name: string]: Unitless }
type AnyKeyValue = { [name: string]: any }
type CSSPropertyNames = keyof CSSProperties

export type StyleObject = CSSProperties | CSSPsuedos | {
  [property: string]: StyleObject;
}
export type HypostyleProperties = CSSPropertyNames | CSSPsuedos | string;
export type HypostyleObject = CSSProperties | CSSPsuedos | {
  [property in HypostyleProperties]: HypostyleObject | string | number | boolean | undefined;
}

export interface Tokens {
  color?: StringKeyValue | string[];
  space?: Unitless[] | UnitlessKeyValue;
  width?: UnitlessKeyValue | Unitless[];
  zIndex?: Unitless[] | UnitlessKeyValue;
  fontSize?: string[] | StringKeyValue;
  fontFamily?: StringKeyValue;
  fontWeight?: Unitless[] | UnitlessKeyValue;
  lineHeight?: Unitless[] | UnitlessKeyValue;
}

export interface Shorthands {
  [shorthand: string]: {
    properties: CSSPropertyNames[];
    token?: keyof Tokens;
    unit?: (v: any) => string;
  }
}

export interface Macros {
  [macro: string]: HypostyleObject;
}

export interface Variants {
  [variation: string]: {
    [name: string]: HypostyleObject;
  }
}

export interface UserTheme {}

export type Theme = {
  breakpoints?: Unitless[];
  tokens?: Tokens;
  shorthands?: Shorthands;
  macros?: Macros;
  variants?: Variants;
} & UserTheme

export type Options = {}

export declare function hypostyle(theme?: Theme, options?: Options): {
  css(
    props: ((tokens: Theme['tokens']) => Partial<HypostyleObject>) |
    Partial<HypostyleObject>
  ): string;
  injectGlobal(props: Partial<HypostyleObject>): any;
  keyframes: KeyframesAddon['keyframes'];
  flush(): string;
  style(props: Partial<HypostyleObject>): StyleObject;
  pick(props: Partial<HypostyleObject>): {
    props: AnyKeyValue;
    styles: HypostyleObject;
  };
}
