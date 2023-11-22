import {
  IconEdit,
  IconEye,
  IconTrash,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import "./saleright.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SaleRightTran from "../saleRightTran/SaleRightTran";

const SaleRight = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { change, saleId, changeChange, changeSaleId } =
    useContext(UserContext);
  const [saleRightTranData, setSaleRightTranData] = useState([]);
  const [custData, setCustData] = useState({});

  const [data, setData] = useState({
    sale_prefix: "",
    sale_prefix_no: "",
    sale_name: "",
    sale_date: "",
    sale_time: "",
    cust_cnct_id: 0,
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchDataById/${saleId}`)
      .then((response) => {
        setData({
          ...data,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_name: response.data[0].sale_name,
          sale_date: response.data[0].sale_date,
          sale_time: response.data[0].sale_time,
          cust_cnct_id: response.data[0].cust_cnct_id,
          sale_amt: response.data[0].sale_amt,
          sale_amt_due: response.data[0].sale_amt_due,
          sale_amt_type: response.data[0].sale_amt_type,
          sale_payment_in_id: response.data[0].sale_payment_in_id,
          sale_payment_in_prefix: response.data[0].sale_payment_in_prefix,
          sale_payment_in_prefix_no: response.data[0].sale_payment_in_prefix_no,
          sale_amt_paid: response.data[0].sale_amt_paid,
        });
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchSaleTran/${saleId}`)
      .then((response) => {
        setSaleRightTranData(response.data);
      });
  }, [change, saleId]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/auth/fetchCust/${data.cust_cnct_id}`
      )
      .then((response) => {
        setCustData({
          ...custData,
          cust_name: response.data[0].cust_name,
          cust_number: response.data[0].cust_number,
          sale_name: response.data[0].sale_name,
          sale_date: response.data[0].sale_date,
        });
      });
  }, [data]);

  const deleteSales = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/sale/delSales/${saleId}`
      );
      changeChange();
      changeSaleId(0);
      props.snack();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const time1 = new Date(data.sale_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const total_amt = saleRightTranData
    .map(
      (item) =>
        parseFloat(item.sale_item_qty) *
        (parseFloat(item.sale_item_disc_price) +
          parseFloat(item.sale_item_gst_amt ? item.sale_item_gst_amt : 0))
    )
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  return (
    <div className="saleRight">
      <div className="saleCard">
        <div className="grid grid-cols-2 p-4 border-b border-slate-100 cnt">
          <div className="flex gap-4">
            <div className="details flex flex-col gap-2 ">
              <div className="date font-semibold flex items-center gap-2 text-slate-900 text-xl">
                {console.log("data.sale_prefix_no : ", data.sale_prefix_no)}
                {data.sale_payment_in_id === null
                  ? data.sale_prefix + "#" + data.sale_prefix_no
                  : data.sale_payment_in_prefix +
                    "#" +
                    data.sale_payment_in_prefix_no}
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {fhours + ":" + fminutes + " " + AMPM} , {data.sale_date}
              </div>
            </div>
          </div>
          <div className="editndel flex justify-center gap-4 self-center">
            {data.sale_payment_in_id === null ? (
              <button
                className="flex items-center gap-2 rounded text-emerald-600 p-1 hover:bg-emerald-600 hover:text-white"
                style={{
                  border: "1px solid rgb(5, 150, 105)",
                  transition: "all 400ms ease-in-out",
                }}
                onClick={props.pdf}
              >
                <IconEye className="w-5 h-5" />
                View Pdf
              </button>
            ) : (
              ""
            )}

            {data.sale_amt_due > 0 ? (
              <button
                className="flex items-center gap-2 p-2 rounded text-amber-400 hover:text-white hover:bg-amber-500"
                onClick={props.addPayment}
                style={{
                  border: "1px solid rgb(245, 158, 11)",
                  transition: "all 300ms ease-in-out",
                }}
              >
                <IconWallet />
                Payment In
              </button>
            ) : (
              " "
            )}
            <button className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700">
              <IconEdit className="w-5 h-5" /> Edit
            </button>
            <button
              className="flex items-center gap-2 del p-2 rounded text-red-600 hover:text-white hover:bg-red-600"
              onClick={handleClickOpen}
            >
              <IconTrash className="w-5 h-5" /> Delete
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div className="flex">
                <div className="pt-5 pl-3">
                  <IconAlertOctagonFilled size={60} className="text-red-600" />
                </div>
                <div>
                  <DialogTitle id="alert-dialog-title">
                    Are You Sure ?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You are about to delete this Entry This action cannot be
                      undone.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions className="flex gap-4">
                    <button className="pb-3" onClick={handleClose}>
                      Cancel
                    </button>
                    <button
                      className="delete-btn text-red-600 pb-3 pr-3"
                      onClick={deleteSales}
                      autoFocus
                    >
                      Delete Entry
                    </button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
          </div>
        </div>

        <div
          className="flex justify-between space-x-6 items-center p-6"
          key={saleId}
        >
          <div className="flex items-center gap-4">
            <div className="icon2 bg-cyan-50">
              <IconUser className="text-cyan-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{custData.cust_name}</span>

              <span className="text-slate-500 text-xs">
                {custData.cust_number}
              </span>
            </div>
          </div>

          {data.sale_payment_in_id === null ? (
            <div>
              {data.sale_amt_due === data.sale_amt ? (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.sale_amt).toFixed(2)}
                  </div>
                  <div>Unpaid</div>
                </div>
              ) : (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.sale_amt).toFixed(2)}
                  </div>
                  <div>
                    {data.sale_amt_due > 0 ? "Partially Paid" : "Fully Paid"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center  flex-col">
              <div className="text-slate-700">
                ₹ {parseFloat(data.sale_amt_paid).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 m-5 bg-slate-100 text-lg font-semibold text-slate-800">
        <div>{data.sale_payment_in_id === null ? "Items" : "Enteries"}</div>
      </div>
      {data.sale_payment_in_id === null ? (
        <div className="information">
          {saleRightTranData.map((item, index) => (
            <div key={index}>
              <SaleRightTran
                sale_payment_in_id={data.sale_payment_in_id}
                data={item}
                total_amt={total_amt}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="information">
          <div>
            {console.log("data.sale_prefix_no : ", data.sale_prefix_no)}
            <SaleRightTran
              sale_payment_in_id={data.sale_payment_in_id}
              sale_amt_paid={data.sale_amt_paid}
              sale_prefix={data.sale_prefix}
              sale_prefix_no={data.sale_prefix_no}
              total_amt={total_amt}
            />
          </div>
        </div>
      )}
      <div className="flex justify-between px-7 py-5 border-t border-slate-300 text-lg border-l">
        <div className="font-semibold">Net Amount</div>
        <div className="text-slate-800 justify-self-end font-semibold">
          ₹{" "}
          {data.sale_payment_in_id === null
            ? total_amt.toFixed(2)
            : parseFloat(data.sale_amt_paid).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default SaleRight;
