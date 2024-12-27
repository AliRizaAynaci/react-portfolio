import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

// Blog görselleri
import concurrencyImg from '../images/concurrency.png';
import strategyImg from '../images/strategy.png';
import onionImg from '../images/onion.png';
import cqrsImg from '../images/cqrs.png';
import goMongoImg from '../images/go_mongo.jpg';
import linkedListImg from '../images/linked_list.jpg';

const categoryImages = {
  // Go & MongoDB yazıları için
  'Go': concurrencyImg,
  'MongoDB': goMongoImg,
  'Database': goMongoImg,
  'Backend Development': cqrsImg,
  
  // Tasarım ve Mimari yazıları için
  'Design Patterns': strategyImg,
  'Software Architecture': onionImg,
  'Clean Architecture': onionImg,
  'CQRS Pattern': cqrsImg,
  'Onion Architecture': onionImg,
  
  // Veri Yapıları ve Algoritmalar için
  'Data Structures': linkedListImg,
  'Algorithms': linkedListImg,
  
  // Varsayılan görsel
  'default': concurrencyImg
};

const BlogPostCard = ({ post, index }) => {
  const getPostImage = (post) => {
    // İçerik bazlı görsel seçimi için anahtar kelimeler
    const contentKeywords = {
      'mongodb': goMongoImg,
      'concurrency': concurrencyImg,
      'strategy pattern': strategyImg,
      'onion architecture': onionImg,
      'clean architecture': onionImg,
      'cqrs pattern': cqrsImg,
      'command query': cqrsImg,
      'linked list': linkedListImg,
    };

    // Başlık kontrolü - spesifik eşleştirmeler
    const titleMatches = {
      'onion': onionImg,
      'cqrs': cqrsImg,
      'strategy': strategyImg,
      'concurrency': concurrencyImg,
      'mongodb': goMongoImg,
      'linked list': linkedListImg
    };

    // Önce başlık kontrolü
    const title = post.title.toLowerCase();
    for (const [keyword, image] of Object.entries(titleMatches)) {
      if (title.includes(keyword)) {
        return image;
      }
    }

    // Sonra içerik kontrolü
    const content = post.description.toLowerCase();
    for (const [keyword, image] of Object.entries(contentKeywords)) {
      if (content.includes(keyword)) {
        return image;
      }
    }

    // Son olarak kategori kontrolü
    const category = post.categories[0];
    return categoryImages[category] || categoryImages.default;
  };

  return (
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
          scale: 1.03,
          rotate: '0deg',
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        }}
        style={{
          transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'}) 
                    translateY(${index % 2 === 0 ? '-5px' : '5px'})`
        }}
      >
        <Paper
          component="a"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            p: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
              '& .blog-image': {
                transform: 'scale(1.05)',
              },
            }
          }}
        >
          <Box
            className="blog-image"
            sx={{
              height: 250,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                zIndex: 1
              }
            }}
          >
            <img
              src={getPostImage(post)}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                zIndex: 2
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 1,
                  display: 'block',
                  fontFamily: 'monospace'
                }}
              >
                {format(new Date(post.pubDate), 'd MMMM yyyy', { locale: tr })}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {post.title}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mb: 2,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.description.replace(/<[^>]*>?/gm, '')}
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                mt: 'auto'
              }}
            >
              {post.categories.map((category) => (
                <Typography
                  key={category}
                  variant="caption"
                  sx={{
                    px: 2,
                    py: 0.5,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </motion.div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@aynacialiriza'
        );
        setPosts(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Blog posts fetch error:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = currentCommand.trim().toLowerCase();
      let output = '';

      // open komutu için regex
      const openMatch = command.match(/^open\s+(-?\d+)$/);

      if (openMatch) {
        const index = parseInt(openMatch[1]) - 1; // 1-tabanlıdan 0-tabanlıya çevir
        if (index >= 0 && index < posts.length) {
          window.open(posts[index].link, '_blank');
          output = `Opening: ${posts[index].title}`;
        } else {
          output = `Error: Blog post #${index + 1} not found`;
        }
      } else {
        switch (command) {
          case 'blogs':
            output = posts.map((post, index) => 
              `${index + 1}. ${post.title}\n   Type 'open ${index + 1}' to read this post`
            ).join('\n\n');
            break;
          case 'help':
            output = `Available commands:
- blogs: List all blog posts
- open <number>: Open blog post by number (e.g., 'open 1')
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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sol Taraf - Blog Yazıları */}
          <Grid item xs={12} md={8}>
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
                    content: '"<Blog/>"',
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
                Blog Yazıları
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {loading ? (
                // Loading state için iskelet yapısı
                Array.from(new Array(6)).map((_, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      sx={{
                        height: 400,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px'
                      }}
                    />
                  </Grid>
                ))
              ) : (
                posts.map((post, index) => (
                  <Grid item xs={12} md={6} key={post.guid}>
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ))
              )}
            </Grid>
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
                    <Tooltip title="Blog yazılarının listesi" placement="top" arrow>
                      <Typography sx={{ color: '#98C379', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { color: '#63E2FF' } }}>
                        blogs
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Blog yazısını aç (örn: open 1)" placement="top" arrow>
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

export default Blog; 