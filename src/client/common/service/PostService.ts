/**
 * Created by jack on 16-4-27.
 */

import httpFetch, * as FetchService from './FetchService';
import { PostPage } from 'types/post';
import { Pager } from 'types/pager';

interface queryPostsResponse {
	posts: PostPage[]
}

interface queryPostResponse {
	post: PostPage
}

const GRAPHQL_URL_PREFIX = '/graphql';

export default class PostService {
	constructor() {}

	getLatestPost(): Promise<GraphQLResponse<queryPostsResponse>> {
		const GET_LATEST_POST_GRAPHQL = `query={posts(pager:{number:0,size:1}){id,name,createdDate,title,subtitle,headerImgName,tags{name,label}}}`;
		return httpFetch(FetchService.generatorUrl(GRAPHQL_URL_PREFIX, GET_LATEST_POST_GRAPHQL));
	}

	queryPostList({number = 0, size = 5} : Pager): Promise<GraphQLResponse<queryPostsResponse>> {
		const QUERY_POST_LIST_GRAPHQL = `query={posts(pager:{number:${number},size:${size}}){id,name,createdDate,title,subtitle,tags{name,label}}}`;
		return httpFetch(FetchService.generatorUrl(GRAPHQL_URL_PREFIX, QUERY_POST_LIST_GRAPHQL));
	}

	getPostByName(postName: string): Promise<GraphQLResponse<queryPostResponse>> {
		const GET_POST_BY_NAME_GRAPHQL = `query={post(name: "${postName}"){id,name,createdDate,title,subtitle,headerImgName,
			content,prevPost{name,title},nextPost{name,title},tags{name,label}}}`;
		return httpFetch(FetchService.generatorUrl(GRAPHQL_URL_PREFIX, GET_POST_BY_NAME_GRAPHQL));
	}
}
