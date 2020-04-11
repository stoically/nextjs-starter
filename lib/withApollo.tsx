/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import { NextComponentType, NextPageContext } from "next";
import withApollo, {
  WithApolloProps,
  InitApolloClient,
} from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export const apollo: InitApolloClient<any> = ({ initialState, ctx }) => {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
      credentials: "same-origin",
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
};

export default withApollo(apollo, {
  render: ({
    Page,
    props,
  }: {
    Page: NextComponentType<NextPageContext, any, any>;
    props: WithApolloProps<any>;
  }): JSX.Element => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    );
  },
});
