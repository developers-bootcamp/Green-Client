import React, { useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// const OrderSocketIoClient: React.FC = () => {
//     const socket:Socket=io('http://localhost:3000'); ;
//   useEffect(() => {

//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socket.on('message', (message: string) => {
//       console.log('Received message:', message);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleNewOrder = () => {
//     const companyId = 'exampleCompanyId'; // Replace with the actual companyId
//     socket.emit('new-order', companyId);
//   };

//   return (
//     <div>
//       <button onClick={handleNewOrder}>New Order</button>
//     </div>
//   );
// };

// export default OrderSocketIoClient;