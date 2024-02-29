import React, { useState } from 'react';
import { Button, Flex, Form, Input, Modal, Radio, Steps, message } from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CandidateCreateFormmProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const CandidateCreateForm: React.FC<CandidateCreateFormmProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Basic info',
      content: (
        <Form name="basicInfo" layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input the email',
              },
            ]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Education',
      content: (
        <Form name="professionalInfo" layout="vertical" form={form}>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: 'Please input the name',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please input the email',
              },
            ]}>
            <Input type="textarea" />
          </Form.Item>
          <Flex gap={20}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Flex>
        </Form>
      ),
    },
    {
      title: 'Experience',
      content: (
        <Form name="SkillInfo" layout="vertical" form={form}>
          <Form.Item
            name="skill"
            label="Skill"
            rules={[
              {
                required: true,
                message: 'Please input the skill',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="years"
            label="Years"
            rules={[
              {
                required: true,
                message: 'Please input the email',
              },
            ]}>
            <Input />
          </Form.Item>
          <Flex gap={20}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Flex>
        </Form>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <div>
          <h3>A new candidate has created</h3>
          <Button
            onClick={() => {
              setCurrent(0);
              form.resetFields();
              onCancel();
            }}>
            Close
          </Button>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Modal
      open={open}
      title="Create a new candidate"
      onCancel={onCancel}
      afterClose={() => {
        onCreate(formData);
      }}
      width={600}
      footer={null}>
      <Steps
        size="small"
        current={current}
        items={items}
        style={{
          margin: '20px 0px',
        }}
      />
      <Form.Provider
        onFormFinish={(name, info) => {
          setFormData((pre) => {
            return { ...pre, [name]: info.values };
          });
          console.log('finish called');

          next();
        }}>
        {steps[current].content}
      </Form.Provider>
    </Modal>
  );
};

export default CandidateCreateForm;
