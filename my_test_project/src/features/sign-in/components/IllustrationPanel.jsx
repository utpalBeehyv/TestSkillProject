import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import playIcon from '../../../assets/sign-in/play-icon.svg'

const DOT_WIDTH = 24
const DOT_HEIGHT = 3

/*
 * One-off hex values below (`#dbe7f4`, `#e9f2ff`, `#172b4d`, `#52657d`,
 * `#cfdbeb`, `#193b60`, `#93b0cd`, `#b8d0e9`, and `#E3EFFF` in
 * `PauseGlyph` below) are Figma-measured and specific to this screen's
 * dark illustration panel — none collides with a `src/theme/theme.js`
 * role, so per that file's own one-off labeling convention they stay as
 * raw hex here rather than being promoted to theme tokens.
 */

/**
 * The pause glyph the Figma file does not include (it only shows the
 * resting "play" state). Hand-authored at the same 19px size, stroke
 * weight, and color (`#E3EFFF`) as the downloaded play icon, so toggling
 * reads as one icon family rather than a mismatched swap.
 */
function PauseGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="7.917" stroke="#E3EFFF" strokeWidth="1.583" />
      <rect x="7.1" y="6.5" width="1.6" height="6" rx="0.8" fill="#E3EFFF" />
      <rect x="10.3" y="6.5" width="1.6" height="6" rx="0.8" fill="#E3EFFF" />
    </svg>
  )
}

/**
 * Left panel of the sign-in screen: the auto-cycling illustration
 * carousel (image, floating state card, progress dots, play/pause
 * control) and the pinned "From opportunity to outcome." heading block.
 * Purely presentational — carousel state lives in
 * `useIllustrationCarousel` and is passed in by `SignInPage`.
 *
 * @param {{
 *   slides: Array<{ title: string, subtitle: string, image: string, imageAlt: string, icon: string }>,
 *   activeIndex: number,
 *   isPlaying: boolean,
 *   onTogglePlay: () => void,
 * }} props
 */
export default function IllustrationPanel({
  slides,
  activeIndex,
  isPlaying,
  onTogglePlay,
}) {
  const slide = slides[activeIndex]

  return (
    <Box
      sx={{
        flex: { md: '1 1 52.5%' },
        width: { xs: '100%', md: 'auto' },
        minWidth: 0,
        bgcolor: 'navy.main',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: '24px', sm: '40px', md: '60px' },
      }}
    >
      {/* Illustration stage: bleeds slightly wider than the padded panel
          (mirrors the Figma frame's -24px inset) and grows to fill the
          space above the pinned heading block. `minHeight` is a floor for
          the 360px image + overlapping card: at the `md` row layout the
          panel is stretched to the form's height so `flex: 1` has room to
          grow, but stacked at `xs` the panel's height is just its own
          content, and its only in-flow child here is this absolutely
          positioned stage — without a floor it would collapse to 0 and
          the image would overlap the heading below it. */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          mx: { xs: 0, sm: '-24px' },
          minHeight: { xs: 420, md: 0 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: '20px',
          }}
        >
          <Box sx={{ position: 'relative', pb: '28px' }}>
            <Box
              component="img"
              src={slide.image}
              alt={slide.imageAlt}
              sx={{
                display: 'block',
                width: '100%',
                height: 360,
                objectFit: 'contain',
                filter: 'drop-shadow(0px 22px 32px rgba(7, 27, 50, 0.4))',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '56.25%',
                right: '4%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                bgcolor: 'background.paper',
                border: '1px solid #dbe7f4',
                borderRadius: '12px',
                boxShadow: '0px 12px 16px 0px rgba(7, 27, 50, 0.5)',
                p: '12px 14px 10px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 38,
                    height: 38,
                    borderRadius: '9px',
                    bgcolor: '#e9f2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box component="img" src={slide.icon} alt="" width={19} height={19} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      lineHeight: '18.2px',
                      fontWeight: 700,
                      color: '#172b4d',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      lineHeight: '15px',
                      color: '#52657d',
                      mt: '2px',
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                </Box>
              </Box>

              <Box
                role="group"
                aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
                sx={{ display: 'flex', gap: '5px' }}
              >
                {slides.map((dotSlide, index) => (
                  <Box
                    key={dotSlide.title}
                    aria-hidden="true"
                    sx={{
                      width: DOT_WIDTH,
                      height: DOT_HEIGHT,
                      borderRadius: '4px',
                      bgcolor: index === activeIndex ? 'primary.dark' : '#cfdbeb',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={onTogglePlay}
          aria-label={
            isPlaying ? 'Pause illustration carousel' : 'Play illustration carousel'
          }
          aria-pressed={isPlaying}
          sx={{
            position: 'absolute',
            left: '24px',
            bottom: '16px',
            width: 32,
            height: 32,
            p: 0,
            borderRadius: '8px',
            bgcolor: '#193b60',
            border: '1px solid #93b0cd',
            '&:hover': { bgcolor: '#193b60' },
          }}
        >
          {isPlaying ? (
            <PauseGlyph />
          ) : (
            <Box component="img" src={playIcon} alt="" width={19} height={19} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ mt: '16px' }}>
        <Typography
          sx={{
            color: 'common.white',
            fontWeight: 700,
            fontSize: '33.1px',
            lineHeight: '38.75px',
            letterSpacing: '-1.159px',
          }}
        >
          From opportunity to outcome.
        </Typography>
        <Typography
          sx={{ color: '#b8d0e9', fontSize: '15px', lineHeight: '22.5px', mt: '5.3px' }}
        >
          Your RFP work, in one place.
        </Typography>
      </Box>
    </Box>
  )
}
