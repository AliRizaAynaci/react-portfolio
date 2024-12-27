import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper, IconButton, Chip, Tooltip } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);

  // GitHub projeleri
  const featuredProjects = [
    {
      title: 'E-commerce Backend',
      description: 'RESTful API for e-commerce platform functionalities, including customer, product, cart, and order management.',
      image: 'https://raw.githubusercontent.com/AliRizaAynaci/ecommerce-backend/main/screenshot.png',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
      github: 'https://github.com/AliRizaAynaci/ecommerce-backend',
      type: 'Backend Development'
    },
    {
      title: 'Fleet Management',
      description: 'Shipment tracking and management system with package and sack handling across delivery points.',
      image: 'https://raw.githubusercontent.com/AliRizaAynaci/fleet-management/main/screenshot.png',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/AliRizaAynaci/fleet-management',
      type: 'Backend Development'
    },
    {
      title: 'Go E-commerce Microservices',
      description: 'Microservices-based e-commerce platform implemented with Go.',
      image: 'https://raw.githubusercontent.com/AliRizaAynaci/go-ecommerce-microservices/main/screenshot.png',
      tech: ['Go', 'Microservices', 'Docker'],
      github: 'https://github.com/AliRizaAynaci/go-ecommerce-microservices',
      type: 'Backend Development'
    }
  ];

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = currentCommand.trim().toLowerCase();
      let output = '';

      // open komutu için regex
      const openMatch = command.match(/^open\s+(-?\d+)$/);

      if (openMatch) {
        const index = parseInt(openMatch[1]) - 1; // 1-tabanlıdan 0-tabanlıya çevir
        if (index >= 0 && index < featuredProjects.length) {
          window.open(featuredProjects[index].github, '_blank');
          output = `Opening: ${featuredProjects[index].title}`;
        } else {
          output = `Error: Project #${index + 1} not found`;
        }
      } else {
        switch (command) {
          case 'projects':
            output = featuredProjects.map((project, index) => 
              `${index + 1}. ${project.title}\n   Type 'open ${index + 1}' to view this project`
            ).join('\n\n');
            break;
          case 'help':
            output = `Available commands:
- projects: List all projects
- open <number>: Open project by number (e.g., 'open 1')
- go home: Return to homepage
- clear: Clear terminal
- help: Show this help message`;
            break;
          case 'go home':
            navigate('/');
            return;
          case 'clear':
            setCommandHistory([]);
            setCurrentCommand('');
            return;
          default:
            output = `Command not found: ${command}\nType 'help' for available commands`;
        }
      }

      setCommandHistory([...commandHistory, { command, output }]);
      setCurrentCommand('');
    }
  };

  const focusTerminal = () => {
    terminalRef.current?.focus();
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
      pt: 10 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sol Taraf - Projeler */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 6,
                  transform: 'skew(-5deg)',
                  textAlign: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #2C3E50, #34495E)',
                  }
                }}
              >
                Projeler
              </Typography>
            </motion.div>

            {/* Proje kartları */}
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} key={project.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 0,
                      overflow: 'hidden',
                      background: 'rgba(30, 30, 30, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transform: index % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
                      '&:hover': {
                        transform: 'rotate(0deg) scale(1.02)',
                        transition: 'all 0.3s ease-in-out'
                      }
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            position: 'relative',
                            height: '100%',
                            minHeight: 300,
                            background: `url(${project.image || 'https://via.placeholder.com/600x400'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0,0,0,0.4)',
                              transition: 'all 0.3s ease'
                            },
                            '&:hover::before': {
                              background: 'rgba(0,0,0,0.2)'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 2
                            }}
                          >
                            <IconButton
                              component="a"
                              href={project.github}
                              target="_blank"
                              sx={{
                                bgcolor: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(0,0,0,0.9)',
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <GitHubIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ p: 4 }}>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              fontWeight: 600,
                              background: 'linear-gradient(45deg, #fff 30%, #ccc 90%)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}
                          >
                            {project.description}
                          </Typography>
                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ mb: 1, color: 'rgba(255,255,255,0.5)' }}
                            >
                              Teknolojiler:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {project.tech.map((tech) => (
                                <Chip
                                  key={tech}
                                  label={tech}
                                  size="small"
                                  icon={<CodeIcon />}
                                  sx={{
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': {
                                      bgcolor: 'rgba(255,255,255,0.2)'
                                    }
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{ color: 'primary.main' }}
                          >
                            {project.type}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Sağ Taraf - Terminal */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Komut Listesi */}
              <Paper
                sx={{
                  mb: 2,
                  p: 2,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  fontFamily: 'monospace',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: '#fff', fontSize: '0.8rem', opacity: 0.7, whiteSpace: 'nowrap' }}>
                    Komutlar:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Tooltip title="Projelerin listesi" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        projects
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Projeyi aç (örn: open 1)" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        open <span style={{ color: '#E06C75' }}>&lt;number&gt;</span>
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Komut listesi" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        help
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Ana sayfaya dön" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        go home
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Terminal ekranını temizle" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        clear
                      </Typography>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>

              {/* Terminal */}
              <Paper
                onClick={focusTerminal}
                sx={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  fontFamily: 'monospace',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '300px',
                  cursor: 'text'
                }}
              >
                {/* Terminal Üst Bar */}
                <Box 
                  sx={{ 
                    height: '32px',
                    background: 'rgba(255,255,255,0.1)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    pl: 2,
                    gap: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                  <Typography 
                    sx={{ 
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'monospace',
                      letterSpacing: '0.5px'
                    }}
                  >
                    🚀 ~/ali-riza/terminal v1.0.0
                  </Typography>
                </Box>

                {/* Terminal İçerik */}
                <Box sx={{ p: 3, color: '#fff', height: 'calc(100% - 32px)', overflow: 'auto' }}>
                  {commandHistory.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography sx={{ color: '#63E2FF', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: '#98C379' }}>ali@portfolio</span>
                        <span style={{ color: '#fff' }}>:</span>
                        <span style={{ color: '#61AFEF' }}>~</span>
                        <span style={{ color: '#fff' }}>$</span>
                        {' '}{item.command}
                      </Typography>
                      {item.output && (
                        <Typography 
                          sx={{ 
                            color: '#E06C75',
                            whiteSpace: 'pre-line',
                            pl: 2,
                            mt: 1,
                            lineHeight: 1.6,
                            opacity: 0.9
                          }}
                        >
                          {item.output}
                        </Typography>
                      )}
                    </Box>
                  ))}

                  {/* Aktif Komut Satırı */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ color: '#98C379' }}>ali@portfolio</span>
                      <span style={{ color: '#fff' }}>:</span>
                      <span style={{ color: '#61AFEF' }}>~</span>
                      <span style={{ color: '#fff' }}>$</span>
                    </Typography>
                    <input
                      ref={terminalRef}
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyDown={handleCommand}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#fff',
                        font: 'inherit',
                        width: '100%',
                        padding: 0,
                        margin: 0
                      }}
                      autoFocus
                    />
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects; 