import { FormControl, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import Manufacturing from '../../images/Manufacturing.svg';
import { getContent, postContent } from '../../utils';
import { FormDialog, Loading, Table, Toast } from '../../utils/addon';
import { useDialog, useForm, useToast } from '../../utils/hooks';
import MainContainer from '../MainContainer/MainContainer';

const useStlyes = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    // backgroundColor: 'white',
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    borderRadius: 2,
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: 'Red Hat Text !important',
    fontSize: 12,
    padding: '8px 24px',
    opacity: 1,
  },
  btnSecondary: {
    borderColor: '#5CB85C',
    backgroundColor: '#5CB85C',
  },
}));

export default function Products() {
  const columns = [
    {
      field: 'name',
      title: 'Name',
    },

    {
      field: 'quantity',
      title: 'Quantity',
    },
  ];

  const { dialog, openDialog } = useDialog();
  const classes = useStlyes();
  const [depots, setDepots] = useState([]);

  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(addDepots);
  const [loading, setLoading] = useState(false);

  async function addDepots() {
    try {
      setLoading(true);
      await postContent({
        url: `/product/create`,
        data: values,
      });
      await getDepots();
      openDialog(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toggleToast(error.message);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      submit(e);
    } catch (error) {}
  }

  async function getDepots() {
    try {
      const depots = await getContent({
        url: `/product`,
      });

      setDepots([...depots.data]);
    } catch (err) {
      toggleToast(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getDepots();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let dialogBox;
  switch (dialog) {
    case 'depot':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          title="Add Product"
          width="md"
          toggle={openDialog}
          fullWidth={true}
          handleSubmit={submit}
          showProgress={loading}
          content={
            <Fragment>
              <Grid container spacing={3} style={{ overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img
                    src={Manufacturing}
                    alt="register"
                    style={{ height: '400px', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl margin="normal" required fullWidth>
                    <div
                      className={classNames({
                        'AdminLoginform-control': true,
                      })}
                    >
                      <label htmlFor="name">Name</label>
                      <input type="text" placeholder="Name" id="name" required onChange={getData} />
                    </div>
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <div
                      className={classNames({
                        'AdminLoginform-control': true,
                      })}
                    >
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="text"
                        placeholder="Quantity"
                        id="quantity"
                        required
                        onChange={getData}
                      />
                    </div>
                  </FormControl>

                  <FormControl margin="normal" required>
                    <button
                      className={classNames({
                        [classes.btn]: true,
                        [classes.btnSecondary]: true,
                      })}
                    >
                      Create Product
                    </button>
                  </FormControl>
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
  return loading ? (
    <Loading />
  ) : (
    <MainContainer>
      <div className={classes.mainDiv}>
        <div className={classes.titleDiv}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Products</div>
          <div>
            <button
              className={classNames({
                [classes.btn]: true,
                [classes.btnSecondary]: true,
              })}
              onClick={() => {
                openDialog('depot');
              }}
            >
              + Add Product
            </button>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <Table title="Products" columns={columns} data={depots} />
        </div>
        {dialogBox}
        {toastMessage && (
          <Toast message={toastMessage} showToast={toggleToast} status={Boolean(toastMessage)} />
        )}
      </div>
    </MainContainer>
  );
}
