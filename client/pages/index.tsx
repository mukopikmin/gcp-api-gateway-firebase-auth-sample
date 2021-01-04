import Layout from "../components/Layout";
import SignInButton from "../components/SignInButton";
import MirrorApiButton from "../components/MirrorApiButton";
import ProtectedApiButton from "../components/ProtectedApiButton";
import UnprotectedApiButton from "../components/UnprotectedApiButton";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="my-3">GCP API Gateway sample App</h1>
    <p>
      <SignInButton />
    </p>
    <MirrorApiButton />
    <ProtectedApiButton />
    <UnprotectedApiButton />
  </Layout>
);

export default IndexPage;
