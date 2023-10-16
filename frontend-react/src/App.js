import { Navigate, Route, Routes } from "react-router-dom";

import { Amplify, Auth, Storage } from "aws-amplify";
import awsExports from "./aws-exports";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";

import SiteFooter from "./components/common/SiteFooter";
import HomePage from "./components/home/HomePage";
import FileUploadSingle from "./components/upload/FileUploadSingle";
import SiteNav from "./components/common/SiteNav";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsExports);
Auth.configure(awsExports);
Storage.configure({
  bucket: "ocrfrontende28866c63e4142dfb9f4715422150c92141942-dev",
});

function App() {
  return (
    <div>
      <Authenticator>
        {({ user }) => (
          <main>
            <SiteNav user={user} />
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" exact={true} element={<HomePage user={user} />} />
              <Route
                path="/upload"
                exact={true}
                element={<FileUploadSingle user={user} />}
              />
            </Routes>
            <SiteFooter />
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
