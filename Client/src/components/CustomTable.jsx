import {
  Link,
  TableContainer,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link as rr_Link } from 'react-router-dom'
const CustomTable = ({
  users,
  handleArchiveOpen,
  handleDeleteOpen,
  handleEditOpen,
  handleRestoreOpen,
  hasEditButton,
  hasRestoreButton,
  hasDeleteButton,
  hasArchiveButton,
  forFilter,
}) => {
  return (
    <>
      <TableContainer
        display={'flex'}
        margin={'10px'}
        alignContent={'center'}
        justifyContent={'center'}
        rounded='md'
      >
        <Table
          m={'auto'}
          w={'100%'}
          minW={'-moz-min-content'}
          p={'10px'}
          rounded='md'
          bg='brand.400'
          variant={'simple'}
          style={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
          borderColor={'gray.400'}
          borderWidth={'1px'}
        >
          <Thead>
            <Tr>
              {forFilter && (
                <Th p={'0'} textAlign='center' w={'5%'}>
                  Select
                </Th>
              )}
              <Th p={'12px'} textAlign='center' w={'17%'}>
                User ID
              </Th>
              <Th p={'12px'} textAlign='center'>
                Username
              </Th>
              <Th p={'12px'} textAlign='center'>
                Last Name
              </Th>
              <Th p={'12px'} textAlign='center'>
                First Name
              </Th>
              <Th p={'12px'} textAlign='center'>
                Middle Name
              </Th>
              <Th p={'12px'} textAlign='center'>
                Gender
              </Th>
              {!forFilter && (
                <>
                  <Th p={'12px'} textAlign='center'>
                    Date of Registration
                  </Th>
                  <Th p={'12px'} textAlign='center' w={'15%'}>
                    Actions
                  </Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {users.length > 0 ? (
              users.map((user) => {
                const profile = user.profile
                return (
                  <Tr key={user._id} fontSize={'md'}>
                    {forFilter && (
                      <Td
                        p={'0px'}
                        textAlign='center'
                        style={{
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                        }}
                      >
                        <Checkbox size={'lg'} />
                      </Td>
                    )}
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      <Link as={rr_Link} color={'primary.500'} to={`${user._id}`}>
                        {user._id}
                      </Link>
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center '
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {user?.username || 'N/A'}
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {profile?.lastName || 'N/A'}
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {profile?.firstName || 'N/A'}
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {profile?.middleName || 'N/A'}
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {profile?.sex || 'N/A'}
                    </Td>
                    {!forFilter && (
                      <>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {new Date(user.dateOfCreation).toLocaleDateString()}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          justifyContent={'center'}
                          display={'flex'}
                          gap={'10px'}
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {/* RESTORE AND DELETE BUTTON CASE */}
                          {hasEditButton && (
                            <Button onClick={() => handleEditOpen(user)} colorScheme='green'>
                              Edit
                            </Button>
                          )}
                          {hasArchiveButton && (
                            <Button onClick={() => handleArchiveOpen(user)} colorScheme='orange'>
                              Archive
                            </Button>
                          )}
                          {hasRestoreButton && (
                            <Button onClick={() => handleRestoreOpen(user)} colorScheme='green'>
                              Restore
                            </Button>
                          )}
                          {hasDeleteButton && (
                            <Button onClick={() => handleDeleteOpen(user)} colorScheme='red'>
                              Delete
                            </Button>
                          )}
                        </Td>
                      </>
                    )}
                  </Tr>
                )
              })
            ) : (
              <Tr fontSize={'md'}>
                <Td
                  p={'12px'}
                  textAlign='center'
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  fontWeight={'semibold'}
                  colSpan={8}
                >
                  No users
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CustomTable
