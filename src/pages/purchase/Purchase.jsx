// import { useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import PurLeft from "../../components/purchase/purLeft/PurLeft";
// import PurRight from "../../components/purchase/purRight/PurRight";
// import { IconBox } from "@tabler/icons-react";

// const Purchase = () => {
//   const [active, setActive] = useState(true);
//   return (
//     <div className="purchase">
//       <Navbar />
//       <div className="content flex">
//         <PurLeft />
//         {active ? (
//           <PurRight />
//         ) : (
//           <div className="selectCustomer h-[100vh - 87px] flex flex-col justify-center items-center w-full bg-slate-100">
//             <div>
//               <IconBox className=" w-36 h-36 text-slate-400" />
//               <p>No Transaction Selected</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Purchase;





import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import SelectCustomer from "../../components/mainpage/selectCustomer/SelectCustomer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserIdContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import PurLeft from "../../components/purchase/purLeft/PurLeft";
import PurRight from "../../components/purchase/purRight/PurRight";
import PurInvoice from "../../components/purchase/purInvoice/PurInvoice";
import PayOut from "../../components/purchase/purPayOut/PurPayOut";

const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    pdf: false,
    addPayment: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggleDrawer1 = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClickVariant = (variant, anchor1, msg) => {
    
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };
  const list = (anchor) => (
    
    <Box  role="presentation">
    {anchor === "pdf"
      ? <Box sx={{ width: 950 }} > <PurInvoice  /> </Box>
      : anchor === "addPayment"
      ? <Box sx={{ width: 450 }} > <PayOut sx={{ width: 450 }} snack={()=>handleClickVariant('success',"add","Payment Has been Added")}/> </Box>
      : "-"}
  </Box>
  );
  const [active, setActive] = useState(false);
  const { purchaseId, change } = useContext(UserContext);
  const checkActive = () => {
    purchaseId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    checkActive();
  }, [purchaseId, change]);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["addPayment"]}
        onClose={toggleDrawer("addPayment", false)}
      >
        {list("addPayment")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["pdf"]}
        onClose={toggleDrawer("pdf", false)}
      >
        {list("pdf")}
      </Drawer>

      <div className="mainpage">
        <Navbar />
        <div className="content flex">
          <PurLeft />

          {active ? (
            <PurRight pdf={toggleDrawer("pdf", true)} addPayment={toggleDrawer("addPayment", true)} />
          ) : (
            <SelectCustomer />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Purchase = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default Purchase;

