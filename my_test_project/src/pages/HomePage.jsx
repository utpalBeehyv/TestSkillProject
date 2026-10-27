import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Placeholder home route. The shell stops here until a feature is
 * implemented (see feature-implementation).
 */
export default function HomePage() {
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        my_test_project
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the app shell. Screens are built once there is a feature to implement.
      </Typography>
    </Box>
  )
}
