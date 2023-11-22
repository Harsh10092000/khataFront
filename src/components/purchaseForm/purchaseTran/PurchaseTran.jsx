// import { IconTrash } from "@tabler/icons-react";
// import React from "react";
// import { UserContext } from "../../../context/UserIdContext";
// import { useContext } from "react";

// const PurchaseTran = () => {
//   const { purchaseId, changePurchaseId } = useContext(UserContext);
//   return (
//     <div className="grid grid-cols-9 text-center border-b border-slate-300 hover:shadow hover:bg-slate-100">
//       <div className="border-r border-slate-300 p-4">1</div>
//       <div className="border-r border-slate-300 p-4">-</div>

//       <div className="border-r border-slate-300 p-4">-</div>
//       <div className="border-r border-slate-300 p-4">5 | NOS</div>
//       <div className="border-r border-slate-300 p-4">₹2520 | ₹ 200</div>

//       <div className="border-r border-slate-300 p-4">10%</div>
//       <div className="border-r border-slate-300 p-4">₹ 250</div>

//       <div className="border-r border-slate-300 p-4">₹ 200</div>
//       <div className="grid place-items-center">
//         <div className="border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-all ease-in-out w-10">
//           <IconTrash />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseTran;


// import { IconReportMoney } from "@tabler/icons-react";
// import { UserContext } from "../../../context/UserIdContext";
// import { useContext } from "react";

// const PurchaseTran = (props) => {
//   const { purchaseId, changePurchaseId } = useContext(UserContext);
//   return (
//     <div>

//     {props.data.purchase_pay_out_id ?
//     <div
//       className={
//         purchaseId === props.data.purchase_id
//           ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
//           : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
//       }
//       onClick={() => {
//         changePurchaseId(props.data.purchase_id);
//       }}
//     >
//       <div className="flex col-span-2 gap-3">
//         <div className="notes rounded-full bg-cyan-100 w-12 h-12 flex items-center justify-center">
//           <IconReportMoney className="text-cyan-600" />
//         </div>
//         <div className="details flex flex-col gap-1 ">
//           <div className="category font-semibold text-slate-700">
//             {props.data.purchase_name}
//             <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
//               {props.data.purchase_pay_out_prefix} #{props.data.purchase_pay_out_prefix_no}
//             </div>
            
//           </div>
//           <div className="text-sm text-slate-500 font-semibold">
//             {props.data.purchase_date}
//           </div>
          
//         </div>
//       </div>
//       <div className="text-slate-600 justify-self-end font-semibold">
//         ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
//       </div>
//     </div>
//     : <div
//     className={
//       purchaseId === props.data.purchase_id
//         ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
//         : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
//     }
//     onClick={() => {
//       changePurchaseId(props.data.purchase_id);
//     }}
//   >
//     <div className="flex col-span-2 gap-3">
//       <div className="notes rounded-full bg-cyan-100 w-12 h-12 flex items-center justify-center">
//         <IconReportMoney className="text-cyan-600" />
//       </div>
//       <div className="details flex flex-col gap-1 ">
//         <div className="category font-semibold text-slate-700">
//           {props.data.purchase_name}
//           <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
//             {props.data.purchase_prefix} #{props.data.purchase_prefix_no}
            
//           </div>
//         </div>
//         <div className="text-sm text-slate-500 font-semibold">
//           {props.data.purchase_date}
//         </div>
//       </div>
//     </div>
//     <div className="text-slate-600 justify-self-end font-semibold">
//       ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
//     </div>
//   </div> }
//     </div>

//   );
// };

//export default PurchaseTran;


import { IconTrash } from "@tabler/icons-react";

const PurchaseTran = (props) => {
  let i = 1;
  return (
    <>
      {props.filteredInvoiceItems.map((item) => (
        <div className="grid grid-cols-9 text-center border-b border-slate-300 hover:shadow hover:bg-slate-100">
          <div className="border-r border-slate-300 p-4">{i++}</div>
          <div className="border-r border-slate-300 p-4">{item.in_items}</div>

          <div className="border-r border-slate-300 p-4">{item.in_hsn_sac ? item.in_hsn_sac : "-"}</div>
          <div className="border-r border-slate-300 p-4">
            {item.in_qty} | {item.in_unit}
          </div>
          <div className="border-r border-slate-300 p-4">
            {item.in_sale_price} | {item.in_discount_price.toFixed(2)}
          </div>
          {item.in_discount_value ? (
            <div className="border-r border-slate-300 p-4">
              {item.in_discount_value} |{" "}
              {item.in_discount_unit === "amount" ? "₹" : "%"}
            </div>
          ) : (
            <div className="border-r border-slate-300 p-4">-</div>
          )}
          
          <div className="border-r border-slate-300 p-4">
            {item.in_gst_prectentage && item.in_gst_prectentage !== null && item.in_gst_prectentage !== "-" 
              ? item.in_gst_prectentage + "% |" + item.in_gst_amt.toFixed(2)
              : "-"}
          </div>
          <div className="border-r border-slate-300 p-4">
            ₹
            {(
              item.in_qty *
              ((item.in_discount_price ) +
                (item.in_gst_amt ? item.in_gst_amt : 0))
            ).toFixed(2)}
          </div>
          <div className="grid place-items-center">
            <div className="border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-all ease-in-out w-10">
              <IconTrash />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PurchaseTran;
