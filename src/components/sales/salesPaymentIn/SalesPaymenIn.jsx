import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  IconX,
  IconTrashFilled,
} from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "./salespaymentin.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const PaymentIn = (props) => {
  const {change, changeChange, saleId } = useContext(UserContext);
  const [salesPrefixData, setSalesPrefixData] = useState([]);
  
  const [defaultPaymentPrefixNo, setDefaultPaymentPrefixNo] = useState(0);

  
  const [saleData, setSaleData] = useState({
    sale_name : "",
    sale_date: "",
    sale_prefix: "",
    sale_prefix_no: "",
    sale_amt: "",
    sale_amt_due: "",
    cust_cnct_id: "",
    sale_amt_type: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sale/fetchDataById/${saleId}`)
      .then((response) => {
        setSaleData({
          ...saleData,
          sale_name: response.data[0].sale_name,
          sale_date: response.data[0].sale_date,
          sale_prefix: response.data[0].sale_prefix,
          sale_prefix_no: response.data[0].sale_prefix_no,
          sale_amt: response.data[0].sale_amt,
          sale_amt_due: response.data[0].sale_amt_due,
          cust_cnct_id: response.data[0].cust_cnct_id,
          sale_amt_type: response.data[0].sale_amt_type,
          sale_id: response.data[0].sale_id,
          sale_amt_paid: response.data[0].sale_amt_paid,
        });
      });
      axios
      .get(import.meta.env.VITE_BACKEND + "/api/sale/fetchPaymentPrefixData")
      .then((response) => {
        setSalesPrefixData(response.data);
        setDefaultPaymentPrefixNo(response.data[0].sale_payment_in_prefix_no);
      });
  }, [change]);

  console.log("saleData : " , saleData)
  

  const [searchValue, setSearchValue] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  var date1 = transactionDate.$d;
  var filteredDate = date1.toString().slice(4, 16);

  const [addPrefix, setAddPrefix] = useState(false);
  const [prefixValue, setPrefixValue] = useState("");
  const [temp, setTemp] = useState("");

  const [prefixSelected, setprefixSelected] = useState(true);
  const prefixSelectorHandler = () => {
    setprefixSelected(!prefixSelected);
  };

  
 
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    enqueueSnackbar(msg, { variant });
  };

  const [prefixNo, setPrefixNo] = useState(1);
  useEffect(() => {
    salesPrefixData
      .filter((code) => code.sale_payment_in_prefix === prefixValue)
      .map(
        (item) => setPrefixNo(item.sale_payment_in_prefix_no + 1)
        //setPrefixValue("Expenses")
      );
  }, [addPrefix]);

  const [amtIn , SetAmtIn] = useState(0);
  const [payMode, setPayMode] = useState("cash");

  const [submitDisabled, setSubmitDisabled] = useState(false);
  //   useEffect(() => {
  //     if (sum !== "" && sum !== 0 && categoryName !== "Choose Category") {
  //       setSubmitDisabled(false);
  //     } else {
  //       setSubmitDisabled(true);
  //     }
  //   }, [sum, categoryName]);

  const [payData ,setPayData] = useState({
    sale_prefix: "",
    sale_prefix_no: "",
    sale_name : "",
    sale_cnct_id : "",
    sale_payment_in_prefix : "",
    sale_payment_in_prefix_no : "",
    sale_amt_in : "",
    sale_amt_in_date : "",
    sale_amt_in_mode : "",
    sale_cust_cnct_id : "",
    amt_paid: "",
    amt_due : ""
  })

  payData.sale_prefix = saleData.sale_prefix;
  payData.sale_prefix_no = saleData.sale_prefix_no;
  payData.sale_name = saleData.sale_name;
  payData.sale_cnct_id = saleData.sale_id;
  payData.sale_cust_cnct_id = saleData.cust_cnct_id;
  payData.sale_payment_in_prefix = "PaymentIn";
  payData.sale_payment_in_prefix_no = parseInt(defaultPaymentPrefixNo) + 1;
  payData.sale_amt_in = amtIn;
  payData.sale_amt_in_date = filteredDate;
  payData.sale_amt_in_mode = payMode;
  payData.sale_desc = "PAYMENT IN";
  payData.amt_paid = parseInt(saleData.sale_amt_paid) + parseInt(amtIn);
  payData.amt_due = saleData.sale_amt_due - amtIn;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/sale/addSalePayment", payData);
      await axios.put("http://localhost:8000/api/sale/updateBalanceDue", payData);
      changeChange();
     props.snack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text_left heading">You Got</h1>

      <div className="add-expense-section-wrapper">
        <div className="section-2">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="box-sec ">
              <div className="sec-1 w-[50%] pt-2">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value="PaymentIn"
                  name="prefix_name"
                  className=" w-[65%]"
                  required
                  
                />
                
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    prefixValue === "" || prefixValue === undefined
                      ? parseInt(defaultPaymentPrefixNo) + 1
                      : prefixNo
                  }
                  name="prefix_number"
                  
                  className=" w-[35%]"
                  required
                />
              </div>
              <div className="sec-2 w-[50%]">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="pt-0"
                >
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Date"
                      value={todaysDate}
                      format="LL"
                      maxDate={todaysDate}
                      onChange={(e) => setTransactionDate(e)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
           
            <div className="box-sec">
              <div>
                <div>{saleData.sale_prefix}</div>
                <div>{saleData.sale_prefix_no}</div>
              </div>
              <div>Total Amount : {parseFloat(saleData.sale_amt).toFixed(2)}</div>
              <div>Balance Due : {parseFloat(saleData.sale_amt_due).toFixed(2)}</div>
            </div>
            <div className="box-sec">
              <TextField
                label="Amount Received"
                id="outlined-basic"
                variant="outlined"
                className="w-full m-0"
                size="small"
                name="amt_received"
               
                onChange={(e) => SetAmtIn(e.target.value.replace(/\D/g, ""))}
                // onChange={(e) => SetAmtIn(e.target.value)}
                //step="0.01"
                required
              />
            </div>
            <div>
            <div>
                <label>Payment Mode</label>
              </div>
              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="cash"
                  name="payment_mode"
                  checked
                  onChange={(e) => setPayMode("cash")}
                />
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  id="online"
                  name="payment_mode"
                  onClick={(e) => setPayMode("online")}
                />
                <label htmlFor="online">Online</label>
              </div>
            </div>
            <div>
              Remaning Amount : {(parseFloat(saleData.sale_amt_due) - parseFloat(amtIn)).toFixed(2)}
            </div>
            
            {console.log(parseFloat(saleData.sale_amt_due) , parseFloat(amtIn))}
          </Box>
          <div className="cashout-btn-wrapper">
            {submitDisabled ? (
              <button
                disabled={submitDisabled}
                className="cursor-not-allowed text-slate-600 bg-slate-200 w-full p-3 rounded-[5px]  transition-all ease-in"
              >
                Payment In
              </button>
            ) : (
              <button
                className="text-green-600 bg-green-200 w-full p-3 rounded-[5px] hover:text-white hover:bg-green-600 transition-all ease-in"
                onClick={handleClick}
              >
                Payment In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIn;
