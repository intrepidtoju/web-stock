import React, {Fragment, useState} from 'react';
import {Grid, Card, Button, FormControl, InputLabel, Input,} from '@material-ui/core';
import {useForm, useToast} from '../../utils/hooks';
import { postContent, errorMessage} from '../../utils';
import { Toast} from '../../utils/addon';
import Reset from '../../images/reset.svg';
import {useHistory} from 'react-router-dom';

export default function ForgottenPassword (props){
    const { getData, values, submit } = useForm(forgottenPasswordLink);
    const token = props.match.params.token;
    const { toastMessage, toggleToast } = useToast();
    const history = useHistory();

    async function forgottenPasswordLink() {
      if(values.password === values.confirmPassword){
        try {
          const data = {...values, token:token};
          const passwordReset = await postContent({
            url: '/user/security/reset-password',
            data,
          });
    
          if (passwordReset.success) {
            toggleToast('successful')
            history.push('/');
          }
        } catch (err) {
          toggleToast(errorMessage(err));
        }
      } else{
        toggleToast('incorrect password');
      }
        
    }

    return(
        <Fragment>
          <Grid container spacing={3} style={{marginTop: 150}}>
              <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
              <Grid item xs={10} sm={10} md={8} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <img src={Reset} alt='ResetImage' style={{height: '90%', width: '100%', }}/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                      <div style={{textAlign: 'center', padding: 20, marginTop: 40}}>
                        <div>Recover your password</div>
                        <form onSubmit={submit} >
                          <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password </InputLabel>
                            <Input id="password" type="password" onChange={getData} autoFocus />
                          </FormControl>
                          <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
                            <Input
                            onChange={getData}
                            id="confirmPassword"
                            type="password"
                            />
                          </FormControl>
                          <FormControl fullWidth>
                            <Button style={{marginTop: 30, background: 'white'}} color='primary' variant='outlined' type='submit'>sign in
                              {/* {isLoading && <CircularProgress size={15} />} */}
                            </Button>
                          </FormControl>
                        </form>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} sm={1} md={2} lg={2}></Grid>
          </Grid>
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