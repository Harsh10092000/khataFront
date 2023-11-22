
import {
  IconEdit,
  IconEye,
  IconTrash,
  IconUser,
  IconAlertOctagonFilled,
  IconWallet,
} from "@tabler/icons-react";
import "./purright.scss";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { UserContext } from "../../../context/UserIdContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PurRightTran from "../purRightTran/PurRightTran";

const PurRight = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { change, purchaseId, changeChange, changePurchaseId } =
    useContext(UserContext);
  const [purchaseRightTranData, setPurchaseRightTranData] = useState([]);
  const [supData, setSupData] = useState({});

  const [data, setData] = useState({
    purchase_prefix: "",
    purchase_prefix_no: "",
    purchase_name: "",
    purchase_date: "",
    purchase_time: "",
    sup_cnct_id: 0,
  });
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchDataById/${purchaseId}`
      )
      .then((response) => {
        setData({
          ...data,
          purchase_prefix: response.data[0].purchase_prefix,
          purchase_prefix_no: response.data[0].purchase_prefix_no,
          purchase_name: response.data[0].purchase_name,
          purchase_date: response.data[0].purchase_date,
          purchase_time: response.data[0].purchase_time,
          sup_cnct_id: response.data[0].sup_cnct_id,
          purchase_amt: response.data[0].purchase_amt,
          purchase_amt_due: response.data[0].purchase_amt_due,
          purchase_amt_type: response.data[0].purchase_amt_type,
          purchase_pay_out_id: response.data[0].purchase_pay_out_id,
          purchase_pay_out_prefix: response.data[0].purchase_pay_out_prefix,
          purchase_pay_out_prefix_no: response.data[0].purchase_pay_out_prefix_no,
          purchase_amt_paid: response.data[0].purchase_amt_paid,
        });
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/purchase/fetchPurchaseTran/${purchaseId}`
      )
      .then((response) => {
        setPurchaseRightTranData(response.data);
        
      });
  }, [change, purchaseId]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/sup/fetchSup/${data.sup_cnct_id}`
      )
      .then((response) => {
        setSupData({
          ...supData,
          sup_name: response.data[0].sup_name,
          sup_number: response.data[0].sup_number,
          purchase_name: response.data[0].purchase_name,
          purchase_date: response.data[0].purchase_date,
        });
      });
  }, [data]);

  const purchaseRightTranDataArray = [];
  for (let i = 0; i < purchaseRightTranData.length; i++) {
      purchaseRightTranDataArray.push(purchaseRightTranData[i]);
  }

  const deletePurchase = async () => {
    try {
      // await axios.delete(
      //   import.meta.env.VITE_BACKEND + `/api/purchase/delPurchase/${purchaseId}`
      // );
      console.log("purchaseRightTranDataArray : " , purchaseRightTranDataArray , typeof(purchaseRightTranDataArray) )
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/purchase/updateProductStockQty",
        [purchaseRightTranDataArray]
      );
      changeChange();
      changePurchaseId(0);
      props.snack();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const time1 = new Date(data.purchase_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const total_amt = purchaseRightTranData
    .map(
      (item) =>
        parseFloat(item.purchase_item_qty) *
        (parseFloat(item.purchase_item_disc_price) +
          parseFloat(
            item.purchase_item_gst_amt ? item.purchase_item_gst_amt : 0
          ))
    )
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  return (
    <div className="w-full">
      <div className="saleCard">
        <div className="grid grid-cols-2 p-4 border-b border-slate-100 cnt">
          <div className="flex  gap-4">
            <div className="details flex flex-col gap-2 ">
              <div className="date font-semibold flex items-center gap-2 text-slate-900 text-xl">
                {data.purchase_pay_out_id === null
                  ? data.purchase_prefix + "#" + data.purchase_prefix_no
                  : data.purchase_pay_out_prefix +
                    "#" +
                    data.purchase_pay_out_prefix_no}
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {fhours + ":" + fminutes + " " + AMPM} , {data.purchase_date}
              </div>
            </div>
          </div>
          {/* <div className="editndel flex justify-center gap-4 self-center">
            {data.purchase_pay_out_id === null ? (
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

            {data.purchase_amt_due > 0 ? (
              <button
                className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
                onClick={props.addPayment}
              >
                Payment In
              </button>
            ) : (
              " "
            )}
            <button
              className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
              //   onClick={props.edit}
            >
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
          </div> */}
          <div className="editndel flex justify-center gap-4 self-center w-[25vw]">
            {data.purchase_pay_out_id === null ? (
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

            {data.purchase_amt_due > 0 ? (
              <button
                className="flex items-center gap-2 p-2 rounded text-amber-400 hover:text-white hover:bg-amber-500"
                style={{
                  border: "1px solid rgb(245, 158, 11)",
                  transition: "all 300ms ease-in-out",
                }}
                onClick={props.addPayment}
              >
                <IconWallet />
                Payment Out
              </button>
            ) : (
              " "
            )}
            <button
              className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
              style={{
                border: "1px solid #2b59da",
                transition: "all 300ms ease-in-out",
              }}
            >
              <IconEdit className="w-5 h-5" /> Edit
            </button>
            <button
              className="flex items-center gap-2 del p-2 rounded text-red-600 hover:text-white hover:bg-red-600"
              style={{
                border: "1px solid #dc2626",
                transition: "all 300ms ease-in-out",
              }}
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
                      autoFocus
                      onClick={deletePurchase}
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
          key={purchaseId}
        >
          <div className="flex items-center gap-4">
            <div className="icon2 bg-cyan-50">
              <IconUser className="text-cyan-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{supData.sup_name}</span>

              <span className="text-slate-500 text-xs">
                {supData.sup_number}
              </span>
            </div>
          </div>

          {data.purchase_pay_out_id === null ? (
            <div>
              {data.purchase_amt_due === data.purchase_amt ? (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.purchase_amt).toFixed(2)}
                  </div>
                  <div>Unpaid</div>
                </div>
              ) : (
                <div className="flex items-center  flex-col">
                  <div className="text-slate-700">
                    ₹ {parseFloat(data.purchase_amt).toFixed(2)}
                  </div>
                  <div>
                    {data.purchase_amt_due > 0
                      ? "Partially Paid"
                      : "Fully Paid"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center  flex-col">
              <div className="text-slate-700">
                ₹ {parseFloat(data.purchase_amt_paid).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 m-5 bg-slate-100 text-lg font-semibold text-slate-800">
        <div>{data.purchase_pay_out_id === null ? "Items" : "Enteries"}</div>
      </div>

      
      {data.purchase_pay_out_id === null ? (
        <div className="information1">
          {purchaseRightTranData.map((item, index) => (
            <div key={index}>
              
              <PurRightTran
                purchase_pay_out_id={data.purchase_pay_out_id}
                data={item}
                total_amt={total_amt}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="information1">
          <div>
            
            <PurRightTran
              purchase_pay_out_id={data.purchase_pay_out_id}
              purchase_amt_paid={data.purchase_amt_paid}
              purchase_prefix={data.purchase_prefix}
              purchase_prefix_no={data.purchase_prefix_no}
              total_amt={total_amt}
            />
          </div>
        </div>
      )}

      {/* <div className="information">
        {saleRightTranData.map((item, index) => (
          <div key={index}>
            <SaleRightTran data={item} total_amt={total_amt} />
          </div>
        ))}
      </div> */}
      <div className="flex justify-between px-7 py-5 border-t border-slate-300 text-lg border-l">
        <div className="font-semibold">Net Amount</div>
        <div className="text-slate-800 justify-self-end font-semibold">
          ₹{" "}
          {data.purchase_pay_out_id === null
            ? total_amt.toFixed(2)
            : parseFloat(data.purchase_amt_paid).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default PurRight;
