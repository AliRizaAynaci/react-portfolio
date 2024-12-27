import { Box, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        p: 2,
        background: isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: isDark ? '#FFD700' : '#FDB813',
              '&:hover': {
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isDark ? <DarkModeIcon /> : <WbSunnyIcon />}
          </IconButton>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Navbar; 