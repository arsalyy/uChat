import Layout from "../components/Layout";
import Button from "@mui/material/Button";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <h1 color="text.primary">Hello, this is the homepage!</h1>
    <Button variant="contained" color="primary">
      Click Me
    </Button>
  </Layout>
);

export default IndexPage;
