import createTheme from "../../createTheme";

const colors = {
  // https://www.canva.com/design/DADfDZHKm5E/remix?action2=create&mediaId=DADfDZHKm5E&signupReferrer=blog&utm_source=blog&utm_medium=content&utm_campaign=100-color-combinations&%24desktop_url=https%3A%2F%2Fwww.canva.com%2Fdesign%2FDADfDZHKm5E%2Fremix&uid=edd76747-b3d9-4e6f-a62c-494634007887&_branch_match_id=719432298129156966
  primary: "#505160", // "Thunder Cloud"
  secondary: "#ffffff", // white
  tertiary: "#AEBD38", // Moss
  quaternary: "#598234" // Meadow
};

const fonts = {
  primary: "Nunito Sans",
  secondary: "Georgia",
  tertiary: "Monaco",
  quaternary: "Cinzel Decorative"
}

const theme = createTheme(colors, fonts, {
    progress: {
      pacmanTop: {
        background: colors.quaternary
      },
      pacmanBottom: {
        background: colors.quaternary
      },
      point: {
        borderColor: colors.quaternary
      }
    },
    components: {
      heading: {
        h1: {
          fontSize: '8rem',
          fontFamily: fonts.quaternary 

        },
        h2: {
          fontSize: '5rem',
        },
        h3: {
          fontSize: '3rem',
          fontFamily: fonts.secondary,
          color: '#FFFFFF'
        },
        h4: {
          fontSize: '2.5rem',
        },
        h5: {
          fontSize: '2rem',
        },
        h6: {
          fontSize: '1.5rem',
        }
      },
      codePane: {
        fontSize: '1.25rem'
      },
      link: {
        color: "#AEBD38" // Moss
      }
    }
  });

export default theme;