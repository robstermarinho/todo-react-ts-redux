import { useContext, useState, useCallback } from 'react'
import { PostInputUpdate, PostsContext } from '../../../contexts/PostsContext'
import { toast } from 'react-toastify'
import { PlusCircle, X, Spinner, FloppyDisk } from 'phosphor-react'
import { AddPostFormContainer, CloseButton, Content, Overlay } from '../styles'
import * as Dialog from '@radix-ui/react-dialog'

interface AddPostFormProps {
  postData?: PostInputUpdate | null
  buttonLabel?: string | React.ReactNode
  btnIcon?: React.ReactNode
  disabled?: boolean
}

export const PostForm = ({
  postData = null,
  buttonLabel = '',
  btnIcon = <PlusCircle size={20} />,
  disabled = false,
}: AddPostFormProps) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(postData?.id || null)
  const [title, setTitle] = useState(postData?.title || '')
  const [content, setContent] = useState(postData?.body || '')

  const [isSaving, setIsSaving] = useState(false)

  const { status, createPost, updatePost } = useContext(PostsContext)

  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onContentChanged = (e: any) => setContent(e.target.value)

  const canSave = [title, content].every(Boolean) && status !== 'creating'

  const handleSavePost = async (e: any) => {
    e.preventDefault()
    setIsSaving(true)
    if (canSave) {
      if (id) {
        await updatePost({ id, title, body: content })
      } else {
        await createPost({ title, body: content })
      }
      setOpen(false)
    } else {
      toast.error('Failed to save the post.')
    }
    setIsSaving(false)
  }

  const handleModalToggle = useCallback(
    (isOpen: boolean) => {
      if (isOpen && postData && postData.id) {
        setId(postData.id)
        setTitle(postData.title)
        setContent(postData.body)
      } else {
        setId(null)
        setTitle('')
        setContent('')
      }

      setOpen(isOpen)
    },
    [postData],
  )

  return (
    <Dialog.Root open={open} onOpenChange={handleModalToggle}>
      <Dialog.Trigger asChild>
        <button disabled={disabled} className="dialogConfirmButton">
          {btnIcon}{' '}
          {buttonLabel && <span className="buttonLabel">{buttonLabel}</span>}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>{id ? 'Update Post' : 'New Post'}</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <AddPostFormContainer>
            <form>
              {id && (
                <input type="hidden" id="postId" name="postId" value={id} />
              )}
              <label htmlFor="postTitle">Post Title:</label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                placeholder="What's on your mind?"
                value={title}
                onChange={onTitleChanged}
              />

              <label htmlFor="postContent">Content:</label>
              <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
              />
              <div>
                {!isSaving && (
                  <button
                    disabled={!canSave}
                    type="submit"
                    onClick={handleSavePost}
                  >
                    <FloppyDisk /> Save Post
                  </button>
                )}
                {isSaving && (
                  <button className="loadingButton" disabled type="button">
                    <Spinner /> Saving...
                  </button>
                )}
              </div>
            </form>
          </AddPostFormContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
