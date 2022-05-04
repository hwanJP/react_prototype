//require('dotenv').config(); 
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Top from './components/Top'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Top />
  </StrictMode>
);