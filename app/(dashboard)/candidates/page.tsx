'use client';
import { Button, Flex, Table, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import getCandidates from '@/utils/getCandidate';
import { redirect, useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import isAuth from '../../components/Auth';
import { Suspense, useLayoutEffect } from 'react';

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

// const DemoData = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];
const Home = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return redirect('/login');
    }
  }, []);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['candidates'],
    queryFn: getCandidates,
  });

  // const dynamicData = await fetch(
  //   `https://jsonplaceholder.typicode.com/users`,
  //   { cache: 'no-store' }
  // );
  // const promisData = await dynamicData.json();
  // console.log(dynamicData);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Flex justify="end">
        <Button type="primary" size="large" icon={<PlusOutlined />}>
          Create Candidate{' '}
        </Button>
      </Flex>
      <Table
        rowKey={(record) => record.id}
        title={() => <Typography.Text strong>All Candidates</Typography.Text>}
        loading={isPending}
        columns={columns}
        dataSource={data?.data}
        size="middle"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`candidates/${record.id}`);
            }, // click row
          };
        }}
      />
    </Suspense>
  );
};

export default isAuth(Home);
