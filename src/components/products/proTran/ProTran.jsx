import { IconPointFilled } from "@tabler/icons-react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import { useNavigate } from "react-router-dom";

const ProTran = (props) => {
  const navigate = useNavigate();
  const { changeSaleId , changePurchaseId } = useContext(UserContext);
  console.log("props.data.sale_cnct_id : " , props.data.sale_cnct_id)
  const changeS = () => {
    changeSaleId(props.data.sale_cnct_id);
    navigate("/sales");
  };
  const changeP = () => {
    changePurchaseId(props.data.sale_cnct_id);
    navigate("/purchase");
  };
  const checkNavigate = () => {
    if (
      props.data.sale_cnct_id !== null && props.data.product_stock_out !== null) {
      changeS();
    } else if (props.data.sale_cnct_id !== null && props.data.product_stock_in !== null) {
      changeP();
    }
    else {
      ""
    }  
  };
  return (
    <div className="transaction cursor-pointer" onClick={checkNavigate}>
      
      <div className="details flex flex-col gap-1 ">
        <div className="date font-semibold flex items-center gap-1 text-slate-800">
          {props.data.entry_date}
          <IconPointFilled className="w-3 h-3" />
          10:40 AM
        </div>
        <div className="text-sm text-slate-600">
          Balance : {props.balanceStock}
        </div>
      </div>
      <div className="flex gap-56 mr-24">
       
        <div>
          <span className="text-slate-600">
            {props.data.product_stock_out ? "OUT " + props.data.product_stock_out +" "+ props.data.selected_unit : ""}
          </span>
          <div className="text-red-600">
            {props.data.sale_price ? "₹ " + props.data.sale_price : ""}
          </div>
        </div>
        <div>
          <span className="text-slate-600">
            {props.data.product_stock_in ? "IN " + props.data.product_stock_in +" "+ props.data.selected_unit : ""}
          </span>
          <div className="text-green-600">
            {props.data.purchase_price ? "₹ " + props.data.purchase_price : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTran;
