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
  Box,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link as rr_Link } from 'react-router-dom'
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
const CustomTable = ({
  users,
  hasUsername,
  handleArchiveOpen,
  handleDeleteOpen,
  handleEditOpen,
  handleRestoreOpen,
  hasEditButton,
  hasRestoreButton,
  hasDeleteButton,
  hasArchiveButton,
  forFilter,
  selectedUsers,
  setSelectedUsers,
  type,
  sortColumnAsc,
  sortColumnDesc,
}) => {
  // const keys = [
  //   '_id',
  //   'username',
  //   'lastName',
  //   'firstName',
  //   'middleName',
  //   'sex',
  //   'dateOfCreation',
  //   'subdivisionPurok',
  // ]

  //stupid but hey its there
  const [sortCounters, setSortCounters] = useState({})
  const [hasSorted, setHasSorted] = useState(false)

  useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  const sortColumn = (key) => {
    const currentCounter = sortCounters[key] || 0
    const newCounter = (currentCounter + 1) % 2

    setSortCounters({ ...sortCounters, [key]: newCounter })

    if (newCounter === 0) {
      sortColumnDesc(key, users)
    } else {
      sortColumnAsc(key, users)
    }
  }

  const renderSortingIcon = (key) => {
    const counter = sortCounters[key] || 0

    if (hasSorted == false) {
      return setHasSorted(true)
    }
    if (hasSorted && counter === 0) {
      return <FaSortAmountDown />
    } else if (hasSorted && counter === 1) {
      return <FaSortAmountUp />
    }
  }

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
              <Th p={'12px'} onClick={() => sortColumn('_id')} textAlign='center' w={'17%'}>
                <Box
                  userSelect={'none'}
                  display='flex'
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{ cursor: 'pointer' }}
                >
                  <span>User ID</span>
                  {renderSortingIcon('_id')}
                </Box>
              </Th>
              {hasUsername && (
                <Th p={'12px'} onClick={() => sortColumn('username')} textAlign='center'>
                  <Box
                    userSelect={'none'}
                    display='flex'
                    gap={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    _hover={{ cursor: 'pointer' }}
                  >
                    <span>Username</span>
                    {renderSortingIcon('username')}
                  </Box>
                </Th>
              )}
              <Th p={'12px'} onClick={() => sortColumn('lastName')} textAlign='center'>
                <Box
                  userSelect={'none'}
                  display='flex'
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{ cursor: 'pointer' }}
                >
                  <span>Last name</span>
                  {renderSortingIcon('lastName')}
                </Box>
              </Th>
              <Th p={'12px'} onClick={() => sortColumn('firstName')} textAlign='center'>
                <Box
                  userSelect={'none'}
                  display='flex'
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{ cursor: 'pointer' }}
                >
                  <span>First name</span>
                  {renderSortingIcon('firstName')}
                </Box>
              </Th>

              <Th p={'12px'} onClick={() => sortColumn('sex')} textAlign='center'>
                <Box
                  userSelect={'none'}
                  display='flex'
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{ cursor: 'pointer' }}
                >
                  <span>Sex</span>
                  {renderSortingIcon('sex')}
                </Box>
              </Th>
              <Th p={'12px'} onClick={() => sortColumn('subdivisionPurok')} textAlign='center'>
                <Box
                  userSelect={'none'}
                  display='flex'
                  gap={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{ cursor: 'pointer' }}
                >
                  <span>Purok</span>
                  {renderSortingIcon('subdivisionPurok')}
                </Box>
              </Th>
              {!forFilter && (
                <>
                  <Th
                    p={'12px'}
                    onClick={() => sortColumn('dateOfCreation')}
                    textAlign='center'
                    w={'15%'}
                  >
                    <Box
                      userSelect={'none'}
                      display='flex'
                      gap={1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      _hover={{ cursor: 'pointer' }}
                    >
                      <span>Registration Date</span>
                      {renderSortingIcon('dateOfCreation', 50)}
                    </Box>
                  </Th>
                  <Th p={'12px'} userSelect={'none'} textAlign='center' w={'15%'}>
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
                        <Checkbox
                          isChecked={selectedUsers.some((u) => u._id === user._id)}
                          onChange={() => {
                            setSelectedUsers((prevUsers) => {
                              if (type === 'single') {
                                if (!prevUsers.some((u) => u._id === user._id)) return [user]
                                else return prevUsers.filter((u) => u._id !== user._id)
                              }
                              // Check if the user already exists in the array based on id
                              if (!prevUsers.some((u) => u._id === user._id))
                                // If the user does not exist, append it to the array
                                return [...prevUsers, user]
                              // If the user already exists, return the previous state unchanged
                              else return prevUsers.filter((u) => u._id !== user._id)
                            })
                          }}
                          size={'lg'}
                        />
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
                    {hasUsername && (
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
                    )}
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
                      {profile?.sex || 'N/A'}
                    </Td>
                    <Td
                      p={'12px'}
                      textAlign='center'
                      style={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      {profile?.address.subdivisionPurok || 'N/A'}
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
