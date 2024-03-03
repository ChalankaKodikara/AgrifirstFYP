// import { useEffect, useState } from "react";
// // import { Chart, MonthChart } from '../Reports/chart';
// import * as React from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { mainListItems } from "./listitems";
// import {
//   Chart,
//   MonthlySales,
//   Topsell,
//   Table,
//   SalesReport,
// } from "./Report/chart";
// // import Orders from '../Sales/Orders';
// // import { AppBar, Drawer, mdTheme } from "./Structure";

// // import Title from '../Dashboard/title';
// // import Notificationicon from '../Notification/Notifications';
// // import { TodaySales, ThisMonth, LastMonth } from '../Cards/SalesCards';
// import { Card } from "@mui/material";

// const appBarStyle = {
//   backgroundColor: "green", // Set the desired background color here
// };
// export default function DashboardContent() {
//   const [open, setOpen] = React.useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     if (localStorage.getItem("userRole") !== "admin") {
//       window.location.href = "/login";
//     }
//   }, []);

//   // useEffect(() => {
//   //   // Fetch humidity and temperature data from API
//   //   fetch("https://backprison.talentfort.live/api/v1/data")
//   //     .then((response) => response.json())
//   //     .then((data) => {})
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //     });
//   // }, []);

//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar
//             sx={{
//               pr: "24px",
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Dashboard
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List component="nav">
//             {mainListItems}
//             <Divider sx={{ my: 1 }} />
//           </List>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: "100vh",
//             overflow: "auto",
//           }}
//         >
//           <Toolbar />
//           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Card sx={{ maxWidth: 275 }}>{/* <TodaySales /> */}</Card>
//               </Grid>

//               {/* {Chart} */}
//               <Grid item xs={12}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     height: 240,
//                   }}
//                 >
//                   <Chart />
//                 </Paper>
//               </Grid>

//               <Grid item xs={12}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     height: 240,
//                   }}
//                 >
//                   <MonthlySales />
//                 </Paper>
//               </Grid>

//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                   <div>
//                     <Topsell />
//                   </div>
//                   {/* <Orders/> */}
//                 </Paper>
//               </Grid>

//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                   <div>
//                     <Table />
//                   </div>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                   <div>
//                     <SalesReport />
//                   </div>
//                 </Paper>
//               </Grid>
//             </Grid>
//             <Box sx={{ pt: 4 }}></Box>
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
