/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { initializeApollo } from 'graphql/apolloClient'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import type { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { format, parseJSON } from 'date-fns'
import CreateModal from 'components/AddWorkflowModal/AddWorkflowModal'
import { EmptyState } from 'lib/EmtpyState'
import { useGetAllWorkflows } from 'graphql/queries'
import { Wrapper } from 'components'
import {
  H1,
  H2,
  GridItem,
  Heading,
  Anchor,
  FormButton as Button,
  GlobalButton,
  Portal,
  Search,
  Page,
} from 'lib'

function IndexPage({
  initialApolloState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(initialApolloState)
  const { loading, error, data } = useGetAllWorkflows()
  const { replace, push, query } = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>(
    (query?.term as string) ?? '',
  )
  //const term = useDebounce(searchTerm, 200)
  const [isModalVisible, setModalVisible] = useState(false)

  // useEffect(() => {
  //   const query = term ? { term } : null
  //   replace('/' + term ? `?term=${term}` : '/', undefined, {
  //     shallow: true,
  //   })
  // }, [term])

  const handleAddClick = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleListItemClick = (ss: any) => {
    push({ query: { id: ss.id } })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.currentTarget.value)
    }
  }

  return (
    <Page>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>SOAR EXPLORER</H1>
              <H2>Workflows</H2>
            </Anchor>
          </Link>
        </div>

        <GlobalButton onMouseDown={handleAddClick} />
      </Heading>
      <div
        css={css`
          padding: 24px 24px 0 24px;
        `}
      >
        <Search
          type="search"
          name="search"
          autoComplete="off"
          value={searchTerm}
          placeholder="Search"
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          onFocus={() => {}}
          onBlur={() => {}}
          inputSize="large"
          error={false}
          css={css`
            border: none;
          `}
        />
      </div>
      <Wrapper>
        {!error && data?.workflows && data.workflows.length ? (
          <>
            {data.workflows.map((workflow) => (
              <Link
                key={workflow.id}
                href={`/workflow/[id]`}
                as={`/workflow/${workflow.id}`}
                passHref
              >
                <GridItem
                  title={workflow.title}
                  subtitle={workflow.description}
                  date={format(parseJSON(workflow.createdDate), 'yyyy-MM-dd')}
                  onClick={() => handleListItemClick(workflow)}
                />
              </Link>
            ))}
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                css={css`
                  flex: 1;
                  flex-grow: 1;
                  min-width: 200px;
                  padding: 24px;
                `}
              />
            ))}
          </>
        ) : (
          <EmptyState onClick={handleAddClick} />
        )}
      </Wrapper>
      <Portal mountId="portal">
        <CreateModal isVisible={isModalVisible} onClose={handleCloseModal} />
      </Portal>
    </Page>
  )
}

export default IndexPage

/**
 * Get Static Server Side Props
 */
export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
