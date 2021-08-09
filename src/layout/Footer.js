import React, { Fragment, useState } from 'react';
import {
  Button,
  makeStyles,
  Grid,
  FormControl,
  Card,
  Input,
  InputLabel,
} from '@material-ui/core';
import { Facebook, Twitter, Instagram } from '@material-ui/icons';
import Logo from '../images/logo.png';
import Google from '../images/googlLogo.png';

const useStyles = makeStyles((theme) => ({
  width: {
    width: '80%',
    marginLeft: '10%',
    fontFamily: 'Red Hat Text !important',
  },
  image: {
    width: '70%',
    height: 470,
  },
  top20: {
    marginTop: 20,
  },
  text: {
    fontFamily: 'Red Hat Text !important',
  },
  button: {
    background: '#ff7a21',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    borderRadius: '0 10px 0 10px',
    padding: '5px 10px',
    fontFamily: 'Red Hat Text !important',
  },
}));

export default function Body() {
  const classes = useStyles();

  return (
    <Fragment>
      <div style={{ paddingBottom: 40 }} className="footer">
        <div className={classes.width}>
          <Grid container spacing={3} className={classes.top20}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div>
                <h3 style={{ color: 'white' }}>ABOUT CBT.ng</h3>
                <div className="footerContent">
                  <div>About us</div>
                  <div>Contact us</div>
                  <div>Support</div>
                  <div>FAQ</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div>
                <h3 style={{ color: 'white' }}>SERVICES</h3>
                <div className="footerContent">
                  <div>CBT.ng as a marketplace</div>
                  <div>CBT.ng for Human Resource</div>
                  <div>CBT.ng for Companies</div>
                  <div>CBT.ng for School</div>
                  <div>CBT.ng Api</div>
                  <div>Be a partner</div>
                  <div>Hire our expertise</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <div>
                <h3 style={{ color: 'white' }}>ACTIONS</h3>
                <div className="footerContent">
                  <div>Public Exams</div>
                  <div>Public Leagues</div>
                  <div>Duece Arena</div>
                  <div>Exam Center</div>
                  <div>Access E-pins</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <div>
                <img
                  src={Logo}
                  alt="logo"
                  style={{
                    marginLeft: 'auto',
                    display: 'block',
                    marginRight: 'auto',
                  }}
                />
              </div>
              <div className={classes.top20}>
                <img
                  src={Google}
                  alt="logo"
                  style={{
                    height: 50,
                    width: '50%',
                    marginLeft: 'auto',
                    display: 'block',
                    marginRight: 'auto',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 20,
                  color: '#ebe6e6',
                  fontFamily: 'red hat display',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Connect with us
              </div>
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Facebook
                  style={{ color: '#3b5998', marginRight: 20, fontSize: 40 }}
                />
                <Twitter
                  style={{ color: '#00acee', marginRight: 20, fontSize: 40 }}
                />
                <Instagram style={{ color: '#8134AF', fontSize: 40 }} />
              </div>
            </Grid>
          </Grid>
          <div className={classes.top20}>
            <hr className="hrLinePlain" />
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                justifyContent: 'space-between',
                color: '#ebe6e6',
              }}
            >
              <div>
                {' '}
                <span style={{ fontSize: 20 }}>&#169;</span> copyright 2020,
                MyRewin Technology Limited
              </div>
              <div>Privacy Policy</div>
              <div>Terms of use</div>
              <div>
                <img
                  src={Google}
                  alt="logo"
                  style={{ height: 30, width: 80 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
