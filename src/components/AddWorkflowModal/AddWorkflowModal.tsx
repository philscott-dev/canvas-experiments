/** @jsx jsx */
import styled from '@emotion/styled'
import fetcher, { Method } from 'services/api'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import { Entries, Rules } from 'lib/FormElements/types'
import Modal from '../../lib/Modal/Modal'
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
import { useAddWorkflow } from 'graphql/mutations/addWorkflow'

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

interface AddWorkflowModalProps {
  className?: string
  isVisible: boolean
  onClose: () => void
}

const AddWorkflowModal: FC<AddWorkflowModalProps> = ({
  className,
  onClose,
  isVisible,
}) => {
  const router = useRouter()
  const { mutate, loading } = useAddWorkflow()
  const handleSubmit = async ({ title, description }: Entries) => {
    try {
      const workflowInput = {
        title: title as string,
        description: description as string,
      }
      mutate({ variables: { workflowInput } })
      //router.push('/[id]', `/${ss.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal title="NEW WORKFLOW" isVisible={isVisible} onClose={onClose}>
      <div className={className}>
        <Form
          loading={loading}
          error={undefined}
          rules={rules}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormSection>
            <Error name="title" />
            <Input type="text" name="title" placeholder={'Title'} />
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
              <LoadingIndicator isLoading={loading} />
              Create
            </Button>
          </FormSection>
        </Form>
      </div>
    </Modal>
  )
}

export default styled(AddWorkflowModal)``
