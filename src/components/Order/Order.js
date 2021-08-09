import { FormControl, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import Startup from '../../images/Startup.svg';
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

export default function Orders() {
  const columns = [
    {
      field: 'name',
      title: 'Name',
      filtering: true,
    },
    {
      field: 'quantity',
      title: 'Quantity',
      filtering: true,
    },
  ];

  const { dialog, openDialog, dialogValue } = useDialog();
  const classes = useStlyes();
  const [company, setCompany] = useState([]);
  const [product, setProduct] = useState([]);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(createOrder);
  const [loading, setLoading] = useState(false);

  async function createOrder() {
    try {
      setLoading(true);
      await postContent({
        url: `/order/create`,
        data: values,
      });
      await getProducts();
      openDialog(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toggleToast(error.message);
    }
  }

  async function getProducts() {
    try {
      const company = await getContent({
        url: `/order`,
      });

      console.log('Orders', company);
      const modifiedOrders = company.data.map((datum) => {
        return {
          ...datum,
          quantity:
            datum.quantity <= 5 ? (
              <label style={{ color: 'red' }}>{datum.quantity}</label>
            ) : (
              <label style={{ color: 'green' }}>{datum.quantity}</label>
            ),
        };
      });
      setCompany([...modifiedOrders]);
    } catch (err) {
      toggleToast(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getProducts();
      const product = await getContent({
        url: `/product`,
      });
      setProduct([...product.data]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let dialogBox;
  switch (dialog) {
    case 'company':
      dialogBox = (
        <FormDialog
          open={Boolean(dialog)}
          title="Create Order"
          width="md"
          toggle={openDialog}
          fullWidth={true}
          handleSubmit={submit}
          showProgress={loading}
          content={
            <Fragment>
              <Grid container spacing={3} style={{ overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={Startup} alt="register" style={{ height: '400px', width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl margin="normal" required fullWidth>
                    <div
                      className={classNames({
                        'AdminLoginform-control': true,
                      })}
                    >
                      <label htmlFor="name">Quantity</label>
                      <input
                        type="number"
                        placeholder="Quantity"
                        id="quantity"
                        required
                        onChange={getData}
                      />
                    </div>
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <div
                      className={classNames({
                        'AdminLoginform-control': true,
                      })}
                    >
                      <label htmlFor="productId">Select Product</label>
                      <select className="select-css" id="productId" onChange={getData}>
                        <option>Please Select a Product</option>
                        {product.map((datum) => (
                          <option value={datum.id}> {datum.name}</option>
                        ))}
                      </select>
                    </div>
                  </FormControl>

                  <FormControl margin="normal" required>
                    <button
                      className={classNames({
                        [classes.btn]: true,
                        [classes.btnSecondary]: true,
                      })}
                    >
                      {loading && (
                        <i className="fa fa-refresh fa-spin" style={{ marginRight: '5px' }} />
                      )}
                      {loading && <span> Loading...</span>}
                      {!loading && <span> Create Order </span>}
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
          <div style={{ fontSize: 20, fontWeight: 700 }}>Orders</div>
          <div>
            <button
              className={classNames({
                [classes.btn]: true,
                [classes.btnSecondary]: true,
              })}
              onClick={() => {
                openDialog('company');
              }}
            >
              + Create Order
            </button>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <Table title="Orders" columns={columns} data={company} />
        </div>
        {dialogBox}
        {toastMessage && (
          <Toast message={toastMessage} showToast={toggleToast} status={Boolean(toastMessage)} />
        )}
      </div>
    </MainContainer>
  );
}
