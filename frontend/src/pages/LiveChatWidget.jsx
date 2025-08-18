// import { useEffect } from "react";

// const LiveChatWidget = () => {
//   useEffect(() => {
//     // Setup Crisp only if not yet present
//     if (!window.$crisp) {
//       window.$crisp = [];
//       window.CRISP_WEBSITE_ID = "980d547e-aa66-4b20-85e8-0a287a8f4271";
//       const script = document.createElement("script");
//       script.src = "https://client.crisp.chat/l.js";
//       script.async = 1;
//       script.id = "crisp-script";
//       document.head.appendChild(script);
//     }
//     return () => {
//       // Remove Crisp widget and script on unmount
//       // Remove the script from head
//       const crispScript = document.getElementById("crisp-script");
//       if (crispScript) {
//         crispScript.remove();
//       }
//       // Remove Crisp chat DOM elements
//       const crispElements = document.querySelectorAll('[id^="crisp-"]');
//       crispElements.forEach(el => el.remove());
//       // Clean the global variable
//       delete window.$crisp;
//       delete window.CRISP_WEBSITE_ID;
//     };
//   }, []);

//   return null;
// };

// export default LiveChatWidget;
