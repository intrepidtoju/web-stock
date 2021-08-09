import React, { Fragment, useState } from 'react';
import {
  AppBar,
  Button,
  Typography,
  InputBase,
  Toolbar,
  makeStyles,
  Container,
  ClickAwayListener,
  ListItem,
  Grid,
  FormControl,
  ButtonGroup,
  Input,
  InputLabel,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FormDialog, Toast } from '../utils/addon';
import { useForm, useDialog, useToast } from '../utils/hooks';
import { postContent, session, errorMessage } from '../utils';
import {
  LibraryBooksOutlined,
  ForwardOutlined,
  Search,
  Twitter,
  Facebook,
  GTranslate,
  Dashboard,
  ReceiptOutlined,
  WorkOutlineOutlined,
  CloudOutlined,
  CollectionsBookmarkOutlined,
  LocalLibraryOutlined,
  EmojiEventsOutlined,
  PowerSettingsNewOutlined,
  SubscriptionsOutlined,
  BusinessCenterOutlined,
  Settings,
  PersonOutline,
} from '@material-ui/icons';
import Logo from '../images/logo.png';
import Register from '../images/register.svg';
import Login from '../images/login.svg';
import Profile from '../images/ProfileCopy.svg';
import ForgottenPassword from '../images/forgottenPassword.svg';
import MenuIcon from '@material-ui/icons/Menu';
import TempoaryDrawer from './TempoaryDrawer';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  examList: {
    width: 350,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profileList: {
    width: 228,
  },
  hoverProfile: {
    '&:hover': {
      color: '#ff7a21 !important',
    },
  },
  list: {
    width: 250,
    height: '100%',
  },
  fullList: {
    width: 'auto',
  },

  recover: {
    background: '#ff7a21',
    color: 'white',
    marginTop: 30,
    '&:hover': {
      background: '#ff7a21',
      color: 'white',
    },
  },
  create: {
    background: '#ff7a21',
    color: 'white',
    marginTop: 10,
    '&:hover': {
      background: '#ff7a21',
      color: 'white',
    },
  },
  header: {
    background: 'white !important',
  },
  headerwidth: {
    // width: '85%',
    // marginLeft: '7%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  link: {
    color: '#5a5a5a',
    marginRight: theme.spacing(4),
    fontFamily: 'red hat display',
    cursor: 'pointer',
    display: 'flex',
    padding: 20,
    fontSize: 18,
    alignItems: 'center',
    '&:hover': {
      color: '#ff7a21',
    },
  },
  profile: {
    fontFamily: 'red hat display',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  buttonSignIn: {
    color: '#5a5a5a',
    fontFamily: 'red hat display',
    marginLeft: 10,
    '&:hover': {
      background: '#ff7a21',
      color: 'white',
    },
  },
  buttonSignUp: {
    background: '#ff7a21',
    color: 'white',
    fontFamily: 'Red Hat Display !important',
    marginLeft: 10,
    '&:hover': {
      background: '#ff7a21',
      color: 'white',
    },
  },

  searchIcon: {
    color: '#ff7a21',
    background: '#fafafa',
    borderRadius: 'none !important',
    '&:hover': {
      background: '#fafafa',
    },
  },
  inputInput: {
    padding: '7px 10px 10px 20px',
    background: '#fafafa',
    width: '400px',
    color: '#5a5a5a',
  },
  loading: {
    color: '#5a5a5a',
    marginLeft: 20,
  },
}));

export default function Header() {
  const classes = useStyles(),
    [isLoading, setIsLoading] = useState(false);
  const loginData = useForm(login),
    createForm = useForm(usersDate),
    forgottenPassword = useForm(getForgottenPassword),
    [drop, setDrop] = useState(false),
    [open, setOpen] = useState(false),
    [users, setUsers] = useState(),
    [anchor, setAnchor] = useState('left'),
    [message, setMessage] = useState(),
    { dialog, openDialog } = useDialog(),
    { toastMessage, toggleToast } = useToast();
  const user = session.get('user');
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor = 'top') => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <ListItem>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 20px',
              height: '100%',
            }}
          >
            <div>
              <MenuIcon />
            </div>

            <div>
              <a href="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ height: 40, display: 'flex', lineHeight: '22px' }}
                />
              </a>
            </div>
          </div>
        </ListItem>
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <div>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Public Exam" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Private Exam" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Exam Centers" />
            </ListItem>
          </div>

          <div style={{ padding: '15px' }}>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
              }}
            >
              <div>About cbt.ng</div>
              <div>Privacy Policy</div>
            </div>
            <div>Terms & Conditions</div>
            <div>Data Ploicy</div>
          </div>
        </div>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  async function getForgottenPassword() {
    try {
      setIsLoading(true);
      const data = {
        ...forgottenPassword.values,
        redirectUrl: 'http://localhost:3000/auth/forgotten-password',
      };
      console.log(data);
      const password = await postContent({
        url: '/user/security/send-reset-password-link',
        data,
      });
      if (password.success) {
        setMessage(password.message);
        openDialog(false);
        openDialog('confirm');
      }
    } catch (err) {
      setIsLoading(false);
      toggleToast(errorMessage(err));
    }
  }

  async function usersDate() {
    if (createForm.values.confirmPassword === createForm.values.password) {
      try {
        setIsLoading(true);
        const data = {
          ...createForm.values,
          redirectUrl: 'http://localhost:3000/auth/email-verification',
        };
        console.log(data);
        const user = await postContent({
          url: '/user/register',
          data,
        });
        setUsers([user.data]);
        setMessage(user.message);
        openDialog(false);
        openDialog('confirm');
      } catch (err) {
        setIsLoading(false);
        toggleToast(errorMessage(err));
      }
    } else {
      toggleToast('incorrect password');
    }
  }

  async function login() {
    try {
      setIsLoading(true);
      const user = await postContent({
        url: '/user/login',
        data: loginData.values,
      });
      if (user.success) {
        session.set('token', user.data.token);
        session.set('user', user.data);
      }
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  }

  function logout() {
    if (session.get('token') || session.get('user')) {
      setIsLoading(true);
      session.remove('token');
      session.remove('user');
      window.location = '/';
    }
    setIsLoading(false);
  }

  let dialogBox;
  switch (dialog) {
    case 'createNew':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          title=" Create an account"
          width="md"
          toggle={openDialog}
          fullWidth={true}
          handleSubmit={createForm.submit}
          content={
            <Fragment>
              <Grid container spacing={3} style={{ overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img
                    src={Register}
                    alt="register"
                    style={{ height: '400px', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">
                      Phone number or Email
                    </InputLabel>
                    <Input
                      id="email"
                      type="text"
                      onChange={createForm.getData}
                      autoFocus
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">Full Name</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      onChange={createForm.getData}
                      autoFocus
                    />
                  </FormControl>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          onChange={createForm.getData}
                          id="password"
                          type="password"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="confirmPassword">
                          Confirm Password
                        </InputLabel>
                        <Input
                          onChange={createForm.getData}
                          id="confirmPassword"
                          type="password"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormControl margin="normal" required fullWidth>
                    <Button className={classes.create} type="submit">
                      Create Account
                      {isLoading && (
                        <CircularProgress
                          size={15}
                          className={classes.loading}
                        />
                      )}
                    </Button>
                  </FormControl>

                  <div className="lineText">Or sign up with</div>
                  <div style={{ marginLeft: 20 }}>
                    <ButtonGroup>
                      <Button
                        style={{
                          background: '#3b5998',
                          color: '#ebe6e6',
                          borderColor: '#3b5998',
                        }}
                      >
                        <Facebook style={{ marginRight: 10 }} />
                        Facebook
                      </Button>
                      <Button
                        style={{
                          background: '#00acee',
                          color: '#ebe6e6',
                          borderColor: '#00acee',
                        }}
                      >
                        <Twitter style={{ marginRight: 10 }} />
                        Twitter
                      </Button>
                      <Button
                        style={{
                          background: '#C70039',
                          color: '#ebe6e6',
                          borderColor: '#C70039',
                        }}
                      >
                        <GTranslate style={{ marginRight: 10 }} />
                        Google
                      </Button>
                    </ButtonGroup>
                  </div>
                </Grid>
              </Grid>
            </Fragment>
          }
        />
      );
      break;

    case 'login':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          title=" Sign in Here"
          width="md"
          toggle={openDialog}
          fullWidth={true}
          handleSubmit={loginData.submit}
          content={
            <Fragment>
              <Grid container spacing={3} style={{ overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img
                    src={Login}
                    alt="register"
                    style={{ height: '400px', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">
                      Phone number or Email
                    </InputLabel>
                    <Input
                      id="username"
                      type="text"
                      onChange={loginData.getData}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      onChange={loginData.getData}
                      id="password"
                      type="password"
                    />
                  </FormControl>
                  <div
                    style={{ cursor: 'pointer', color: '#999', marginTop: 5 }}
                    id="forgotten"
                    onClick={() => {
                      openDialog('forgotPassword');
                    }}
                  >
                    Forgot password ?
                  </div>
                  <FormControl fullWidth>
                    <Button
                      className={classes.create}
                      style={{ marginBottom: 25 }}
                      type="submit"
                    >
                      sign in
                      {isLoading && (
                        <CircularProgress
                          size={15}
                          className={classes.loading}
                        />
                      )}
                    </Button>
                  </FormControl>

                  <div className="lineText">Or sign in with</div>
                  <div style={{ marginLeft: 20 }}>
                    <ButtonGroup style={{ marginTop: 20 }}>
                      <Button
                        style={{
                          background: '#3b5998',
                          color: '#ebe6e6',
                          borderColor: '#3b5998',
                        }}
                      >
                        <Facebook style={{ marginRight: 10 }} />
                        Facebook
                      </Button>
                      <Button
                        style={{
                          background: '#00acee',
                          color: '#ebe6e6',
                          borderColor: '#00acee',
                        }}
                      >
                        <Twitter style={{ marginRight: 10 }} />
                        Twitter
                      </Button>
                      <Button
                        style={{
                          background: '#C70039',
                          color: '#ebe6e6',
                          borderColor: '#C70039',
                        }}
                      >
                        <GTranslate style={{ marginRight: 10 }} />
                        Google
                      </Button>
                    </ButtonGroup>
                  </div>
                </Grid>
              </Grid>
            </Fragment>
          }
        />
      );
      break;

    case 'forgotPassword':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          title="Forgot Password"
          width="md"
          toggle={openDialog}
          handleSubmit={forgottenPassword.submit}
          fullWidth={true}
          content={
            <Fragment>
              <Grid container spacing={3} style={{ overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img
                    src={ForgottenPassword}
                    alt="ForgottenPassword"
                    style={{ height: '90%', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#999',
                      marginTop: 40,
                    }}
                  >
                    Enter your email address and we will send you a link to
                    recover your password.
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        onChange={forgottenPassword.getData}
                        id="email"
                        type="email"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Button className={classes.recover} type="submit">
                        Recover password
                        {isLoading && (
                          <CircularProgress
                            size={15}
                            className={classes.loading}
                          />
                        )}
                      </Button>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </Fragment>
          }
        />
      );
      break;
    case 'logout':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          fullWidth={true}
          title="Logout"
          width="xs"
          caption="Sure you want to logout?"
          toggle={openDialog}
          handleSubmit={logout.submit}
          action={
            <Fragment>
              <Button onClick={() => logout()} color="primary">
                logout{' '}
                {isLoading && (
                  <CircularProgress size={15} className={classes.loading} />
                )}
              </Button>
            </Fragment>
          }
        />
      );
      break;

    case 'confirm':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          fullWidth={true}
          title="Email Verification"
          width="xs"
          caption={message}
          toggle={openDialog}
          handleSubmit={logout.submit}
          action={
            <React.Fragment>
              <Button onClick={() => openDialog(false)} color="primary">
                okay
              </Button>
            </React.Fragment>
          }
        />
      );
      break;
    default:
      dialogBox = null;
  }

  const profileSwitch = () => {
    if (!user) {
      return (
        <Fragment>
          <Button
            className={classes.buttonSignIn}
            variant="h6"
            noWrap
            onClick={() => openDialog('login')}
          >
            Sign in
          </Button>

          <Button
            className={classes.buttonSignUp}
            onClick={() => openDialog('createNew')}
            variant="h6"
            noWrap
          >
            Create free account
          </Button>
        </Fragment>
      );
    } else {
      return (
        <div className="dropdown">
          <div
            className={classes.profile}
            variant="h6"
            noWrap
            style={{ color: '#ff7a21' }}
          >
            {user.username ? (
              <div style={{ marginRight: 10 }}>
                {user.username.substr(0, 20) + '...'}
              </div>
            ) : (
              <div style={{ marginRight: 10 }}>
                {user.name.substr(0, 30) + '...'}
              </div>
            )}
            <div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className={classes.profileImage}
                />
              ) : (
                <img
                  src={Profile}
                  className={classes.profileImage}
                  alt="profile"
                />
              )}
            </div>
          </div>
          <div className="dropdown-content">
            <div className={classes.profileList}>
              <ListItem
                button
                className={classes.hoverProfile}
                component={Link}
                to="/profile-details"
              >
                <ListItemIcon>
                  <SubscriptionsOutlined />
                </ListItemIcon>
                <ListItemText primary="My Subscription" />
              </ListItem>
              <ListItem
                button
                className={classes.hoverProfile}
                component={Link}
                to="/profile-details"
              >
                <ListItemIcon>
                  <PersonOutline />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem
                button
                className={classes.hoverProfile}
                component={Link}
                to="/profile-settings"
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button className={classes.hoverProfile}>
                <ListItemIcon>
                  <ForwardOutlined />
                </ListItemIcon>
                <ListItemText primary="Bulk Pins" />
              </ListItem>
              <ListItem
                button
                className={classes.hoverProfile}
                onClick={() => openDialog('logout')}
              >
                <ListItemIcon>
                  <PowerSettingsNewOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout " />
              </ListItem>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <Container position="fixed" className={classes.container}>
        <div className={classes.root}>
          <AppBar className={classes.header}>
            <Toolbar className={classes.headerwidth}>
              {/* <div>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon />
                </Button>
              </div> */}
              <div>
                <a href="/">
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ height: 40, display: 'flex', lineHeight: '22px' }}
                  />
                </a>
              </div>
              <div className="dropdown">
                <div className={classes.link}>
                  <Dashboard style={{ marginRight: 10 }} />
                  <span>Market Place</span>
                </div>
                <div className="dropdown-content">
                  <div className={classes.examList}>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        {' '}
                        <LibraryBooksOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Educational exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <ForwardOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Entrance exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <ReceiptOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Internship Exams " />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <WorkOutlineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Job exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <CloudOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Overseas Exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <CollectionsBookmarkOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Professional/career exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <EmojiEventsOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Scholarship Exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon>
                        <LocalLibraryOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Personal development/IQ Exams" />
                    </ListItem>
                    <ListItem button className={classes.hoverProfile}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Other categories" />
                    </ListItem>
                  </div>
                </div>
              </div>
              <div className={classes.flexDiv} style={{ width: 481 }}>
                <div>
                  <InputBase
                    placeholder="Search for exams, Leagues and exams center"
                    classes={{
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <Button className={classes.searchIcon}>
                  <Search />
                </Button>
              </div>
              <div>{profileSwitch()}</div>
            </Toolbar>
          </AppBar>
        </div>
        {dialogBox}
      </Container>
      {toastMessage && (
        <Toast
          message={toastMessage}
          showToast={toggleToast}
          status={Boolean(toastMessage)}
        />
      )}
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
      {/* <TempoaryDrawer anchor={anchor} /> */}
    </Fragment>
  );
}
