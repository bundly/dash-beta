import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  Settings as SettingsIcon,
  FileText as FileTextIcon,
  User as UserIcon,
  List as ListIcon
} from 'react-feather';
import NavItem from './NavItem';

function getAvatar() {
  const bundlyToken = localStorage.getItem('bundly-token');
  let avatarUrl;
  if (bundlyToken) avatarUrl = JSON.parse(atob(bundlyToken)).avatar;
  return avatarUrl;
}

function getUsername() {
  const bundlyToken = localStorage.getItem('bundly-token');
  let username;
  if (bundlyToken) username = JSON.parse(atob(bundlyToken)).username;
  return username;
}

const user = {
  avatar: getAvatar() || '/static/images/avatars/avatar_6.png',
  // TODO: Add
  jobTitle: `Hi, ${getUsername()}`,
  name: `@${getUsername()}` || 'Anonymous User'
};

const items = [
  {
    href: '/app/dashboard',
    icon: TrelloIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/standups',
    icon: FileTextIcon,
    title: 'Daily Standup'
  },
  {
    href: '/app/stargazers',
    icon: FileTextIcon,
    title: 'Star Gazer Network'
  },
  {
    href: '/app/noter',
    icon: ListIcon,
    title: 'Notes'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: 'https://github.com/bundly/dash-beta/issues/new',
    icon: AlertCircleIcon,
    title: 'Report an Issue',
    externalLink: true
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              externalLink={item.externalLink}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
