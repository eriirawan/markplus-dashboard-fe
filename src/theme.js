import { createTheme as createThemeMui } from '@mui/material/styles';

// A custom theme for this app
const createTheme = (color) =>
  createThemeMui({
    components: {
      /** Customize Autocomplete  */
      MuiAutocomplete: {
        defaultProps: {
          size: 'small', // default size `small`
        },
        styleOverrides: {
          root: () => ({
            '& fieldset': {
              borderColor: color?.color2 || '#006CB7',
              borderWidth: '1px',
            },
            ':hover': {
              borderColor: color?.color2 || '#006CB7',
            },
          }),
        },
      },

      /** Customize button  */
      MuiButton: {
        defaultProps: {
          size: 'large', // default button size is `large`
          variant: 'contained', // default variant of button
        },
        styleOverrides: {
          root: ({ ownerState, theme: currentTheme }) => ({
            // size `large`
            ...(ownerState.size === 'large' && {
              fontSize: currentTheme.typography.body1.fontSize,
              fontWeight: currentTheme.typography.body1.fontWeight,
              height: '40px',
              lineHeight: currentTheme.typography.body1.lineHeight,
            }),

            // size `medium`
            ...(ownerState.size === 'medium' && {
              fontSize: currentTheme.typography.body1.fontSize,
              fontWeight: currentTheme.typography.body1.fontWeight,
              height: '32px',
              lineHeight: currentTheme.typography.body1.lineHeight,
            }),

            // size `small`
            ...(ownerState.size === 'small' && {
              fontSize: currentTheme.typography.body2.fontSize,
              fontWeight: currentTheme.typography.body2.fontWeight,
              height: '24px',
              lineHeight: currentTheme.typography.body2.lineHeight,
            }),

            // inherit button custom style
            ...(ownerState.color === 'inherit' &&
              (ownerState.variant === 'contained' || ownerState.variant === 'outlined') && {
                backgroundColor: 'white',
                border: '1px solid',
                borderColor: currentTheme.palette.neutral.lightGrey,
              }),

            ...(ownerState.variant === 'contained' && {
              ':hover': {
                backgroundColor: `${color?.color2} !important`,
                opacity: 0.8,
              },
            }),

            ...(ownerState.variant === 'outlined' && {
              ':hover': {
                opacity: 0.8,
                // backgroundColor: 'white',
                borderColor: color?.color2,
              },
            }),

            ...(ownerState.color === 'error' &&
              ownerState.variant === 'contained' && {
                ':hover': {
                  backgroundColor: `${currentTheme.palette.error.main} !important`,
                  opacity: 0.8,
                },
              }),

            ...(ownerState.color === 'error' &&
              ownerState.variant === 'outlined' && {
                ':hover': {
                  borderColor: `${currentTheme.palette.error.main}`,
                  opacity: 0.8,
                },
              }),

            // radius
            borderRadius: 5,

            // text transform to `none`
            textTransform: 'capitalize',
          }),
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
          },
        },
      },

      MuiCheckbox: {
        defaultProps: {
          size: 'small', // default size `small`
        },
        styleOverrides: {
          root: {
            color: '#ABBAD0',
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: () => ({
            '& fieldset': {
              borderColor: color?.color2 || '#006CB7',
              borderWidth: '1px',
            },
            ':hover': {
              borderColor: color?.color2 || '#006CB7',
            },
          }),
        },
      },

      /** Customize Divider  */
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: color?.color2 || '#006CB7',
          },
        },
      },

      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            '&$error': {
              color: '#F75D4F',
            },
            color: '#F75D4F',
          },
          root: {
            color: color?.color2 || '#006CB7',
          },
        },
      },

      MuiGrid: {
        styleOverrides: {
          root: {
            '& .react-datepicker-wrapper input': {
              border: 'none',
              height: 32,
              width: '100%',
            },
            '& .react-datepicker-wrapper input::placeholder': {
              color: '#ABBAD0',
            },
          },
        },
      },

      MuiOutlinedInput: {
        defaultProps: {
          size: 'small', // default size `small`
        },
        styleOverrides: {
          root: () => ({
            '& fieldset': {
              borderColor: color?.color2 || '#006CB7',
              borderWidth: '1px',
            },
            ':hover': {
              borderColor: `${color?.color2 || '#006CB7'} !important`,
            },
            color: '#002245',
          }),
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            fontSize: 14,
            padding: 0,
            paddingBottom: '4px',
            paddingTop: '4px',
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            '& th': {
              fontFamily: ['Poppins', 'sans-serif'].join(','),
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
        },
      },

      /** Customize Textfield  */
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: () => ({
            '& fieldset': {
              borderColor: color?.color2 || '#006CB7',
              borderWidth: '1px',
            },
            ':hover': {
              borderColor: color?.color2 || '#006CB7',
            },
          }),
        },
      },

      /** Customize typography / font  */
      MuiTypography: {
        defaultProps: {
          color: color?.color2 || '#006CB7',
        },
      },
    },

    palette: {
      error: {
        100: '#FEF2F1', // Danger | 10%
        200: '#FDDFDC', // Danger | 20%
        300: '#F75D4F', // Danger | 80%
        400: '#D13F31', // Danger | 100%
        main: '#F75D4F', // Danger | 80%
        light: '#E56363',
      },
      neutral: {
        disabledGrey: '#FBFBFC',
        greyScale01: '#002245',
        greyScale02: '#5E758D',
        greyScale03: '#ABBAD0',
        greyScale04: '#C7D5EA',
        lightGrey: '#E3EAF1',
        lighterGrey: '#F0F6FC',
      },
      primary: {
        100: '#EBF6FD', // Alice Blue Solid
        200: '#CCE8FA', // Water Solid
        300: '#99D1F4', // Blue Eyes Solid
        400: '#7BBFFF', // Main Blue | 20%
        500: '#008DE4', // Main Blue | 40%
        600: '#0067E7', // Main Blue | 80%
        700: '#023C9B', // Main Blue | 100%
        light: '#CCE8FA',
        main: color?.color2 || '#006CB7',
        container: color?.color2 || '#006CB7',
        table: color?.color5 || '#00000',
      },
      secondary: {
        main: color?.color3 || '#000000',
      },
      bgcolor: {
        main: color?.color1 || '#F5F5F5',
        header: color?.color1 || '#F5F5F5',
        card: color?.color4 || '#f0f0f0',
        sideBar: color?.colorSideBar || '#ffffff',
      },
      success: {
        100: '#ECFBF5', // Success  10%
        200: '#D0F4E5', // Success  20%
        300: '#13C77F', // Success  80%
        400: '#119460', // Success  100%
        main: '#13C77F', // Success  80%
      },
      text: {
        disabled: '#ABBAD0',
        lightPrimary: '#2E459A',
        primary: '#000',
        secondary: '#5E758D',
      },
      warning: {
        100: '#FFFAEB', // Warning | 8%
        200: '#FFF1CC', // Warning | 20%
        300: '#FFBB00', // Warning | 80%
        400: '#E47D09', // Warning | 100%
        main: '#FFBB00', // Warning | 80%
      },
    },

    shadows: Array(25).fill('none'),
    /**
     * NOTES:
     * Untuk penggunaan `spacing` adalah seperti berikut:
     * Untuk nilai default adalah 8.
     *
     * Penggunaan adalah di kali, misal ingin menambahkan space
     * sebesar `24`, maka `<Box mx={3} />`, kenapa 3?
     * karena 8*3 = 24
     */
    spacing: 8,
    typography: {
      // represent default body
      body1: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
      },

      // represent small body text
      body2: { fontSize: '12px', fontWeight: 400, lineHeight: '16px' },

      fontFamily: ['Poppins', 'sans-serif'].join(','),

      h1: {
        fontSize: '30px',
        fontWeight: 700,
        lineHeight: '39px',
      },

      h2: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '32px',
      },

      h3: {
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '24px',
      },

      h4: {
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '20px',
      },

      h5: {
        fontSize: '12px',
        fontWeight: 700,
        lineHeight: '16px',
      },

      h6: {
        fontSize: '11px',
        fontWeight: 700,
        lineHeight: '14px',
      },
    },
  });

export default createTheme;
