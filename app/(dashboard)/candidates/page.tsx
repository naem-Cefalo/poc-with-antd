'use client';
import { Button, DatePickerProps, Flex, Table, Tag, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import getCandidates from '@/utils/getCandidate';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CandidateCreateForm from './_components/CandidateCreateForm';
import { useCandidateStore } from '@/app/lib/candidateStore';
import dayjs from 'dayjs';
import { DatePickerType } from 'antd/es/date-picker';
import Link from 'next/link';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string, record: { id: string }) => {
      return <Link href={`/candidates/${record.id}`}>{text}</Link>;
    },
  },
  {
    title: 'Applied at',
    dataIndex: 'appliedAt',
    render: (text: { $d: string }) => {
      return (
        <Typography.Text>{dayjs(text.$d).format('DD/MM/YYYY')}</Typography.Text>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Contact number',
    dataIndex: 'contactNumber',
  },
  {
    title: 'Skills',
    dataIndex: 'skill',
    render: (record: string[]) => {
      console.log(record);

      return (
        <>
          {record.map((tag, idx) => {
            let color = ['geekblue', 'green', 'processing'];

            return (
              <Tag color={color[idx]} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
  },
  {
    title: 'Total Experience',
    dataIndex: 'years',
  },
];
type Candidate = {
  id: string;
  name: string;
  email: string;
};
const Home = () => {
  const [open, setOpen] = useState(false);
  const tableData = useCandidateStore((state) => state.tableData);
  const setTableData = useCandidateStore((state) => state.setTableData);

  const router = useRouter();

  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ['candidates'],
  //   queryFn: getCandidates,
  // });
  const onCreate = (values: any) => {
    const valuesWithId = { id: Math.random() * 10000, ...values };
    setTableData(valuesWithId);
  };

  // const dynamicData = await fetch(
  //   `https://jsonplaceholder.typicode.com/users`,
  //   { cache: 'no-store' }
  // );
  // const promisData = await dynamicData.json();
  // console.log(dynamicData);
  console.log(tableData);

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
