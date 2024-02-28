'use client';
import { Button, Flex, Table, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import getCandidates from '@/utils/getCandidate';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CandidateCreateForm from './_components/CandidateCreateForm';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
type Candidate = {
  id: string;
  name: string;
  email: string;
};
const DemoData: Candidate[] = [];
const Home = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(DemoData);

  const router = useRouter();

  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ['candidates'],
  //   queryFn: getCandidates,
  // });
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  // const dynamicData = await fetch(
  //   `https://jsonplaceholder.typicode.com/users`,
  //   { cache: 'no-store' }
  // );
  // const promisData = await dynamicData.json();
  // console.log(dynamicData);

  return (
    <>
      <Flex justify="end">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
          }}>
          Create Candidate{' '}
        </Button>
      </Flex>
      <Table
        rowKey={(record) => record.id}
        title={() => <Typography.Text strong>All Candidates</Typography.Text>}
        // loading={isPending}
        columns={columns}
        dataSource={tableData}
        size="middle"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`candidates/${record.id}`);
            }, // click row
          };
        }}
      />
      <CandidateCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Home;
