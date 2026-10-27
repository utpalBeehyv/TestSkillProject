import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import IllustrationPanel from '../components/IllustrationPanel'
import { illustrationSlides } from '../illustrationSlides'
import { theme } from '../../../theme'

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('IllustrationPanel', () => {
  const mockTogglePlay = vi.fn()

  it('renders the current slide title and subtitle', () => {
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByText('RFP found')).toBeInTheDocument()
    expect(screen.getByText('New opportunity')).toBeInTheDocument()
  })

  it('renders all slide dots with the active one highlighted', () => {
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    const group = screen.getByRole('group', { name: /Slide 1 of 3/ })
    expect(group).toBeInTheDocument()
  })

  it('changes the displayed slide when activeIndex changes', () => {
    const { rerender } = renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByText('RFP found')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <IllustrationPanel
          slides={illustrationSlides}
          activeIndex={1}
          isPlaying={true}
          onTogglePlay={mockTogglePlay}
        />
      </ThemeProvider>,
    )

    expect(screen.queryByText('RFP found')).not.toBeInTheDocument()
    expect(screen.getByText('Review requirements')).toBeInTheDocument()
  })

  it('renders the pinned heading block with the tagline', () => {
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByText('From opportunity to outcome.')).toBeInTheDocument()
    expect(screen.getByText('Your RFP work, in one place.')).toBeInTheDocument()
  })

  it('renders the play/pause toggle button with the correct label when playing', () => {
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByLabelText('Pause illustration carousel')).toBeInTheDocument()
  })

  it('renders the play/pause toggle button with the correct label when paused', () => {
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={false}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByLabelText('Play illustration carousel')).toBeInTheDocument()
  })

  it('calls onTogglePlay when the play/pause button is clicked', () => {
    const mockTogglePlayFn = vi.fn()
    renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlayFn}
      />,
    )

    const button = screen.getByLabelText('Pause illustration carousel')
    fireEvent.click(button)

    expect(mockTogglePlayFn).toHaveBeenCalledTimes(1)
  })

  it('renders all three slides and can navigate between them', () => {
    const { rerender } = renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    expect(screen.getByText('RFP found')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <IllustrationPanel
          slides={illustrationSlides}
          activeIndex={1}
          isPlaying={true}
          onTogglePlay={mockTogglePlay}
        />
      </ThemeProvider>,
    )

    expect(screen.getByText('Review requirements')).toBeInTheDocument()

    rerender(
      <ThemeProvider theme={theme}>
        <IllustrationPanel
          slides={illustrationSlides}
          activeIndex={2}
          isPlaying={true}
          onTogglePlay={mockTogglePlay}
        />
      </ThemeProvider>,
    )

    expect(screen.getByText('Decision followed')).toBeInTheDocument()
  })

  it('updates the aria-pressed state when isPlaying changes', () => {
    const { rerender } = renderWithTheme(
      <IllustrationPanel
        slides={illustrationSlides}
        activeIndex={0}
        isPlaying={true}
        onTogglePlay={mockTogglePlay}
      />,
    )

    let button = screen.getByLabelText('Pause illustration carousel')
    expect(button).toHaveAttribute('aria-pressed', 'true')

    rerender(
      <ThemeProvider theme={theme}>
        <IllustrationPanel
          slides={illustrationSlides}
          activeIndex={0}
          isPlaying={false}
          onTogglePlay={mockTogglePlay}
        />
      </ThemeProvider>,
    )

    button = screen.getByLabelText('Play illustration carousel')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })
})
