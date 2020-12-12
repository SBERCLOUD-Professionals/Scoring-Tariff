import {GeistUIThemes} from "@geist-ui/react";
import {AppLayoutTemplates, AppTheme} from "@common/theme/index";

const spacing = (gap: number) => (u1: number, u2?: number, u3?: number, u4?: number): string | number => {
  if (u2 === undefined && u3 === undefined && u4 === undefined) return u1 * gap;
  if (u2 !== undefined && u3 === undefined && u4 === undefined) return `${u1 * gap}px ${u2 * gap}px`;
  return `${(u1 || 0) * gap}px ${(u2 || 0) * gap}px ${(u3 || 0) * gap}px ${(u4 || 0) * gap}px`;
}

const createLayoutTemplates = (gap: number): AppLayoutTemplates => {
  return {
    flex: () => ({
      display: "flex",
    }),
    flexColumn: () => ({
      display: "flex",
      flexDirection: "column"
    }),
    flexRow: () => ({
      display: "flex",
      flexDirection: "row"
    }),
    flexCenter: () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    flexGrow: () => ({
      display: "flex",
      flexGrow: 1
    }),
    flexNoWrap: () => ({
      display: "flex",
      flexWrap: "nowrap"
    })
  }
}

export default function createAppTheme(basicTheme: GeistUIThemes): AppTheme {
  const gap = 8;
  return {
    spacing: spacing(gap),
    palette: {
      success: basicTheme.palette.success,
      accent: basicTheme.palette.accents_1,
      secondary: basicTheme.palette.secondary,
      warning: basicTheme.palette.warning,
      error: basicTheme.palette.error,
      link: basicTheme.palette.link,
      text: {
        primary: basicTheme.palette.foreground,
        secondary: basicTheme.palette.secondary,
      }
    },
    layout: {
      templates: createLayoutTemplates(gap)
    }
  }
}