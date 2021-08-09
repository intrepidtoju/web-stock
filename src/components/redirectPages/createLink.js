import React, {Fragment, useState, useEffect} from 'react';
import {Grid, FormControl, Input, InputLabel, Button, makeStyles, CircularProgress} from '@material-ui/core';
import {CheckCircleOutlined, CancelOutlined} from '@material-ui/icons';
import {getContent, postContent, errorMessage, session} from '../../utils';
import { useForm, useDialog, useToast } from '../../utils/hooks';
import Cancel from '../../images/cancel.svg';
import Confirm from '../../images/confirm.svg';
import {FormDialog, Toast} from '../../utils/addon';
import ResendMail from '../../images/resendMail.svg';
import Login from '../../images/login.svg';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    recover:{
      background: '#ff7a21',
      color: 'white',
      marginTop: 30,
      '&:hover':{
        background: '#ff7a21',
        color: 'white',
      }
    },
    loading:{
      color: '#5a5a5a',
      marginLeft: 20,
    },
    create: {
        background: '#ff7a21',
        color: 'white',
        marginTop: 20,
        '&:hover':{
          background: '#ff7a21',
          color: 'white',
        }
      },
}));

export default function Verification (props){
    const classes = useStyles();
    const token = props.match.params.token;
    const [response, setResponse] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [message, setMessage] = useState();
    const forgottenPassword = useForm(getForgottenPassword);
    const { toastMessage, toggleToast } = useToast();
    const { dialog, openDialog } = useDialog();
    const loginData = useForm(login);
    const history = useHistory();

    async function getForgottenPassword() {
        try {
          setIsLoading(true);
          const data = {...forgottenPassword.values, redirectUrl:'http://localhost:3000/auth/email-verification'}
          const password = await postContent({
            url: '/user/verification/email',
            data
          });
          if (password.success) {
            setMessage(password.message)
            openDialog(false)
            openDialog('confirm');
            history.push('/');
          }
      } catch (err) {
        setIsLoading(false)
        toggleToast(errorMessage(err));
      }
    
    }

    async function emailVerification() {
        try {
          const verified = await getContent({
            url: `/user/verification/email/${token}`
        });
        
          setResponse(verified);
          setIsLoading(false);
          history.push('/');
        } catch (err) {
            setResponse(err.response.data);
            setIsLoading(false);
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
          setIsLoading(false)
          alert(err.message);
        }
      }

    useEffect(async ()=>await emailVerification(), []);
    
      
    let dialogBox;
    switch (dialog) {

        case 'resendMail':
          dialogBox = (
               <FormDialog
              open={Boolean(dialog)}
              title="Email Verification"
              width="md"
              toggle={openDialog}
              handleSubmit={forgottenPassword.submit}
              fullWidth={true}
              content={
                <Fragment>
                  <Grid container spacing={3} style={{overflow: 'hidden'}}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <img src={ResendMail} alt='ResendMail' style={{height: '90%', width: '100%', }}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <div style={{textAlign: 'center', color: '#999',marginTop: 40}}>Enter your email address and we will send you a link to complete your account creation.</div>
                      <div style={{marginTop: 20}}>
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            onChange={forgottenPassword.getData}
                            id="email"
                            type="email"
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <Button className={classes.recover} type='submit'>
                            Forward email for verification
                            {isLoading && <CircularProgress size={15} className={classes.loading}/>}
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

          case 'confirm':
            dialogBox = (
              <FormDialog
                open={Boolean(dialog)}
                fullWidth={true}
                title= 'Email Verification'
                width="xs"
                toggle={openDialog}
                caption={message}
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
                        <Grid container spacing={3} style={{overflow: 'hidden'}}>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <img src={Login} alt='register' style={{height: '400px', width: '100%', }}
            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                              <div style={{marginTop: 40}}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="username">Phone number or Email</InputLabel>
                                    <Input id="username" type="text" onChange={loginData.getData} autoFocus />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                    onChange={loginData.getData}
                                    id="password"
                                    type="password"
                                    />
                                </FormControl>
                                <div style={{cursor: 'pointer', color: '#999', marginTop: 20}} id='forgotten' onClick={()=>{ openDialog('forgotPassword')}}> 
                                    Forgot password ?
                                </div>
                                <FormControl fullWidth>
                                    <Button className={classes.create} style={{marginBottom: 25}} type='submit'>sign in
                                    {isLoading && <CircularProgress size={15} className={classes.loading}/>}
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
      default:
        dialogBox = null;
    }

    const proceedButton=<Button style={{background: '#ff7a21', color: 'white', marginBottom: 30}}  onClick={()=> openDialog('login')}>Proceed to Login</Button>

    const errorButton = <Button style={{background: '#ff7a21', color: 'white', marginBottom: 30}}  onClick={()=>openDialog('resendMail')} >Resend verification token</Button>


    return(
        <Fragment>
            <Grid container spacing={3} style={{marginTop: 150}}>
                <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    {isLoading ? <h1>Loading</h1> :
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    {response.success ?  
                                        <img src={Confirm} alt='confirmImage' style={{height: '100%', width: '100%'}}/> :
                                        <img src={Cancel} alt='cancelImage'  style={{height: '100%', width: '100%'}}/> }
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}> <div style={{marginTop: 30, textAlign: 'center', padding: 20}}>
                                    <div>
                                        {response.success ? <CheckCircleOutlined style={{ color: 'green', fontSize: 60}}/>: <CancelOutlined style={{ color: 'red',  fontSize: 60}}/>}
                                        </div>
                                        <div style={{marginTop: 20, marginBottom: 20, fontFamily: 'red hat display', fontSize: 20, color: '#5a5a5a'}}>
                                            {response.message}
                                        </div>
                                        {response.error === "ENTRY_EXISTS" ? proceedButton : errorButton}
                                    </div>
                                  
                                </Grid>
                            </Grid>
                           
                    }
                </Grid>
                <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
            </Grid>
            {dialogBox}
            {toastMessage && (
              <Toast
                message={toastMessage}
                showToast={toggleToast}
                status={Boolean(toastMessage)}
              />
            )}
        </Fragment>
    )
}