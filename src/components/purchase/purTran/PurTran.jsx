// import { IconReportMoney, IconShoppingCartDown } from "@tabler/icons-react";
// import React from "react";

// const PurTran = () => {
//   return (
//     <div>
//       <div
//         className={
//           "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
//         }
//       >
//         <div className="flex col-span-2 gap-3">
//           <div className="notes rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
//             <IconShoppingCartDown className="text-sky-600" />
//           </div>
//           <div className="details flex flex-col gap-1 ">
//             <div className="category font-semibold text-slate-700">
//               Akshit
//               <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
//                 Invoice # 1
//               </div>
//             </div>
//             <div className="text-sm text-slate-500 font-semibold">
//               10 Sep 2023
//             </div>
//           </div>
//         </div>
//         <div className="text-slate-600 justify-self-end font-semibold">
//           ₹ 5000
//         </div>
//       </div>
//     </div>
//   );
// };

//export default PurTran;

import { IconReportMoney } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";

const PurTran = (props) => {
  const { purchaseId, changePurchaseId } = useContext(UserContext);
  return (
    <div>

    {props.data.purchase_pay_out_id ?
    <div
      className={
        purchaseId === props.data.purchase_id
          ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
          : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
      }
      onClick={() => {
        changePurchaseId(props.data.purchase_id);
      }}
    >
      <div className="flex col-span-2 gap-3">
        <div className="notes rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
          <IconReportMoney className="text-sky-600" />
        </div>
        <div className="details flex flex-col gap-1 ">
          <div className="category font-semibold text-slate-700">
            {props.data.purchase_name}
            <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
              {props.data.purchase_pay_out_prefix} #{props.data.purchase_pay_out_prefix_no}
            </div>
            
          </div>
          <div className="text-sm text-slate-500 font-semibold">
            {props.data.purchase_date}
          </div>
          
        </div>
      </div>
      <div className="text-slate-600 justify-self-end font-semibold">
        ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
      </div>
    </div>
    : <div
    className={
      purchaseId === props.data.purchase_id
        ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
        : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
    }
    onClick={() => {
      changePurchaseId(props.data.purchase_id);
    }}
  >
    <div className="flex col-span-2 gap-3">
      <div className="notes rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
        <IconReportMoney className="text-sky-600" />
      </div>
      <div className="details flex flex-col gap-1 ">
        <div className="category font-semibold text-slate-700">
          {props.data.purchase_name}
          <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
            {props.data.purchase_prefix} #{props.data.purchase_prefix_no}
            
          </div>
        </div>
        <div className="text-sm text-slate-500 font-semibold">
          {props.data.purchase_date}
        </div>
      </div>
    </div>
    <div className="text-slate-600 justify-self-end font-semibold">
      ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
    </div>
  </div> }
    </div>

  );
};

export default PurTran;
