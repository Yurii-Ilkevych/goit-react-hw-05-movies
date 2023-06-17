import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import {Container} from "../CommonStaled/Common.styled"
import { Header, Link } from "./SharedLayout.staled";
export const SharedLayout = () => {
  return (
    <Container>
<Header>
  <nav>
<Link to="/">Home</Link>
<Link to="/movies">Movies</Link>
  </nav>
</Header>
<Suspense fallback={<div>Loading movies...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
