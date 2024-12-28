import { Box, Container, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { isDark, toggleTheme } = useTheme();

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@aynacialiriza'
        );
        setPosts(response.data.items);
      } catch (error) {
        console.error('Blog posts fetch error:', error);
      }
    };

    fetchPosts();
  }, []);

  const skills = [
    { 
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'Go'],
      color: '#2C3E50',
      rotate: '-2deg',
      translateY: '0px',
      translateX: '-10px',
      delay: 0.2,
      scale: 1.05,
      icon: '🚀'
    },
    { 
      category: 'Veritabanı',
      items: ['PostgreSQL', 'Redis'],
      color: '#34495E',
      rotate: '2deg',
      translateY: '0px',
      translateX: '10px',
      delay: 0.4,
      scale: 0.98,
      icon: '💾'
    },
    { 
      category: 'DevOps',
      items: ['Docker', 'CI/CD', 'GitHub Actions'],
      color: '#2C3E50',
      rotate: '-1deg',
      translateY: '0px',
      translateX: '-15px',
      delay: 0.6,
      scale: 1.02,
      icon: '⚙️'
    },
    { 
      category: 'Diğer',
      items: ['RESTful API', 'Microservices', 'JWT'],
      color: '#34495E',
      rotate: '1deg',
      translateY: '0px',
      translateX: '15px',
      delay: 0.8,
      scale: 0.95,
      icon: '🔧'
    }
  ];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = currentCommand.trim().toLowerCase();
      let output = '';

      switch (command) {
        case 'projects':
          output = `fleet-management\necommerce-backend\ngo-ecommerce\nportfolio`;
          break;
        case 'blogs':
          output = posts.map((post, index) => 
            `${index + 1}. ${post.title}`
          ).join('\n');
          break;
        case 'mail':
          output = `aynacialiriza@gmail.com`;
          break;
        case 'go projects':
          navigate('/projects');
          return;
        case 'go blogs':
          navigate('/blog');
          return;
        case 'go iletisim':
          navigate('/contact');
          return;
        case 'clear':
          setCommandHistory([]);
          setCurrentCommand('');
          return;
        default:
          output = `Command not found: ${command}`;
      }

      setCommandHistory([...commandHistory, { command, output }]);
      setCurrentCommand('');
    }
  };

  const focusTerminal = () => {
    terminalRef.current?.focus();
  };

  return (
    <Box ref={containerRef} sx={{ overflow: 'hidden' }}>
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'fixed',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'rgba(158, 158, 158, 0.2)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
          perspective: '1000px'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            rotateX: mousePosition.y,
            rotateY: mousePosition.x
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              right: '-10%',
              top: '20%',
              width: '400px',
              height: '400px',
              border: '1px solid rgba(158, 158, 158, 0.1)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: '-5%',
              bottom: '10%',
              width: '300px',
              height: '300px',
              border: '1px solid rgba(158, 158, 158, 0.1)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        </motion.div>

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
                }}
              >
                <Typography
                  variant="h1"
                  className="glitch"
                  data-text="Ali Rıza Aynacı"
                  sx={{
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 700,
                    transform: 'skew(-5deg)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    position: 'relative',
                  }}
                >
                  Ali Rıza Aynacı
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: 'rgba(255,255,255,0.7)',
                    transform: 'skew(-5deg)',
                  }}
                >
                  Backend Developer
                </Typography>

                {/* Sadece bu kısım eklendi */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    mb: 4
                  }}
                >
                  Computer Engineering at Erciyes University
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
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
                      <Tooltip title="Geliştirdiğim projelerin listesi" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          projects
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Yazdığım teknik blog yazıları" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          blogs
                        </Typography>
                      </Tooltip>
                      <Tooltip title="İletişim için mail adresim" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          mail
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Projeler sayfasına git" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          go projects
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Blog yazıları sayfasına git" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          go blogs
                        </Typography>
                      </Tooltip>
                      <Tooltip title="İletişim sayfasına git" placement="top" arrow>
                        <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                          go iletisim
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
                    minWidth: '600px',
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
                        right: '10px',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: 'monospace'
                      }}
                    >
                      🚀 ~/ali-riza/terminal v1.0.0
                    </Typography>
                  </Box>

                  {/* Terminal İçerik */}
                  <Box 
                    sx={{ 
                      p: 3, 
                      color: '#fff',
                      height: 'calc(100% - 32px)',
                      overflow: 'auto'
                    }}
                  >
                    {/* Hoş geldin mesajı */}
                    <Typography 
                      sx={{ 
                        color: '#63E2FF',
                        opacity: 0.7,
                        mb: 2,
                        fontStyle: 'italic',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✨ hey! Komutları kullanarak işlemlerini yapabilirsin
                    </Typography>

                    {/* Komut Geçmişi */}
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

      {/* Skills Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: 15,
          minHeight: '100vh',
          overflow: 'visible',
          background: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
        }}
      >
        <motion.div style={{ y }}>
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 8,
                  textAlign: 'center',
                  transform: 'skew(-5deg)',
                  position: 'relative',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  '&::before': {
                    content: '"<Skills/>"',
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1rem',
                    color: 'rgba(158, 158, 158, 0.4)',
                    fontFamily: 'monospace'
                  }
                }}
              >
                Yetenekler
              </Typography>
            </motion.div>

            <Grid 
              container 
              spacing={{ xs: 4, md: 6 }}
              sx={{ 
                position: 'relative',
                mt: 4
              }}
            >
              {skills.map((skill, index) => (
                <Grid 
                  item 
                  xs={12} 
                  md={6} 
                  key={skill.category}
                  sx={{ 
                    transform: {
                      xs: 'none',
                      md: `translate(${skill.translateX}, ${skill.translateY})`
                    },
                    mb: { xs: 4, md: 6 }
                  }}
                >
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      y: 50, 
                      rotate: skill.rotate,
                      scale: 0.8
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      rotate: skill.rotate,
                      scale: skill.scale
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: '0deg',
                      y: -10,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: skill.delay
                    }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      sx={{
                        p: 4,
                        height: '100%',
                        background: 'rgba(30, 30, 30, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))',
                          transform: 'rotate(1deg)',
                          zIndex: -1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            mr: 2,
                            fontSize: '2rem'
                          }}
                        >
                          {skill.icon}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            transform: 'skew(-3deg)',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                          }}
                        >
                          {skill.category}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        {skill.items.map((item, itemIndex) => (
                          <motion.div
                            key={item}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ 
                              delay: skill.delay + (itemIndex * 0.1),
                              type: "spring",
                              stiffness: 100
                            }}
                            viewport={{ once: true }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'rgba(255,255,255,0.9)',
                                mb: 2,
                                pl: 3,
                                position: 'relative',
                                fontSize: '1.2rem',
                                '&::before': {
                                  content: '"▹"',
                                  position: 'absolute',
                                  left: 0,
                                  color: skill.color,
                                  fontWeight: 'bold'
                                },
                                '&:hover': {
                                  color: 'white',
                                  transform: 'translateX(10px)',
                                  transition: 'all 0.3s ease'
                                }
                              }}
                            >
                              {item}
                            </Typography>
                          </motion.div>
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </motion.div>
      </Box>

      {/* İmleç animasyonu için keyframes */}
      <style>
        {`
          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: #63E2FF }
          }
        `}
      </style>
    </Box>
  );
};

export default Home; 