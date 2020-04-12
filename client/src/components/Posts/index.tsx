import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Search from '../../components/Search';
import PostPreview from './PostPreview';
import Spinner from '../../components/Spinner';

export interface Location {
  locationName: string;
  lon?: string;
  lat?: string;
}

export interface Schedule {
  fromDate: Date;
  toDate: Date;
}; 

export interface Post {
  id: string;
  title: string;
  userId?: string;
  schedule?: Array<Schedule>;
  pictures?: Array<string>;
  panoramas?: Array<string>;
  description?: string;
  isTaken?: boolean;
  location: Location;
  createdAt?: string;
};

export interface PostData {
  getPosts: Post[];
}

interface Variables {
  offset: number;
  limit: number;
  request?: string; 
}

export const LIMIT_GET_POSTS:number = 12;

const Posts = () => {
  const [searchParam, setSearchParam] = React.useState<string>('');
  const { loading, error, data, fetchMore } = useQuery<PostData, Variables>(FETCH_POSTS, {
    variables: {
      offset: 0,
      limit: LIMIT_GET_POSTS,
      request: searchParam,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="t-al(center) m-t(30px) m-b(100px)">
      <Search 
        find={ fetchMore } 
        setSearchParam={ setSearchParam }
        />

        <div className="d(flex) f-flow(row-wrap) just-cont(start)">
          {
            loading ? <Spinner />
            :
            data?.getPosts && !error &&
            data?.getPosts.map((el: Post) => 
              <PostPreview
                id={el.id}
                title={el.title}
                picture={el.pictures[0]}
                description={el.description}
                location={el.location.locationName}
                key={el.id} 
                />
            )
          }
          {
            !loading && data?.getPosts.length === 0 && <h2>No posts found</h2>
          }
        </div>

        { data?.getPosts.length % 12 === 0 &&
          <button 
            className="m-t(20px)
                      m-b(30px) 
                      h(35px) 
                      submit 
                      bgc(l-pink) 
                      w(120px) 
                      bord(none) 
                      o-line(none) 
                      pointer 
                      col-h(white)
                      color(nrw) 
                      al-s(center)
                      fs(1.1rem)"
              onClick={() => fetchMore({
                variables: {
                  offset: data.getPosts.length,
                  request: searchParam,
                },
                updateQuery: (prev: PostData, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
                  });
                }
              })}
            >
            More
          </button>
        }
    </div>
  )
}

const FETCH_POSTS = gql`
  query getPosts($limit: Int!, $offset: Int, $request: String) {
    getPosts(limit: $limit, offset: $offset, request: $request) {
      id
      title
      description
      
      location {
        locationName
      }
      pictures
    }
  }
`;

export default Posts;