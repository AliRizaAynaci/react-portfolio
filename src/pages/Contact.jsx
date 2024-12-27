import { Box, Container, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const Contact = () => {
  const navigate = useNavigate();
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = currentCommand.trim().toLowerCase();
      let output = '';

      switch (command) {
        case 'mail':
          output = 'aynacialiriza@gmail.com';
          break;
        case 'gmail':
          window.open('https://mail.google.com/mail/?view=cm&fs=1&to=aynacialiriza@gmail.com&su=Portfolyo%20Üzerinden%20İletişim&body=Merhaba%20Ali%20Rıza,', '_blank', 'noopener,noreferrer');
          return;
        case 'go github':
          window.open('https://github.com/AliRizaAynaci', '_blank', 'noopener,noreferrer');
          return;
        case 'go linkedin':
          window.open('https://www.linkedin.com/in/alirizaaynaci/', '_blank', 'noopener,noreferrer');
          return;
        case 'go medium':
          window.open('https://medium.com/@aynacialiriza', '_blank', 'noopener,noreferrer');
          return;
        case 'go home':
          navigate('/');
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

  const contacts = [
    {
      title: 'GitHub',
      icon: <GitHubIcon sx={{ fontSize: 40 }} />,
      link: 'https://github.com/AliRizaAynaci',
      color: '#2C3E50',
      description: 'Projelerimi ve kaynak kodlarımı inceleyebilirsiniz.'
    },
    {
      title: 'LinkedIn',
      icon: <LinkedInIcon sx={{ fontSize: 40 }} />,
      link: 'https://www.linkedin.com/in/alirizaaynaci/',
      color: '#0077B5',
      description: 'Profesyonel iletişim için LinkedIn profilimi ziyaret edebilirsiniz.'
    },
    {
      title: 'Medium',
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      link: 'https://medium.com/@aynacialiriza',
      color: '#00ab6c',
      description: 'Teknik yazılarımı ve blog gönderilerimi okuyabilirsiniz.'
    },
    {
      title: 'Gmail',
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=aynacialiriza@gmail.com&su=Portfolyo%20Üzerinden%20İletişim&body=Merhaba%20Ali%20Rıza,',
      color: '#EA4335',
      description: 'Gmail üzerinden doğrudan mesaj gönderebilirsiniz.',
      onClick: (e) => {
        e.preventDefault();
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=aynacialiriza@gmail.com&su=Portfolyo%20Üzerinden%20İletişim&body=Merhaba%20Ali%20Rıza,', '_blank', 'noopener,noreferrer');
      }
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 15,
        pb: 8,
        background: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dekoratif arka plan elementleri */}
      <Box
        component={motion.div}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      <Box
        component={motion.div}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              transform: 'skew(-5deg)',
              position: 'relative',
              '&::before': {
                content: '"<Contact/>"',
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
            İletişim
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {contacts.map((contact, index) => (
            <Grid item xs={12} sm={6} md={6} key={contact.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: '-1deg',
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  <Paper
                    component="a"
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={contact.onClick}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(30, 30, 30, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        '& .icon': {
                          transform: 'scale(1.2) rotate(5deg)',
                          color: contact.color
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, transparent, ${contact.color}, transparent)`
                      }
                    }}
                  >
                    <Box
                      className="icon"
                      sx={{
                        color: 'white',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1) rotate(0deg)'
                      }}
                    >
                      {contact.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 600
                      }}
                    >
                      {contact.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center'
                      }}
                    >
                      {contact.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Terminal Bölümü */}
        <Box sx={{ mt: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                  <Tooltip title="Mail adresimi göster" placement="top" arrow>
                    <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                      mail
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Gmail ile mesaj gönder" placement="top" arrow>
                    <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                      gmail
                    </Typography>
                  </Tooltip>
                  <Tooltip title="GitHub profilime git" placement="top" arrow>
                    <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                      go github
                    </Typography>
                  </Tooltip>
                  <Tooltip title="LinkedIn profilime git" placement="top" arrow>
                    <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                      go linkedin
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Medium profilime git" placement="top" arrow>
                    <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                      go medium
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
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 