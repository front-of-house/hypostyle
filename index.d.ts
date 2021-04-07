import { Properties as CSSProperties, Pseudos as CSSPsuedos } from 'csstype';
import { KeyframesAddon } from 'nano-css/addon/keyframes'

type Unitless = string | number;
type UnitlessKeyValue = { [name: string]: Unitless }
type AnyKeyValue = { [name: string]: any }
type CSSPropertyNames = keyof CSSProperties
type HTMLTagNames = keyof HTMLElementTagNameMap

export type StyleObject = CSSProperties | CSSPsuedos | HTMLTagNames | {
  [property: string]: StyleObject;
}
export type HypostyleProperties = CSSPropertyNames & CSSPsuedos & HTMLTagNames & string;
export type HypostyleResponsiveObject = { [k: number]: Unitless }
export type HypostyleObject = {
  [property in HypostyleProperties]: HypostyleObject | HypostyleResponsiveObject | string | number | string[] | number[] | boolean | undefined;
}
export type HypostyleObjectOrFunction = ((theme: Theme) => HypostyleObject) | HypostyleObject

export type Tokens = {
  [property in CSSPropertyNames]?: Unitless | Unitless[] | UnitlessKeyValue;
}

export type Shorthands = {
  [shorthand: string]: CSSPropertyNames | CSSPropertyNames[];
}

export type Macros = {
  [macro: string]: HypostyleObject;
}

export type Variants = {
  [variation: string]: {
    [name: string]: HypostyleObject;
  }
}

export type CSSProps = {
  [property in CSSPropertyNames]?: {
    token?: keyof Tokens;
    unit?(value: any): string;
  }
}

export interface UserTheme {}

export type Theme = {
  breakpoints?: Unitless[];
  tokens?: Tokens;
  shorthands?: Shorthands;
  macros?: Macros;
  variants?: Variants;
  properties?: CSSProps;
} & UserTheme

export type Options = {}

export type Hypostyle = {
  explode(props: HypostyleObjectOrFunction): HypostyleObject;
  style(props: HypostyleObjectOrFunction): StyleObject;
  css(props: HypostyleObjectOrFunction): string;
  pick(props: HypostyleObject & AnyKeyValue): {
    props: AnyKeyValue;
    styles: HypostyleObject;
  };
  injectGlobal(props: HypostyleObject): void;
  keyframes: KeyframesAddon['keyframes'];
  flush(): string;
  theme: Theme;
}

export function hypostyle(theme?: Theme, options?: Options): Hypostyle
