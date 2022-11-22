import {
  Container,
  Box,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { keyframes } from '@mui/system';
import Markdown from 'markdown-to-jsx';

function RichTextWithImage(props) {
  // console.log('components - text - RichTextWithImage.js - props: ', props);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up('lg'));

  const imageAnimation = keyframes`
    from {
      transform: scale(1.025);
      filter: grayscale(50%);
    }
    to {
      transform: scale(1);
      filter: grayscale(0);
    }
  `;

  const imageAnimationStyles = {
    animationName: `${imageAnimation}`,
    animationDuration: '5s',
    animationDelay: '1s',
    animationIterationCount: '1',
    animationTimingFunction: 'ease',
    animationDirection: 'normal',
    animationFillMode: 'forwards',
    transform: 'scale(1.025)',
    transformOrigin: 'top center',
    filter: 'grayscale(50%)',
  };

  if (!props.props.richTextWithImage) return;

  const { description, image } = props.props.richTextWithImage;

  const MarkdownLink = ({ children, ...props }) => (
    <Link {...props}>{children}</Link>
  );

  return (
    <Container
      maxWidth="xl"
      sx={{
        mb: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box
        component="div"
        sx={{
          mt: { xs: 2, md: 5 },
          mb: { xs: 2, md: 15 },
          fontFamily: theme.typography.primary,
        }}
      >
        <Box
          component="div"
          sx={{
            width: 'auto',
            float: { lg: 'right' },
            clipPath: {
              lg: 'polygon(53.07% 680px, 0.26% 52.64%, 22.75% -0.01%, 80.95% -0.14%, 97.29% 89.50%)',
            },
            shapeOutside: {
              lg: 'polygon(56.65% 700px, -2.59% 53.72%, 21.77% -1.79%, 86.3% -1.79%, 104.15% 91.93%)',
            },
            shapeMargin: { lg: 10 },
            marginRight: { lg: -6 },
            marginBottom: { xs: 4, lg: 'initial' },
          }}
        >
          <Box
            component="img"
            src={image.data.attributes.url}
            alt={image.data.attributes.alternativeText}
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',

              [theme.breakpoints.up('lg')]: {
                ...imageAnimationStyles,
              },
            }}
          />
        </Box>

        <Typography
          component="div"
          sx={{
            fontSize: breakpointUpLg ? 22 : 16,
            '&:first-letter': {
              float: 'left',
              fontFamily: theme.typography.secondary.fontFamily,
              fontSize: 100,
              lineHeight: 0.8,
              pr: 2,
              color: theme.palette.custom.primary.main,
            },
          }}
        >
          <Markdown
            options={{
              forceBlock: true,
              overrides: {
                a: {
                  component: MarkdownLink,
                  props: {
                    target: '_blank',
                  },
                },
              },
            }}
          >
            {description}
          </Markdown>
        </Typography>
      </Box>
    </Container>
  );
}

export default RichTextWithImage;
