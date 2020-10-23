/** @jsx jsx */
import styled from '@emotion/styled'
import fetcher, { Method } from 'services/api'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import { Entries, Rules } from 'lib/FormElements/types'
import Modal from './Modal'
import {
  Form,
  Input,
  Select,
  Error,
  FormSection,
  FormButton as Button,
  LoadingIndicator,
  SelectPlaceholder,
} from 'lib'

export const rules: Rules = {
  title: [
    {
      error: 'Title is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
  description: [
    {
      error: 'Description is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
}

interface CreateModalProps {
  className?: string
  isVisible: boolean
  onClose: () => void
}

const CreateModal: FC<CreateModalProps> = ({
  className,
  onClose,
  isVisible,
}) => {
  const router = useRouter()
  const [isPosting, setPosting] = useState(false)
  const handleSubmit = async ({ name, url, size }: Entries) => {
    const [w, h] = String(size)?.split(':')
    const width = parseInt(w, 10)
    const height = parseInt(h, 10)
    try {
      setPosting(true)
      const ss = await fetcher(Method.POST, `/screenshot`, undefined, {
        name,
        url,
        width,
        height,
      })
      router.push('/[id]', `/${ss.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal title="NEW WORKFLOW" isVisible={isVisible} onClose={onClose}>
      <div className={className}>
        <Form
          loading={isPosting}
          error={undefined}
          rules={rules}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormSection>
            <Error name="name" />
            <Input type="text" name="name" placeholder={'Name'} />
          </FormSection>
          <FormSection>
            <Error name="description" />
            <Input
              type="description"
              name="description"
              placeholder={'Description'}
            />
          </FormSection>
          <FormSection>
            <Button>
              <LoadingIndicator isLoading={isPosting} />
              Create
            </Button>
          </FormSection>
        </Form>
      </div>
    </Modal>
  )
}

export default styled(CreateModal)``
