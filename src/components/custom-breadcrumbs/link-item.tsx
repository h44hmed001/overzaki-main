// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// routes
import { RouterLink } from 'src/routes/components';
//
import { BreadcrumbsLinkProps } from './types';

// ----------------------------------------------------------------------

type Props = {
  link: BreadcrumbsLinkProps;
  activeLast?: string;
  disabled?: any;
};

export default function BreadcrumbsLink({ link, activeLast, disabled }: Props) {
  const { name, href, icon } = link;

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    fontWeight: 800,
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
      cursor: 'default',
      pointerEvents: 'none',
      color: 'text.disabled',
      fontWeight: 'normal'
    }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      <span style={{ textTransform: 'capitalize', fontWeight: activeLast === name ? 900 : 'normal' }} >{name}</span>
    </>
  );

  if (href) {
    return (
      <Link component={RouterLink} href={href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
