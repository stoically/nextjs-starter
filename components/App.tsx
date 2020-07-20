/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/react-hooks";
import { NetworkStatus } from "apollo-client";
import gql from "graphql-tag";

export const ALL_POSTS_QUERY = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;
export const allPostsQueryVars = {
  skip: 0,
  first: 10,
};

export default function (): any {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>Error</div>;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  const { allPosts, _allPostsMeta } = data;
  const areMorePosts = allPosts.length < _allPostsMeta.count;

  const loadMorePosts = (): any => {
    fetchMore({
      variables: {
        skip: allPosts.length,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
        });
      },
    });
  };

  return (
    <section>
      <ul>
        {allPosts.map((post: any, index: any) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.url}>{post.title}</a>
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts && (
        <button
          onClick={(): any => loadMorePosts()}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? "Loading..." : "Show More"}
        </button>
      )}
    </section>
  );
}
