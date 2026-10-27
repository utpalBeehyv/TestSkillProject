import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App shell', () => {
  it('renders the home route behind the redux, theme, and router providers', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /my_test_project/i }),
    ).toBeInTheDocument()
  })
})
