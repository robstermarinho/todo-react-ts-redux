import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  selectPosts,
  fetchPosts,
  deletePost,
  selectPostsError,
  selectPostsStatus,
  PostsFetchParams,
  setIsLoading,
  syncPosts,
  setIsError,
} from '../../redux/reducers/postSlice'
import { BlogPageContainer, CustomSwitch } from './styles'
import InitLoading from '../../components/InitLoading'
import * as Switch from '@radix-ui/react-switch'
import { formatDistanceToNow } from 'date-fns'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { api } from '../../services/axios'

export function BlogReduxPage() {
  const [showPublished, setShowPublished] = useState(true)

  const error = useSelector(selectPostsError)
  const status = useSelector(selectPostsStatus)
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()

  const isLoading = status === 'loading'
  const isRemoving = status === 'deleting'

  useEffect(() => {
    dispatch<any>(
      fetchPosts({
        isPublished: true,
        query: '',
      }),
    )
  }, [dispatch])

  /**
   * Example of how to use redux tunk middleware with async logic outside of the redux slice
   * @param data
   * @returns
   */
  const fetchPostsWithReduxTunk = (data: PostsFetchParams) => {
    return async (dispatch: any, getState: any) => {
      console.log(getState(), 'CURRENT STATE ')
      dispatch(setIsLoading())

      try {
        const response = await api.get('posts', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            isPublished: data.isPublished,
            q: data.query ?? null,
          },
        })
        dispatch(syncPosts(response.data))
      } catch (e) {
        dispatch(
          setIsError('Impossible to load posts with tunk middleware now...'),
        )
      }
    }
  }

  const handleRemovePost = (postId: string) => {
    dispatch<any>(deletePost(postId))
  }

  // const handlePublishPost = (postId: string) => {
  //   // TODO
  // }

  // const handleUnpublishPost = (postId: string) => {
  //   // TODO
  // }

  const handleOnCheckChange = (state: boolean) => {
    dispatch<any>(
      fetchPosts({
        isPublished: state,
        query: '',
      }),
    )
    setShowPublished(state)
  }

  const renderPosts = () => {
    if (!error && posts && posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.map((post) => (
      <div className="post" key={post.id}>
        <div className="postInfo">
          <div className="postInfoContent">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>

          <div className="dateInfo">
            <small>
              Created:{' '}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </small>

            <small>
              Updated:{' '}
              {formatDistanceToNow(new Date(post.updatedAt), {
                addSuffix: true,
              })}
            </small>
            {post.publishedAt && (
              <small>
                Published At:{' '}
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </small>
            )}
          </div>
        </div>

        {!post.isPublished && (
          <div className="postActions">
            {/* <PostForm
              key={`update-form-${post.id}`}
              postData={post}
              buttonLabel="Update Post"
              btnIcon={<Pencil size={20} />}
            />
            <ConfirmDialog
              key={`publish-form-${post.id}`}
              onSuccess={() => handlePublishPost(post.id)}
              title="Publish Post"
              question="Are you sure you want to publish this post?"
              targetName={post.title}
              disabled={isUpdating}
              btnIcon={<ArrowBendUpRight size={20} />}
              buttonLabel={isUpdating ? 'Publishing...' : 'Publish'}
            /> */}
            <ConfirmDialog
              key={`delete-form-${post.id}`}
              onSuccess={() => handleRemovePost(post.id)}
              title="Remove Post"
              question="Are you sure you want to remove this post?"
              targetName={post.title}
              disabled={isRemoving}
              buttonLabel={isRemoving ? 'Removing...' : 'Remove'}
            />
          </div>
        )}
        {post.isPublished && (
          <div className="postActions">
            {/* <ConfirmDialog
              key={`unpublish-form-${post.id}`}
              onSuccess={() => handleUnpublishPost(post.id)}
              title="Unpublish Post"
              btnIcon={<ArrowBendLeftDown size={20} />}
              question="Are you sure you want to unpublish this post?"
              targetName={post.title}
              disabled={isUpdating}
              buttonLabel={isUpdating ? 'Unpublishing...' : 'Unpublish'}
            /> */}
          </div>
        )}
      </div>
    ))
  }
  return (
    <BlogPageContainer>
      <h1>Redux with AsyncTunk</h1>
      <h2>{showPublished ? 'Blog Posts' : 'Draft Posts'}</h2>

      <div className="headerActions">
        <CustomSwitch>
          <label className="Label" htmlFor="published-posts">
            Published Posts
          </label>
          <Switch.Root
            className="SwitchRoot"
            id="published-posts"
            onCheckedChange={handleOnCheckChange}
            defaultChecked={showPublished}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
        </CustomSwitch>

        {/* {!showPublished && (
          <PostForm buttonLabel="Create Post" disabled={showPublished} />
        )} */}
        <button
          className="btn"
          type="button"
          onClick={() => {
            dispatch<any>(
              fetchPostsWithReduxTunk({
                isPublished: showPublished,
                query: '',
              }),
            )
          }}
        >
          Fetch
        </button>
      </div>
      <div className="headerActions">
        <p>
          {posts.length} {showPublished ? 'Blog Posts' : 'Draft Posts'}
        </p>
      </div>

      {error && <p>{error}</p>}
      {isLoading && <InitLoading />}
      {isRemoving && <InitLoading msg="Removing post" />}
      <div className="postsList">{renderPosts()}</div>
    </BlogPageContainer>
  )
}
