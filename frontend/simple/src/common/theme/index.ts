export interface AppLayoutTemplates {
  flex: () => object;
  flexColumn: () => object;
  flexRow: () => object;
  flexNoWrap: () => object;
  flexCenter: () => object;
  flexGrow: () => object;
}

export interface AppTheme {
  palette: {
    success: string,
    accent: string,
    secondary: string,
    warning: string,
    error: string,
    link: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
    }
  },
  layout: {
    templates: AppLayoutTemplates
  },
  spacing: (u1: number, u2?: number, u3?: number, u4?: number) => string | number
}



