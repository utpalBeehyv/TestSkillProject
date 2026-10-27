import { createTheme } from '@mui/material/styles'

/**
 * MUI theme built from the Figma file's "Foundations" and "UI elements"
 * style-guide boards (file `RFP (Copy)`, page "01 · Rahul screens",
 * frames 221:2189 and 221:2371). Those boards are the file's own
 * consolidated, standardized spec sheet ("measurements standardized to
 * even pixels"), cross-checked against the Sign up (84:339) and Home
 * (84:340) screens.
 *
 * Palette keys are MUI's conventional semantic roles (primary,
 * background.default/paper, text.primary/secondary, …) plus two
 * project-specific roles the file itself names and uses in more than
 * one place: `navy` (the sidebar/context surface) and `pending` (the
 * amber "review / pending" status, distinct from `warning`). Do not
 * read raw hex from this file at call sites — use the palette role
 * (`theme.palette.text.secondary`, `sx={{ color: 'text.secondary' }}`)
 * per best-practices.
 */

// Spacing scale measured on the Foundations board: 4 · 8 · 12 · 16 · 20 · 24 · 32px.
// That is exactly MUI's default 8px spacing function (spacing(0.5)=4, 1=8, 1.5=12,
// 2=16, 2.5=20, 3=24, 4=32), so the default `spacing` factory is kept as-is.

// Shadows measured on the Foundations board ("Shadow · x / y / blur / spread"):
const cardShadow = '0px 2px 12px 0px rgba(16, 41, 71, 0.04)'
const elevatedShadow = '0px 8px 24px 0px rgba(22, 58, 98, 0.12)'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // "Action blue" — primary button fill, active step marker.
      main: '#1570ef',
      // "Text blue" — link/text-button color, selected tab/step text.
      dark: '#175cd3',
      contrastText: '#ffffff',
    },
    // "Sidebar navy" / "Context navy" — the sidebar shell and other dark
    // surfaces. Not a MUI-standard role; the file uses it distinctly from
    // `primary`, so it is kept as its own palette entry.
    navy: {
      main: '#102947',
      light: '#102a56',
      // Selected sidebar item fill + border, measured on the Navigation specimen.
      selected: '#254f80',
      selectedBorder: '#4776ad',
      // Resting (non-selected) sidebar item label color.
      mutedText: '#d3e1f2',
      contrastText: '#ffffff',
    },
    success: {
      // "Success" semantic pair.
      main: '#008236',
      light: '#f0fdf4',
      contrastText: '#008236',
    },
    warning: {
      // "Warning" semantic pair (distinct from the amber "pending" role below).
      main: '#b54708',
      light: '#fffaeb',
      // Notice border color measured on the warning notice specimen.
      border: '#fedf89',
      contrastText: '#b54708',
    },
    // "Review / pending" semantic pair — the file treats this as a separate
    // role from `warning` (different hex pair on the Foundations board), used
    // for in-progress / awaiting-review statuses.
    pending: {
      main: '#a65f00',
      light: '#fefce8',
      contrastText: '#a65f00',
    },
    info: {
      // "Info" semantic pair.
      main: '#175cd3',
      light: '#eff6ff',
      border: '#d3e1f2',
      contrastText: '#175cd3',
    },
    error: {
      // "Error" semantic pair — outlined style (white fill, colored border/text).
      main: '#e7000b',
      contrastText: '#ffffff',
    },
    background: {
      // "Canvas"
      default: '#fafafa',
      // "White surface"
      paper: '#ffffff',
    },
    // "Supporting surface" — table headers, drawer background. Not a
    // standard MUI role; exposed as its own token since call sites need it
    // distinctly from `background.default`.
    supportingSurface: '#f7f9fb',
    divider: '#e5e5e5',
    text: {
      // "Strong text" — headings, emphasized labels.
      primary: '#171717',
      // "Body text" — paragraph and cell copy.
      secondary: '#404040',
    },
    // "Muted metadata" — captions, specs, timestamps. Not a standard MUI
    // role (MUI only has text.primary/secondary); exposed as its own token.
    muted: {
      main: '#536477',
    },
  },
  shape: {
    // Base control radius measured on buttons, fields, notices (8px).
    // Cards and the work table measure 10px and are overridden per component below.
    borderRadius: 8,
  },
  shadows: [
    'none',
    cardShadow,
    cardShadow,
    cardShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
    elevatedShadow,
  ],
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    // "Page title" specimen: 28px / 36px · Bold 700.
    h1: { fontSize: '28px', lineHeight: '36px', fontWeight: 700, letterSpacing: 0 },
    // "Drawer title" specimen: 20px / 28px · Bold 700.
    h2: { fontSize: '20px', lineHeight: '28px', fontWeight: 700, letterSpacing: 0 },
    // "Section / card title" specimen: 16px / 24px · Bold 700.
    h3: { fontSize: '16px', lineHeight: '24px', fontWeight: 700, letterSpacing: 0 },
    // "Body" specimen: 14px / 20px · Regular 400.
    body1: { fontSize: '14px', lineHeight: '20px', fontWeight: 400, letterSpacing: 0 },
    // "Label / navigation" specimen: 14px / 20px · Semi Bold 600.
    subtitle2: { fontSize: '14px', lineHeight: '20px', fontWeight: 600, letterSpacing: 0 },
    // "Caption" specimen (also used for "Specification" captions): 12px / 18px · Regular 400.
    caption: { fontSize: '12px', lineHeight: '18px', fontWeight: 400, letterSpacing: 0 },
    // "Button" specimen: 16px / 24px · Regular 400, no uppercase transform shown.
    button: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#fafafa' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: 8,
          paddingInline: 12,
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        notchedOutline: {
          borderColor: '#e5e5e5',
          borderWidth: 2,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // "Shared card" specimen: radius 10px, border 2px, card shadow.
          borderRadius: 10,
          border: '2px solid #e5e5e5',
          boxShadow: cardShadow,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          // "Notice" specimen: padding 16px, radius 8px, border 2px.
          borderRadius: 8,
          borderWidth: 2,
          borderStyle: 'solid',
          padding: '16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // "Right drawer" specimen: 400px, white, border 2px.
          borderLeft: '2px solid #e5e5e5',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
})

export default theme
