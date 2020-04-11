import App from "../components/App";
import withApollo from "../lib/withApollo";
// import withApollo, { apollo } from "../lib/withApollo";
// import { Query } from "../lib/generated/schema";
// import gql from "graphql-tag";
// import { getDataFromTree } from "@apollo/react-ssr";

function Index(): JSX.Element {
  return <App />;
}

// export async function getStaticProps(): Promise<void> {
//   const { query } = apollo({});
//   const { errors, data } = await query<Query>({ query: gql`{..}` });
// }

export default withApollo(Index);

// https://github.com/lfades/next-with-apollo
// You can also override the configs for withApollo here, so if you want
// this page to have SSR (and to be a lambda) for SEO purposes and remove
// the loading state, uncomment the import at the beginning and this:
//
// export default withApollo(Index, { getDataFromTree });
